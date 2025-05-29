import { Image } from 'expo-image'
import { View, StyleSheet } from 'react-native'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import EditorButton from '@components/EditorButton'
import UI from '@constants/UI'

import type { ImageProps } from 'expo-image'

type ImageEditorProps = {
  imageSource?: ImageProps['source']
}
const ImageEditor = (props: ImageEditorProps) => {
  const { imageSource: defaultImgSrc } = props
  const [selectImg, setSelectImg] = useState<ImageProps['source'] | null>(null)

  const handleBtnPrsess = async () => {
    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      })

      if (canceled) {
        return
      }
      const [{ uri }] = assets

      setSelectImg({ uri })
    } catch (error) {
      console.error(error)
    }
  }

  const finalImgSrc = selectImg ?? defaultImgSrc

  return (
    <View style={styles.imageContainer}>
      <Image source={finalImgSrc} style={styles.image} />
      <EditorButton
        text={selectImg ? '复择一图' : '择一图'}
        style={{
          marginTop: 20,
        }}
        onPress={handleBtnPrsess}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    gap: 20,
  },
  image: {
    width: '100%',
    height: 440,
    borderRadius: UI.borderRadius,
  },
})

export default ImageEditor
