const logger = {
  msg: (...args: any[]) => {
    console.log(...args)
  },
  start: (title: string, ...args: any[]) => {
    logger.msg('\n', '/* --- Start: ', title, ' --- */', '\n')
    logger.msg(...args)
  },
  end: (end: string, ...args: any[]) => {
    logger.msg('\n', '/* --- End: ', end, ' --- */', '\n')
    logger.msg(...args)
  },
  log: (title: string, ...args: any[]) => {
    logger.msg('\n', '/* --- ', title, ' --- */', '\n')
    logger.msg(...args)
  },
}

export default logger
