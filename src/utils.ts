export function fmtDate(date: Date) {
  let month: string | number = date.getMonth() + 1
  let day: string | number = date.getDate()
  if (month < 10) {
    month = '0' + String(month)
  }
  if (day < 10) {
    day = '0' + String(day)
  }
  return `${date.getFullYear()}-${month}-${day}`
}
