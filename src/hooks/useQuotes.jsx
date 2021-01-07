import { useState } from 'react'
import { variation } from '../helpers/functions'

const useQuotes = () => {
  const [quotes, setQuotes] = useState([])

  return {
    quotes,
    addQuote: (newQuote) => {
      const newQuoteStock = Object.keys(newQuote)[0]
      if (quotes.some(quote => quote.stockName === newQuoteStock)) {
        setQuotes(quotes.map(stock => stock.stockName === newQuoteStock
          ? {
            stockName: stock.stockName,
            quotes: [...stock.quotes.slice(-100), newQuote[newQuoteStock]],
            timeStamps: [...stock.timeStamps.slice(-100), newQuote.timestamp],
            variation: variation([...stock.quotes, newQuote[newQuoteStock]])
          }
          : stock))
      } else {
        setQuotes(prev => [...prev, {
          stockName: newQuoteStock,
          quotes: [newQuote[newQuoteStock]],
          timeStamps: [newQuote.timestamp],
          variation: 0
        }])
      }
    }
  }
}

export default useQuotes