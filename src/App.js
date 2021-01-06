import { w3cwebsocket as W3CWebSocket } from 'websocket'
import { useEffect, useState, useRef } from 'react'

const websocketUrl = process.env.REACT_APP_WEBSOCKET

const variation = (array, num = 2) => {
  let variationAvarage = 0
  while (num > 1 && array.length > 2) {
    variationAvarage = ((array[array.length - 1].value / array[array.length - 2].value) - (array[array.length - 2].value / array[array.length - 3].value)) / 2
    num--
  }
  return variationAvarage * 100
}

const printList = (quotes) => {
  const list = Object.entries(quotes).map(([key, val]) =>
    <li key={key}>{key}: {quotes[key].valueHistory[quotes[key].valueHistory.length - 1].value} Variação: {quotes[key].variation}</li>
  ).sort((a, b) => a.variation > b.variation)
  return list
}

function App () {
  const [quotes, setQuotes] = useState({ VAR: { valueHistory: [{ value: 0, timestamp: 0 }], variation: 0 } })
  const [message, setMessage] = useState({ EX: 0, timestamp: 0 })

  const websocket = useRef(null)

  useEffect(() => {
    websocket.current = new W3CWebSocket(websocketUrl)
    websocket.current.onopen = () => {
      console.log('WebSocket Client Connected')
    }
    websocket.current.onmessage = (message) => {
      console.log(message.data)
      const newMessage = JSON.parse(message.data)
      if (newMessage.timestamp) {
        setMessage(newMessage)
      }
    }
    return () => websocket.current.close()
  }, [])

  useEffect(() => {
    const newQuotes = quotes
    const action = Object.keys(message)[0]

    if (!quotes.hasOwnProperty(action)) {
      newQuotes[action] = { valueHistory: [] }
    }
    newQuotes[action] = { valueHistory: [...newQuotes[action].valueHistory.slice(-10), { value: message[action], timestamp: message.timestamp }], variation: variation(newQuotes[action].valueHistory) }

    if (message.timestamp) {
      setQuotes(newQuotes)
    }
  }, [quotes, message])

  return (
    <div>
      <ul>
        {
          printList(quotes)
        }
      </ul>
    </div>
  )
}

export default App
