import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18n from './src/i18n';
import { AppNavigator } from './src/navigation/AppNavigator';
import { OnboardingGuide } from './src/components/OnboardingGuide';

export default function App() {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <OnboardingGuide />
        <AppNavigator />
        <StatusBar style="auto" />
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
