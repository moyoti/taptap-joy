import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { TapButton } from '@/components/TapButton';
import { KnobButton } from '@/components/KnobButton';
import { StatsDisplay } from '@/components/StatsDisplay';
import { ItemSelector } from '@/components/ItemSelector';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS } from '@/constants';

interface MainScreenProps {
  navigation: any;
}

export const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { settings, currentItem } = useAppStore();
  const [selectorVisible, setSelectorVisible] = useState(false);
  const theme = THEME_COLORS[settings.theme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.greeting, { color: theme.text, opacity: 0.6 }]}>
            {t('home.title')}
          </Text>
          <Pressable 
            style={[
              styles.currentItemContainer, 
              { 
                backgroundColor: theme.card,
                shadowColor: currentItem.iconColor,
                shadowOpacity: 0.15,
              }
            ]}
            onPress={() => setSelectorVisible(true)}
            android_ripple={{ color: theme.primary + '20' }}
          >
            <View style={[styles.iconBadge, { backgroundColor: currentItem.iconColor + '15' }]}>
              <Ionicons 
                name={currentItem.iconName as any} 
                size={18} 
                color={currentItem.iconColor} 
              />
            </View>
            <Text style={[styles.currentItemText, { color: theme.text }]}>
              {t(currentItem.name)}
            </Text>
            <Ionicons 
              name="chevron-down" 
              size={16} 
              color={theme.text} 
              style={{ opacity: 0.5 }}
            />
          </Pressable>
        </View>
        
        <View style={styles.headerButtons}>
          <Pressable
            style={[
              styles.iconButton, 
              { 
                backgroundColor: theme.card,
                shadowColor: theme.secondary,
                shadowOpacity: 0.2,
              }
            ]}
            onPress={() => navigation.navigate('Achievements')}
            android_ripple={{ color: theme.secondary + '20' }}
          >
            <Ionicons name="trophy-outline" size={20} color={theme.secondary} />
          </Pressable>
          <Pressable
            style={[
              styles.iconButton, 
              { 
                backgroundColor: theme.card,
                shadowColor: theme.primary,
                shadowOpacity: 0.2,
              }
            ]}
            onPress={() => navigation.navigate('Shop')}
            android_ripple={{ color: theme.primary + '20' }}
          >
            <Ionicons name="cart-outline" size={19} color={theme.primary} />
          </Pressable>
          <Pressable
            style={[
              styles.iconButton, 
              { 
                backgroundColor: theme.card,
                shadowColor: theme.text,
                shadowOpacity: 0.15,
              }
            ]}
            onPress={() => navigation.navigate('Settings')}
            android_ripple={{ color: theme.text + '20' }}
          >
            <Ionicons name="settings-outline" size={20} color={theme.text} />
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() => navigation.navigate('Stats')}
        style={styles.statsWrapper}
      >
        <StatsDisplay />
      </Pressable>

      <View style={styles.tapContainer}>
        <View style={[styles.ambientGlow, { backgroundColor: currentItem.iconColor + '08' }]} />
        {currentItem.interactionMode === 'swipe' ? (
          <KnobButton />
        ) : (
          <TapButton />
        )}
      </View>

      <View style={styles.bottomHint}>
        <View style={[styles.hintDot, { backgroundColor: theme.primary }]} />
        <Text style={[styles.hintText, { color: theme.text, opacity: 0.4 }]}>
          {t('home.tap_to_start')}
        </Text>
      </View>

      <ItemSelector 
        visible={selectorVisible} 
        onClose={() => setSelectorVisible(false)} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerLeft: {
    gap: 10,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  currentItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentItemText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  statsWrapper: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  tapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ambientGlow: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  bottomHint: {
    paddingBottom: 24,
    alignItems: 'center',
    gap: 8,
  },
  hintDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  hintText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
