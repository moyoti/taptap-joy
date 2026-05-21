import { NativeModules, Platform } from 'react-native';

const WidgetData = NativeModules.WidgetData;

export function syncWidgetData(data: {
  todayTaps: number;
  totalTaps: number;
  currentStreak: number;
  itemName: string;
  iconName: string;
  iconColor: string;
  theme: string;
}) {
  if (Platform.OS !== 'ios' || !WidgetData) return;
  WidgetData.updateWidgetData(
    data.todayTaps,
    data.totalTaps,
    data.currentStreak,
    data.itemName,
    data.iconName,
    data.iconColor,
    data.theme
  );
}
