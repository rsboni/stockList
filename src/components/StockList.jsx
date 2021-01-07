import React from 'react'
import Grid from '@material-ui/core/Grid'
import StockItem from './StockItem'
import Container from '@material-ui/core/Container'

export default React.memo((props) => {
  const { quotes, setSelectedQuote } = props

  const quoteList = quotes.map(quote => <StockItem quote={quote} setSelectedQuote={setSelectedQuote} key={quote.stockName} />)

  return (
    <>
      <Container>
        <Grid
          container
          spacing={0.5}
        >
          {quoteList}
        </Grid>
      </Container>
    </>
  )
})
