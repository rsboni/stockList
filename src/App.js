import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import WebSocket from './client/WebSocket'
import StockDetails from './components/StockDetails'
import StockList from './components/StockList'
import Navbar from './components/Navbar'
import { orderList } from './helpers/functions'
import useQuotes from './hooks/useQuotes'
import useSelectedQuote from './hooks/useSelectedQuote'

function App () {
  const { quotes, addQuote } = useQuotes()
  const { selectedQuote, setSelectedQuote, updateSelectedQuote } = useSelectedQuote()
  const { message } = WebSocket()

  useEffect(() => {
    if (message.timestamp) {
      addQuote(message)
    }
    if (Object.keys(message)[0] === selectedQuote.stockName) {
      updateSelectedQuote(message)
    }
  }, [message])

  return (
    <>
      <Navbar stockCode={selectedQuote.stockName} />
      <Paper
        style={{
          padding: 10,
          margin: 10,
          minHeight: '90vh',
          height: '100%',
          backgroundColor: '#fafafa'
        }}
        elevation={0}
      >
        <Route exact path='/'>

          <StockList quotes={orderList(quotes)} setSelectedQuote={setSelectedQuote} />
        </Route>
        <Route
          exact
          path='/:stockCode'
        >
          <StockDetails selectedQuote={selectedQuote} />
        </Route>
      </Paper>
    </>
  )
}

export default React.memo(App)
