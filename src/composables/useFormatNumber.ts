export default function useFormatNumber(value: number | string): string {
  if (!value) return '0'
  const parts = value.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
