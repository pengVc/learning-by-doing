const logger = {
  msg: (...args: any[]) => {
    console.log(...args)
  },
  start: (title: string, ...args: any[]) => {
    console.log('\n', '/* --- Start: ', title, ' --- */', '\n')
    console.log(...args)
  },
  end: (end: string, ...args: any[]) => {
    console.log(...args)
    console.log('\n', '/* --- End: ', end, ' --- */', '\n')
  },
}

export default logger
