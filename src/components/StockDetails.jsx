import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Chart from './Chart'

export default React.memo((props) => {
  const { selectedQuote } = props
  const { stockName, quotes, variation } = selectedQuote

  const variationColor = variation > 0 ? 'green' : variation === 0 ? 'gray' : 'red'

  return (
    <Container>
      <Card margin={2}>
        <CardContent>
          <ListItemText primary={stockName} secondary={quotes ? `Valor: ${quotes[quotes.length - 1]}` : 0} />
          <Chart quote={selectedQuote} />
          <Typography align='left' style={{ color: variationColor }}>Variação: {variation ? variation.toFixed(2) : 0} %</Typography>
        </CardContent>
      </Card>
    </Container>
  )
})
