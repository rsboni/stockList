const printList = (quotes) => {
  const orderedQuotes = orderList(quotes)
  const list = orderedQuotes.map(q => <li key={q.stockName}>{q.stockName}: {q.quotes ? q.quotes[q.quotes.length - 1] : 0}  Variação: {q.variation.toFixed(2)} %</li>
  )
  return list
}

const orderList = (list, ascd = true) => {
  return list.sort((a, b) => a.variation < b.variation ? ascd ? 1 : -1 : a.variation === b.variation ? 0 : ascd ? -1 : 1)
}

const variation = (array, num = 2) => {
  const last = array[array.length - 1]
  const selected = array[array.length - num]
  return selected && last && selected !== last ? (last - selected) / selected * 100 : 0
}

export { printList, orderList, variation }
