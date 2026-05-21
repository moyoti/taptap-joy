import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS, ACHIEVEMENTS } from '@/constants';
import { ParticleEffect } from '@/components/ParticleEffect';
import type { IconName } from '@expo/vector-icons/build/Ionicons';

interface AchievementsScreenProps {
  navigation: any;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { progress, settings } = useAppStore();
  const theme = THEME_COLORS[settings.theme];
  const [particleTrigger, setParticleTrigger] = useState(0);
  
  // 模拟解锁庆祝（实际应该在解锁时触发）
  const handleUnlock = () => {
    setParticleTrigger(prev => prev + 1);
  };

  const renderItem = ({ item }: { item: typeof ACHIEVEMENTS[0] }) => {
    const isUnlocked = progress.achievements.includes(item.id);
    const iconColor = isUnlocked ? theme.primary : theme.border;
    const containerBg = isUnlocked 
      ? { backgroundColor: theme.primary, opacity: 0.12 } 
      : { backgroundColor: theme.border, opacity: 0.2 };

    return (
      <View
        style={[
          styles.achievementCard,
          { backgroundColor: theme.card },
          isUnlocked && styles.achievementUnlocked,
        ]}
      >
        <View style={[styles.iconContainer, containerBg]}>
          <Ionicons 
            name={(item.icon as IconName) || 'help-circle'} 
            size={28} 
            color={iconColor} 
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.achievementTitle, { color: theme.text }]}>
            {t(item.title)}
          </Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {t(item.description)}
          </Text>
          {item.reward && (
            <View style={[styles.rewardBadge, { backgroundColor: theme.accent }]}>
              <Ionicons name="gift" size={14} color="#FFF" />
              <Text style={styles.rewardText}>
                {t('achievements.reward')}: {item.reward}
              </Text>
            </View>
          )}
        </View>
        {isUnlocked ? (
          <Ionicons name="checkmark-circle" size={32} color={theme.primary} />
        ) : (
          <Ionicons name="lock-closed" size={28} color={theme.border} />
        )}
      </View>
    );
  };

  const unlockedCount = progress.achievements.length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>{t('achievements.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={ACHIEVEMENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const unlocked = progress.achievements.includes(item.id);
          return (
            <Pressable
              style={[
                styles.achievementCard,
                { 
                  backgroundColor: theme.card,
                  opacity: unlocked ? 1 : 0.6,
                }
              ]}
              onPress={unlocked ? handleUnlock : undefined}
            >
              <View style={[styles.achievementIcon, { 
                backgroundColor: unlocked ? theme.primary + '25' : theme.border 
              }]}>
                <Ionicons 
                  name={item.icon as any} 
                  size={32} 
                  color={unlocked ? theme.primary : theme.text} 
                />
              </View>
              <View style={styles.achievementContent}>
                <Text style={[styles.achievementTitle, { 
                  color: theme.text,
                  fontWeight: unlocked ? '700' : '500',
                }]}>
                  {t(`achievement.${item.id}.title`)}
                </Text>
                <Text style={[styles.achievementDesc, { color: theme.text, opacity: 0.6 }]} numberOfLines={2}>
                  {t(`achievement.${item.id}.desc`)}
                </Text>
              </View>
              <View style={[styles.achievementStatus, { 
                backgroundColor: unlocked ? theme.primary : theme.border 
              }]}>
                <Ionicons 
                  name={unlocked ? 'checkmark-circle' : 'lock-closed'} 
                  size={20} 
                  color="#FFF" 
                />
              </View>
            </Pressable>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
      
      {/* 庆祝粒子效果 */}
      <ParticleEffect
        trigger={particleTrigger}
        x={200}
        y={300}
        type="achievement"
        onComplete={() => {}}
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  counter: {
    fontSize: 14,
  },
  list: {
    padding: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  achievementUnlocked: {
    opacity: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 28,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
    gap: 4,
  },
  rewardText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
