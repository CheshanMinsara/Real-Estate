const formatterLKR = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const formatterMonthly = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

export function formatCurrency(value: number, isMonthly = false) {
  if (isMonthly || value < 1000000) {
    // For rental prices or smaller amounts, show as monthly
    return formatterMonthly.format(value) + (isMonthly ? '/month' : '')
  }
  // For sale prices, show in millions if large
  if (value >= 1000000) {
    const millions = value / 1000000
    return `Rs. ${millions.toFixed(1)}M`
  }
  return formatterLKR.format(value)
}

