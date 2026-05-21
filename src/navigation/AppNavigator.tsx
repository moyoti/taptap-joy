import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from '@/screens/MainScreen';
import { StatsScreen } from '@/screens/StatsScreen';
import { ShopScreen } from '@/screens/ShopScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { AchievementsScreen } from '@/screens/AchievementsScreen';
import { RootStackParamList } from '@/types';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Stats" component={StatsScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
