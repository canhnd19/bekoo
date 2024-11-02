export default function useDateFormat(date: string | Date | number, formatStr: string): string {
  if (date && formatStr) {
    return useFormatDate(date, formatStr).value
  }
  return ''
}
