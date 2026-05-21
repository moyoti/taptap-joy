// 物品分类
export type ItemCategory = 'traditional' | 'modern' | 'fun' | 'premium' | 'achievement';

export type HapticStyle = 'light' | 'medium' | 'heavy' | 'soft' | 'rigid';

export interface HapticPulse {
  style: HapticStyle;
  delay: number;
}

export type InteractionMode = 'tap' | 'holdRelease' | 'tapOrHold' | 'swipe';

// 敲击物品
export interface TapItem {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  soundFile: string;
  imageEmoji: string;
  iconName: string;
  iconColor: string;
  vibrationPattern: HapticPulse[];
  interactionMode: InteractionMode;
  holdDuration: number;
  holdHaptics: HapticPulse[];
  releaseHaptics: HapticPulse[];
  isPremium: boolean;
  price?: number;
  unlockCondition?: string;
  isUnlocked: boolean;
}

// 成就
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress) => boolean;
  reward?: string; // 解锁物品 ID
  isUnlocked: boolean;
  unlockedAt?: Date;
}

// 用户进度
export interface UserProgress {
  totalTaps: number;
  todayTaps: number;
  currentStreak: number;
  longestStreak: number;
  unlockedItems: string[]; // 物品 ID 列表
  achievements: string[]; // 成就 ID 列表
  favoriteItem: string;
  lastTapDate: string; // ISO 日期字符串
  dailyHistory: Record<string, number>; // date -> tap count
}

// 应用设置
export interface AppSettings {
  language: string;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  vibrationStrength: number; // 0-100
  theme: 'zen' | 'cyber';
  notificationsEnabled: boolean;
}

// 应用状态
export interface AppState {
  progress: UserProgress;
  settings: AppSettings;
  currentItem: TapItem;
  isTapping: boolean;
  combo: number;
  lastTapTime: number;
}

// 导航类型
export type RootStackParamList = {
  Main: undefined;
  Shop: undefined;
  Stats: undefined;
  Achievements: undefined;
  Settings: undefined;
};

// IAP 类型
export interface IAPState {
  isConnected: boolean;
  isLoading: boolean;
  products: any[];
  purchases: any[];
  error: string | null;
}
