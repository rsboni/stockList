import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import codes from '../constants/stocksCodes.json'

export default React.memo((params) => {
  const history = useHistory()
  const { stockCode } = params
  const { pathname } = useLocation()
  const displayName = stockCode ? codes.some(code => code.stockCode === stockCode) ? codes.find(c => c.stockCode === stockCode).stockDisplayName : stockCode : ''

  return (
    <AppBar color='primary' position='sticky' style={{ height: '64px' }}>
      <Container>
        {pathname !== '/'
          ? <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='voltar' onClick={() => history.goBack()}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography color='inherit'>{displayName}</Typography>
          </Toolbar>
          : <Toolbar>
            <Typography color='inherit'>Stock Quotes Listing</Typography>
          </Toolbar>}
      </Container>
    </AppBar>
  )
})
