import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { playItemSound } from '@/utils/audio';
import { AppState, TapItem, Achievement, UserProgress, AppSettings, HapticStyle, HapticPulse } from '@/types';
import { INITIAL_ITEMS, ACHIEVEMENTS, DEFAULT_PROGRESS, DEFAULT_SETTINGS, COMBO_INTERVAL } from '@/constants';

const executeHaptic = (style: HapticStyle) => {
  switch (style) {
    case 'heavy':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;
    case 'medium':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case 'light':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
    case 'soft':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      break;
    case 'rigid':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      break;
  }
};

interface AppStore extends AppState {
  hasCompletedOnboarding: boolean;
  setOnboardingComplete: () => void;
  tap: (action?: 'tap' | 'release') => void;
  resetCombo: () => void;
  selectItem: (item: TapItem) => void;
  purchaseItem: (itemId: string) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  checkAchievements: () => void;
  resetProgress: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      progress: DEFAULT_PROGRESS,
      settings: DEFAULT_SETTINGS,
      currentItem: INITIAL_ITEMS.find((item) => item.id === 'wooden_fish')!,
      isTapping: false,
      combo: 0,
      lastTapTime: 0,
      hasCompletedOnboarding: false,

      setOnboardingComplete: () => {
        set({ hasCompletedOnboarding: true });
      },

      tap: (action = 'tap') => {
        const state = get();
        const now = Date.now();
        const isRelease = action === 'release';

        const newCombo = now - state.lastTapTime < COMBO_INTERVAL ? state.combo + 1 : 1;

        const today = new Date().toDateString();
        const newTodayTaps =
          state.progress.lastTapDate === today
            ? state.progress.todayTaps + 1
            : 1;

        const newProgress: UserProgress = {
          ...state.progress,
          totalTaps: state.progress.totalTaps + 1,
          todayTaps: newTodayTaps,
          currentStreak: newCombo,
          longestStreak: Math.max(state.progress.longestStreak, newCombo),
          lastTapDate: today,
          dailyHistory: {
            ...state.progress.dailyHistory,
            [today]: (state.progress.dailyHistory[today] || 0) + 1,
          },
        };

        if (state.settings.vibrationEnabled) {
          const pulses: HapticPulse[] = isRelease
            ? state.currentItem.releaseHaptics
            : state.currentItem.vibrationPattern;
          pulses.forEach((pulse) => {
            setTimeout(() => executeHaptic(pulse.style), pulse.delay);
          });
        }

        if (state.settings.soundEnabled) {
          playItemSound(state.currentItem.id);
        }

        set({
          progress: newProgress,
          isTapping: true,
          combo: newCombo,
          lastTapTime: now,
        });

        setTimeout(() => {
          set({ isTapping: false });
        }, 100);

        get().checkAchievements();
      },

      resetCombo: () => {
        set({ combo: 0 });
      },

      selectItem: (item: TapItem) => {
        set({ currentItem: item });
      },

      purchaseItem: (itemId: string) => {
        const item = INITIAL_ITEMS.find((i) => i.id === itemId);
        if (!item || !item.isPremium || item.isUnlocked) return;

        const newProgress = {
          ...get().progress,
          unlockedItems: [...get().progress.unlockedItems, itemId],
        };

        set({ progress: newProgress });
      },

      updateSettings: (settings: Partial<AppSettings>) => {
        set({
          settings: {
            ...get().settings,
            ...settings,
          },
        });
      },

      checkAchievements: () => {
        const state = get();
        const newAchievements: string[] = [...state.progress.achievements];
        const newlyUnlockedItems: string[] = [...state.progress.unlockedItems];

        ACHIEVEMENTS.forEach((achievement: Achievement) => {
          if (
            !newAchievements.includes(achievement.id) &&
            achievement.condition(state.progress)
          ) {
            newAchievements.push(achievement.id);
            
            if (achievement.reward) {
              newlyUnlockedItems.push(achievement.reward);
            }
          }
        });

        if (newAchievements.length > state.progress.achievements.length) {
          set({
            progress: {
              ...state.progress,
              achievements: newAchievements,
              unlockedItems: newlyUnlockedItems,
            },
          });
        }
      },

      resetProgress: () => {
        set({
          progress: DEFAULT_PROGRESS,
          combo: 0,
          lastTapTime: 0,
        });
      },
    }),
    {
      name: 'cyber-tap-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        progress: state.progress,
        settings: state.settings,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
    }
  )
);
