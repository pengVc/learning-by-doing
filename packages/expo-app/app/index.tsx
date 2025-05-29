import { Link } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import ImageEditor from '@components/ImageEditor'
import UI from '@constants/UI'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function App() {
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <ImageEditor imageSource={PlaceholderImage} />
      <Link href="/about" style={[styles.button, { marginBottom: insets.bottom || UI.gap }]}>
        About us
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#fff',
    marginVertical: UI.gap,
  },
})
