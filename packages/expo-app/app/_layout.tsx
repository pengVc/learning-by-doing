import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import useInitApp from '@hooks/useInitApp'
import UI from '@constants/UI'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { loaded } = useInitApp()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: UI.backgroundColor,
          },
          headerTintColor: UI.textMainColor,
          headerTitleStyle: {
            color: UI.textMainColor,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: UI.backgroundColor,
            paddingHorizontal: UI.gap * 2,
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  )
}
