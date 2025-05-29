import UI from '@constants/UI'
import { View, Text, StyleSheet } from 'react-native'

export default function About() {
  return (
    <View style={style.container}>
      <Text style={style.text}>May the world be a good place for you</Text>
      <Text style={style.text}>
        <Text style={style.max}>Max</Text>
        Leaves
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: UI.gap,
  },
  text: {
    color: UI.textMainColor,
  },
  max: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginHorizontal: UI.gap / 2
  }
})
