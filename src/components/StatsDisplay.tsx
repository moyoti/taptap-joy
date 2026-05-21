import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS } from '@/constants';

export const StatsDisplay: React.FC = () => {
  const { t } = useTranslation();
  const { progress, settings } = useAppStore();
  const theme = THEME_COLORS[settings.theme];

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={styles.statRow}>
        <View style={styles.statItem}>
          <Text
            style={[styles.statLabel, { color: theme.text, opacity: 0.6 }]}
            numberOfLines={1}
          >
            {t('home.today')}
          </Text>
          <Text
            style={[styles.statValue, { color: theme.primary }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.4}
          >
            {progress.todayTaps}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <View style={styles.statItem}>
          <Text
            style={[styles.statLabel, { color: theme.text, opacity: 0.6 }]}
            numberOfLines={1}
          >
            {t('home.total')}
          </Text>
          <Text
            style={[styles.statValue, { color: theme.primary }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.4}
          >
            {progress.totalTaps}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <View style={styles.statItem}>
          <Text
            style={[styles.statLabel, { color: theme.text, opacity: 0.6 }]}
            numberOfLines={1}
          >
            {t('home.combo')}
          </Text>
          <Text
            style={[styles.statValue, { color: theme.accent }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.4}
          >
            {progress.currentStreak}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  divider: {
    width: 1,
    height: 44,
    marginHorizontal: 12,
  },
});
