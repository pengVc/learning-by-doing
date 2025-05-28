import { registerRootComponent } from 'expo'
import React from 'react'
import App from './App'

console.log('index.ts', {
  'React.useContext': React.useContext,
  'React.version': React.version,
})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
