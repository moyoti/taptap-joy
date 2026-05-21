import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS, INITIAL_ITEMS, ACHIEVEMENTS } from '@/constants';
import { AnimatedCounter } from '@/components/AnimatedCounter';

interface StatsScreenProps {
  navigation: any;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { progress, settings } = useAppStore();
  const theme = THEME_COLORS[settings.theme];

  const favoriteItem = INITIAL_ITEMS.find((item) => item.id === progress.favoriteItem);

  const statsCards = [
    {
      icon: 'today' as const,
      label: t('stats.today'),
      value: progress.todayTaps.toString(),
      subValue: t('common.taps'),
      color: theme.primary,
    },
    {
      icon: 'timer' as const,
      label: t('stats.total'),
      value: progress.totalTaps.toString(),
      subValue: t('common.taps'),
      color: theme.secondary,
    },
    {
      icon: 'flame' as const,
      label: t('stats.streak'),
      value: progress.currentStreak.toString(),
      subValue: t('stats.combo'),
      color: theme.accent,
    },
    {
      icon: 'heart' as const,
      label: t('stats.favorite'),
      value: favoriteItem?.name || '-',
      subValue: t('stats.item'),
      color: theme.primary,
    },
  ];

  const bestDay = Object.values(progress.dailyHistory).length > 0 
    ? Math.max(...Object.values(progress.dailyHistory)) 
    : 0;
  const avgTaps = progress.totalTaps > 0 
    ? Math.round(progress.totalTaps / Math.max(Object.keys(progress.dailyHistory).length, 1)) 
    : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>{t('stats.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          {statsCards.map((stat, index) => (
            <View
              key={index}
              style={[
                styles.statCard,
                { 
                  backgroundColor: theme.card,
                  borderColor: stat.color,
                  borderWidth: 1.5,
                }
              ]}
            >
              <View style={[styles.statIconContainer, { backgroundColor: stat.color + '15' }]}>
                <Ionicons name={stat.icon} size={28} color={stat.color} />
              </View>
              <Text style={[styles.statLabel, { color: theme.text, opacity: 0.6 }]}>
                {stat.label}
              </Text>
              <Text style={[styles.statValue, { color: stat.color }]}>
                {stat.icon === 'heart' ? stat.value : (
                  <AnimatedCounter 
                    value={parseInt(stat.value) || 0} 
                    duration={1500}
                    style={{ color: stat.color }}
                  />
                )}
              </Text>
              <Text style={[styles.statSubValue, { color: theme.text, opacity: 0.5 }]}>
                {stat.subValue}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: theme.primary + '15' }]}>
              <Ionicons name="calendar-outline" size={20} color={theme.primary} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('stats.history')}
            </Text>
          </View>
          
          <View style={styles.historyGrid}>
            <View style={styles.historyItem}>
              <View style={[styles.historyIconBox, { backgroundColor: theme.primary + '15' }]}>
                <Ionicons name="trending-up" size={24} color={theme.primary} />
              </View>
              <Text style={[styles.historyLabel, { color: theme.text, opacity: 0.6 }]}>
                {t('stats.daily_average')}
              </Text>
              <Text style={[styles.historyValue, { color: theme.primary }]}>
                {avgTaps}
              </Text>
              <Text style={[styles.historySub, { color: theme.text, opacity: 0.5 }]}>
                {t('common.taps')}
              </Text>
            </View>
            
            <View style={[styles.historyDivider, { backgroundColor: theme.border }]} />
            
            <View style={styles.historyItem}>
              <View style={[styles.historyIconBox, { backgroundColor: theme.accent + '15' }]}>
                <Ionicons name="trophy" size={24} color={theme.accent} />
              </View>
              <Text style={[styles.historyLabel, { color: theme.text, opacity: 0.6 }]}>
                {t('stats.best_day')}
              </Text>
              <Text style={[styles.historyValue, { color: theme.accent }]}>
                {bestDay}
              </Text>
              <Text style={[styles.historySub, { color: theme.text, opacity: 0.5 }]}>
                {t('common.taps')}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: theme.secondary + '15' }]}>
              <Ionicons name="trophy-outline" size={20} color={theme.secondary} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('common.achievements')}
            </Text>
          </View>
          
          <View style={styles.achievementProgress}>
          <View style={styles.achievementHeader}>
            <View style={styles.achievementCount}>
              <Text style={[styles.achievementNumber, { color: theme.primary }]}>
                {progress.achievements.length}
              </Text>
              <Text style={[styles.achievementTotal, { color: theme.text, opacity: 0.5 }]}>
                / {ACHIEVEMENTS.length}
              </Text>
            </View>
            <Text style={[styles.achievementLabel, { color: theme.text, opacity: 0.6 }]}>
              {t('achievements.unlocked')}
            </Text>
          </View>
            
            <View style={[styles.progressBarContainer, { backgroundColor: theme.border }]}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${(progress.achievements.length / 10) * 100}%`,
                    backgroundColor: theme.primary,
                  }
                ]} 
              />
            </View>
            
            <View style={styles.progressDots}>
              {Array.from({ length: 10 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.progressDot,
                    {
                      backgroundColor: i < progress.achievements.length 
                        ? theme.primary 
                        : theme.border,
                    }
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    borderRadius: 20,
    padding: 18,
    alignItems: 'flex-start',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: -0.5,
  },
  statSubValue: {
    fontSize: 12,
    marginTop: 2,
  },
  section: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  historyGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItem: {
    flex: 1,
    alignItems: 'center',
  },
  historyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  historyLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    textAlign: 'center',
  },
  historyValue: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  historySub: {
    fontSize: 11,
    marginTop: 4,
  },
  historyDivider: {
    width: 1,
    height: 70,
    marginHorizontal: 16,
  },
  achievementProgress: {
    gap: 14,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  achievementCount: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  achievementNumber: {
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: -1,
  },
  achievementTotal: {
    fontSize: 20,
    fontWeight: '500',
  },
  achievementLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
