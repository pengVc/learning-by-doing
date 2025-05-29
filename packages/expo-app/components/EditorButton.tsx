import { Pressable, View, Text, StyleSheet } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import UI from '@constants/UI'

import type { ViewStyle } from 'react-native'

type Props = {
  text?: string
  children?: React.ReactNode
  style?: ViewStyle
	onPress?: () => void
}
const EditorButton = (props: Props) => {
  const { text, children, style, onPress } = props
  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.button} onPress={onPress}>
        <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
        <Text style={styles.text}>{children ?? text}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: UI.borderRadius,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default EditorButton
