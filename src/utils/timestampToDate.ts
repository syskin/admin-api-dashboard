export const timestampToDate: any = (timestamp: number) => {
  if (!timestamp) return null
  const date: Date = new Date(timestamp)

  const monthNbr: number = date.getMonth() + 1
  const dayNbr: number = date.getDate()
  const yearNbr: number = date.getFullYear()

  let monthStr: string = monthNbr.toString()
  let dayStr: string = dayNbr.toString()

  if (monthStr.length < 2) monthStr = `0` + monthStr
  if (dayStr.length < 2) dayStr = `0` + dayStr

  return yearNbr.toString() + `-` + monthStr + `-` + dayStr
}
