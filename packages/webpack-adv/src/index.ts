import { getErrorMsg } from '@lbd/utils'

const main = () => {
  console.log('hello world')
  console.log('<!--loader-outlet-->')

  console.log(getErrorMsg('xxx', 'yyy'))
}

main()
