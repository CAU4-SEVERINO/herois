import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { Fredoka_400Regular } from '@expo-google-fonts/fredoka/400Regular';
import { Fredoka_500Medium } from '@expo-google-fonts/fredoka/500Medium';
import { Fredoka_600SemiBold } from '@expo-google-fonts/fredoka/600SemiBold';
import { Fredoka_700Bold } from '@expo-google-fonts/fredoka/700Bold';
import { Trocchi_400Regular } from '@expo-google-fonts/trocchi/400Regular';

import { HeroProvider } from '../context/HeroContext';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    Trocchi_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <HeroProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#171323',
          },
          headerTintColor: '#F5C451',
          headerTitleStyle: {
            fontFamily: 'Fredoka_600SemiBold',
          },
          contentStyle: {
            backgroundColor: '#120F1C',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="criar"
          options={{
            title: 'Criar Herói',
          }}
        />
      </Stack>
    </HeroProvider>
  );
}