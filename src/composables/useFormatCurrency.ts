export default function useFormatCurrency(number: string | number): string {
  return Number(number).toLocaleString('vi', {
    style: 'currency',
    currency: 'vnd',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  })
}
