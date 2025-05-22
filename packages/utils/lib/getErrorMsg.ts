const getErrorMsg = (err: any, fallback?: string): string => {
  return err?.message ?? err?.msg ?? fallback ?? 'Unknown error'
}

export default getErrorMsg
