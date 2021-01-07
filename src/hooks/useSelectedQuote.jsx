import { useState } from 'react'
import { variation } from '../helpers/functions'

export default () => {
  const [selectedQuote, setSelectedQuote] = useState({})

  return {
    selectedQuote,
    setSelectedQuote,
    updateSelectedQuote: (newQuote) => {
      const newQuoteStock = Object.keys(newQuote)[0]
      if (selectedQuote.stockName && selectedQuote.stockName === newQuoteStock) {
        setSelectedQuote(prev => ({
          stockName: prev.stockName,
          quotes: [...prev.quotes.slice(-100), newQuote[newQuoteStock]],
          timeStamps: [...prev.timeStamps.slice(-100), newQuote.timestamp],
          variation: variation([...prev.quotes, newQuote[newQuoteStock]])
        }))
      } else {
        setSelectedQuote({
          stockName: newQuoteStock,
          quotes: [newQuote[newQuoteStock]],
          timeStamps: [newQuote.timestamp],
          variation: 0
        })
      }
    }
  }
}
