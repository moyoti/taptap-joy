import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/store/useAppStore';
import { THEME_COLORS } from '@/constants';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { settings, updateSettings } = useAppStore();
  const theme = THEME_COLORS[settings.theme];

  const languages = [
    { label: t('language.zh-CN'), value: 'zh-CN', flag: '🇨🇳' },
    { label: t('language.en'), value: 'en', flag: '🇬🇧' },
    { label: t('language.ja'), value: 'ja', flag: '🇯🇵' },
  ];

  const themes = [
    { label: t('settings.theme_zen'), value: 'zen', icon: 'leaf-outline' },
    { label: t('settings.theme_cyber'), value: 'cyber', icon: 'hardware-chip-outline' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>{t('settings.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: theme.primary + '15' }]}>
              <Ionicons name="language-outline" size={20} color={theme.primary} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('settings.language')}
            </Text>
          </View>
          
          <View style={styles.optionsContainer}>
            {languages.map((lang, index) => (
              <Pressable
                key={lang.value}
                style={[
                  styles.optionRow,
                  index < languages.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border }
                ]}
                onPress={() => {
                  updateSettings({ language: lang.value });
                  i18n.changeLanguage(lang.value);
                }}
                android_ripple={{ color: theme.primary + '15' }}
              >
                <View style={styles.optionLeft}>
                  <Text style={styles.optionFlag}>{lang.flag}</Text>
                  <Text style={[styles.optionText, { color: theme.text }]}>
                    {lang.label}
                  </Text>
                </View>
                {settings.language === lang.value && (
                  <Ionicons name="checkmark-circle" size={24} color={theme.primary} />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: theme.secondary + '15' }]}>
              <Ionicons name="color-palette-outline" size={20} color={theme.secondary} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('settings.theme')}
            </Text>
          </View>
          
          <View style={styles.optionsContainer}>
            {themes.map((tTheme, index) => (
              <Pressable
                key={tTheme.value}
                style={[
                  styles.optionRow,
                  index < themes.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border }
                ]}
                onPress={() => updateSettings({ theme: tTheme.value as 'zen' | 'cyber' })}
                android_ripple={{ color: theme.primary + '15' }}
              >
                <View style={styles.optionLeft}>
                  <Ionicons 
                    name={tTheme.icon as any} 
                    size={22} 
                    color={tTheme.value === 'zen' ? theme.primary : theme.secondary} 
                  />
                  <Text style={[styles.optionText, { color: theme.text }]}>
                    {tTheme.label}
                  </Text>
                </View>
                {settings.theme === tTheme.value && (
                  <Ionicons name="checkmark-circle" size={24} color={theme.primary} />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: theme.accent + '15' }]}>
              <Ionicons name="volume-high-outline" size={20} color={theme.accent} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('settings.sound_vibration')}
            </Text>
          </View>
          
          <View style={styles.optionsContainer}>
            <View style={[styles.optionRow, { borderBottomWidth: 1, borderBottomColor: theme.border }]}>
              <View style={styles.optionLeft}>
                <Ionicons name="musical-notes-outline" size={22} color={theme.accent} />
                <Text style={[styles.optionText, { color: theme.text }]}>
                  {t('settings.sound')}
                </Text>
              </View>
              <Switch
                value={settings.soundEnabled}
                onValueChange={(value) => updateSettings({ soundEnabled: value })}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor="#FFF"
              />
            </View>
            
            <View style={[styles.optionRow, { borderBottomWidth: 1, borderBottomColor: theme.border }]}>
              <View style={styles.optionLeft}>
                <Ionicons name="phone-portrait-outline" size={22} color={theme.accent} />
                <Text style={[styles.optionText, { color: theme.text }]}>
                  {t('settings.vibration')}
                </Text>
              </View>
              <Switch
                value={settings.vibrationEnabled}
                onValueChange={(value) => updateSettings({ vibrationEnabled: value })}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor="#FFF"
              />
            </View>
            
            {settings.vibrationEnabled && (
              <View style={styles.sliderContainer}>
                <View style={styles.sliderHeader}>
                  <Ionicons name="pulse-outline" size={18} color={theme.primary} />
                  <Text style={[styles.sliderLabel, { color: theme.text }]}>
                    {t('settings.vibration_strength')}
                  </Text>
                  <Text style={[styles.sliderValue, { color: theme.primary }]}>
                    {Math.round(settings.vibrationStrength)}%
                  </Text>
                </View>
                <Slider
                  value={settings.vibrationStrength}
                  onValueChange={(value: number) => updateSettings({ vibrationStrength: value })}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor={theme.primary}
                  maximumTrackTintColor={theme.border}
                  thumbTintColor={theme.primary}
                />
              </View>
            )}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: theme.text + '15' }]}>
              <Ionicons name="information-circle-outline" size={20} color={theme.text} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {t('settings.about')}
            </Text>
          </View>
          
          <View style={styles.aboutContent}>
            <View style={styles.aboutRow}>
              <Text style={[styles.aboutLabel, { color: theme.text, opacity: 0.7 }]}>
                {t('settings.version')}
              </Text>
              <Text style={[styles.aboutValue, { color: theme.text }]}>
                1.0.0
              </Text>
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
  optionsContainer: {
    gap: 0,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionFlag: {
    fontSize: 20,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sliderContainer: {
    marginTop: 8,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  sliderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  aboutContent: {
    gap: 0,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  aboutLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
