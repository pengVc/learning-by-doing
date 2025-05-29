// Register app entry through Expo Router
import 'expo-router/entry'

import * as SystemUI from 'expo-system-ui'
import UI from '@constants/UI'

SystemUI.setBackgroundColorAsync(UI.backgroundColor)

/* 

import '@expo/metro-runtime' // 解决 web hot reaload
import { registerRootComponent } from 'expo'
import App from './app/pages/App' 

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)

*/
