import React, { useRef, useCallback, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTranslation } from "react-i18next";
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS } from '@/constants';
import { HapticStyle } from '@/types';
import { ParticleEffect } from '@/components/ParticleEffect';

const executeHaptic = (style: HapticStyle) => {
  switch (style) {
    case "heavy": Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); break;
    case "medium": Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); break;
    case "light": Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); break;
    case "soft": Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft); break;
    case "rigid": Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid); break;
  }
};

interface TapButtonProps { size?: number }

export const TapButton: React.FC<TapButtonProps> = ({ size = 220 }) => {
  const { t } = useTranslation();
  const { currentItem, tap, settings, combo } = useAppStore();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;
  const holding = useRef(false);
  const longTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdHapticTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const pressAt = useRef(0);
  
  // 粒子效果状态
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [particlePosition, setParticlePosition] = useState({ x: size / 2, y: size / 2 });

  const playHoldHaptics = useCallback(() => {
    // Clear previous hold haptics
    holdHapticTimers.current.forEach(clearTimeout);
    holdHapticTimers.current = [];
    // Play the hold haptics in a loop while holding
    const pulses = currentItem.holdHaptics;
    if (pulses.length === 0) return;
    const maxDelay = Math.max(...pulses.map(p => p.delay)) + 50;
    const loop = () => {
      if (!holding.current) return;
      pulses.forEach(p => {
        const t = setTimeout(() => {
          if (holding.current) Haptics.impactAsync(executeHaptic(p.style));
        }, p.delay);
        holdHapticTimers.current.push(t);
      });
      holdHapticTimers.current.push(setTimeout(loop, maxDelay));
    };
    loop();
  }, [currentItem.holdHaptics]);

  const startRing = useCallback(() => {
    Animated.timing(scaleAnim, { toValue: 0.94, duration: 200, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(ringAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(ringAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
      ])
    ).start();
    // Start hold haptics
    playHoldHaptics();
  }, [playHoldHaptics]);

  const stopAll = useCallback(() => {
    ringAnim.stopAnimation(); ringAnim.setValue(0);
    Animated.spring(scaleAnim, { toValue: 1, damping: 10, useNativeDriver: true }).start();
    holdHapticTimers.current.forEach(clearTimeout);
    holdHapticTimers.current = [];
  }, []);

  const onDown = () => {
    pressAt.current = Date.now(); holding.current = true;
    
    // 触发粒子效果
    setParticlePosition({ x: size / 2, y: size / 2 });
    setParticleTrigger(prev => prev + 1);
    
    const m = currentItem.interactionMode;
    if (m !== 'tap' && longTimer.current == null) {
      longTimer.current = setTimeout(() => { if (holding.current) startRing(); }, currentItem.holdDuration);
    }
  };

  const onUp = () => {
    holding.current = false;
    if (longTimer.current) { clearTimeout(longTimer.current); longTimer.current = null; }
    stopAll();
    const dt = Date.now() - pressAt.current;
    const m = currentItem.interactionMode;
    const lp = dt >= currentItem.holdDuration;
    if (m === 'tap') tap('tap');
    else if (m === 'holdRelease' && lp) tap('release');
    else if (m === 'tapOrHold' && !lp) tap('tap');
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: lp ? 1.1 : 0.88, duration: 60, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, damping: 8, useNativeDriver: true }),
    ]).start();
  };

  const theme = THEME_COLORS[settings.theme];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ring, {
        width: size + 36, height: size + 36, borderColor: currentItem.iconColor || theme.primary,
        opacity: ringAnim.interpolate({ inputRange: [0,1], outputRange: [0, 0.25] }),
        transform: [{ scale: ringAnim.interpolate({ inputRange: [0,1], outputRange: [1, 1.1] }) }],
      }]} />
      <Animated.View style={[styles.button, {
        width: size, height: size, backgroundColor: theme.card, borderColor: theme.primary,
        transform: [{ scale: scaleAnim }], shadowColor: currentItem.iconColor || theme.primary,
      }]}
        onStartShouldSetResponder={() => true}
        onResponderGrant={onDown}
        onResponderRelease={onUp}
        onResponderTerminate={() => { holding.current = false; if (longTimer.current) clearTimeout(longTimer.current); stopAll(); }}
      >
        <View style={[styles.iconBox, { backgroundColor: theme.background }]}>
          <Ionicons name={currentItem.iconName as any} size={size * 0.38} color={currentItem.iconColor || theme.primary} />
        </View>
        <Animated.Text style={[styles.label, { color: theme.text }]}>{t(currentItem.name)}</Animated.Text>
        {currentItem.interactionMode !== 'tap' && (
          <Animated.Text style={[styles.tip, { color: theme.text }]}>
            {currentItem.interactionMode === 'holdRelease' ? t('home.hint_hold_release') : t('home.hint_tap_or_hold')}
          </Animated.Text>
        )}
      </Animated.View>
      
      {/* 粒子效果 */}
      <ParticleEffect
        trigger={particleTrigger}
        x={particlePosition.x}
        y={particlePosition.y}
        type={combo > 50 ? 'combo' : 'tap'}
        onComplete={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', borderRadius: 200, borderWidth: 3 },
  button: { borderRadius: 120, borderWidth: 3, alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 12 },
  iconBox: { width: '62%', height: '62%', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  label: { fontSize: 18, fontWeight: '700' },
  tip: { fontSize: 11, opacity: 0.5, marginTop: 4 },
});
