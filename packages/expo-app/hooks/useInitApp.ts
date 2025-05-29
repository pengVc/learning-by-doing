import { useEffect, useState } from 'react'

const useInitApp = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
		/* 资源加载 或 网络请求 */
    // const [loaded] = useFonts({
    //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // })

    setTimeout(() => {
      setLoaded(true)
    }, 666)
  }, [])

  return {
    loaded,
  }
}

export default useInitApp
