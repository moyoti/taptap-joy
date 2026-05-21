import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, Animated, Text, PanResponder } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS } from '@/constants';

interface KnobButtonProps { size?: number }

const clickSource = require('../../assets/sounds/knob_click.wav');

async function playClick() {
  try {
    const { sound } = await Audio.Sound.createAsync(clickSource, {
      shouldPlay: true, volume: 0.5,
    });
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) sound.unloadAsync().catch(() => {});
    });
  } catch {}
}

export const KnobButton: React.FC<KnobButtonProps> = ({ size = 220 }) => {
  const { t } = useTranslation();
  const { currentItem, tap, settings } = useAppStore();
  const rotation = useRef(new Animated.Value(0)).current;
  const centerRef = useRef({ x: 0, y: 0 });
  const prevRawAngle = useRef(0);
  const totalDegrees = useRef(0);
  const lastTickDegrees = useRef(0);
  const lastTapDegrees = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { pageX, pageY } = e.nativeEvent;
        const cx = centerRef.current.x;
        const cy = centerRef.current.y;
        prevRawAngle.current = Math.atan2(pageY - cy, pageX - cx) * (180 / Math.PI);
        totalDegrees.current = 0;
        lastTickDegrees.current = 0;
        lastTapDegrees.current = 0;
      },
      onPanResponderMove: (e) => {
        const { pageX, pageY } = e.nativeEvent;
        const cx = centerRef.current.x;
        const cy = centerRef.current.y;
        const raw = Math.atan2(pageY - cy, pageX - cx) * (180 / Math.PI);
        let d = raw - prevRawAngle.current;
        if (d > 180) d -= 360;
        if (d < -180) d += 360;
        prevRawAngle.current = raw;
        totalDegrees.current += d;

        while (totalDegrees.current - lastTickDegrees.current >= 15) {
          lastTickDegrees.current += 15;
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        while (totalDegrees.current - lastTickDegrees.current <= -15) {
          lastTickDegrees.current -= 15;
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        if (Math.abs(totalDegrees.current - lastTapDegrees.current) >= 360) {
          lastTapDegrees.current += totalDegrees.current > lastTapDegrees.current ? 360 : -360;
          tap('tap');
          playClick();
        }

        rotation.setValue(totalDegrees.current / 360);
      },
      onPanResponderRelease: () => {
        rotation.setValue(0);
      },
    })
  ).current;

  const onLayout = useCallback((e: any) => {
    e.target.measure((_x: number, _y: number, w: number, h: number, px: number, py: number) => {
      centerRef.current = { x: px + w / 2, y: py + h / 2 };
    });
  }, []);

  const theme = THEME_COLORS[settings.theme];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container} {...panResponder.panHandlers} onLayout={onLayout} ref={(r) => r}>
        <Animated.View style={[styles.ring, {
          width: size + 36, height: size + 36, borderColor: currentItem.iconColor || theme.primary,
          opacity: rotation.interpolate({
            inputRange: [-0.5, 0.5], outputRange: [0.1, 0.25], extrapolate: 'clamp',
          }),
        }]} />
        <Animated.View style={[styles.button, {
          width: size, height: size, backgroundColor: theme.card, borderColor: theme.primary,
          transform: [{
            rotate: rotation.interpolate({
              inputRange: [-1, 1], outputRange: ['-360deg', '360deg'], extrapolate: 'extend',
            }),
          }],
          shadowColor: currentItem.iconColor || theme.primary,
        }]}>
          <View style={[styles.iconBox, { backgroundColor: theme.background }]}>
            <Ionicons name="sync" size={size * 0.42} color={currentItem.iconColor || theme.primary} />
          </View>
        </Animated.View>
      </View>
      <Text style={[styles.label, { color: theme.text }]}>{t(currentItem.name)}</Text>
      <Text style={[styles.tip, { color: theme.text }]}>{t('knob.tip')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center' },
  container: { alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', borderRadius: 200, borderWidth: 3 },
  button: { borderRadius: 120, borderWidth: 3, alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 12 },
  iconBox: { width: '72%', height: '72%', borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 18, fontWeight: '700', marginTop: 14, textAlign: 'center' },
  tip: { fontSize: 12, opacity: 0.4, marginTop: 4, textAlign: 'center' },
});
