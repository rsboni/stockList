import React from 'react'
import { useHistory } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ChartThumbnail from './ChartThumbnail'

export default React.memo((props) => {
  const history = useHistory()
  const { quote, setSelectedQuote } = props
  const { stockName, quotes, variation } = quote
  const variationColor = variation > 0 ? 'green' : variation === 0 ? 'gray' : 'red'

  const handleClick = () => {
    history.push(`/${stockName}`)
    console.log(quote)
    setSelectedQuote(quote)
  }
  return (
    <Grid item xs={11} sm={5} md={3} lg={3} onClick={handleClick}>
      <Paper
        button
        style={{
          padding: 10,
          margin: 10,
          // height: '80%',
          backgroundColor: '#fffb'
        }}
        elevation={1}
      >
        <ListItem button alignItems='flex-start'>
          <ListItemIcon>
            {variation > 0
              ? <TrendingUpIcon style={{ color: variationColor }} />
              : variation < 0 ? <TrendingDownIcon style={{ color: variationColor }} />
                : <TrendingFlatIcon style={{ color: 'gray' }} />}
          </ListItemIcon>
          <ListItemText primary={stockName} secondary={quotes ? quotes[quotes.length - 1] : 0} />
          <ChartThumbnail quote={quote} style={{ alignSelf: 'center' }} />
          <Typography align='left' style={{ color: variationColor }}>{variation.toFixed(2)} %</Typography>
        </ListItem>
      </Paper>
    </Grid>
  )
})
