const getErrorMsg = (err: any): string => {
  return err?.message ?? err?.msg ?? err?.toString() ?? 'Unknown error'
}

export default getErrorMsg
