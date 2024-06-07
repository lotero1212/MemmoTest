import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors, appColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarActiveBackgroundColor: appColors.palette[300]
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: appColors.text[400] }}>
              Refrescar
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='reload' color={appColors.text[400]} />
          ),
        }}
      />
    </Tabs>
  );
}
