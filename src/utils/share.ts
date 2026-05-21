import { Share } from 'react-native';
import i18n from '../i18n';

export const shareProgress = async (totalTaps: number) => {
  const message = i18n.t('share.default', { count: totalTaps });
  await Share.share({ message });
};

export const shareAchievement = async (achievementName: string) => {
  const message = i18n.t('share.achievement', { name: achievementName });
  await Share.share({ message });
};

export const shareMilestone = async (count: number) => {
  const message = i18n.t('share.milestone', { count });
  await Share.share({ message });
};
