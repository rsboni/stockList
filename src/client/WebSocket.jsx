import { useEffect, useState, useRef } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

const websocketUrl = process.env.REACT_APP_WEBSOCKET || 'ws://localhost:8080/quotes'

function WebSocket (props) {
  const [message, setMessage] = useState({})
  const websocket = useRef(null)

  useEffect(() => {
    websocket.current = new W3CWebSocket(websocketUrl)
    websocket.current.onopen = () => {
      console.log('WebSocket Client Connected')
    }
    websocket.current.onmessage = (message) => {
      const newMessage = JSON.parse(message.data)
      if (newMessage.timestamp) {
        setMessage(newMessage)
      }
    }
    return () => websocket.current.close()
  }, [])

  return { message, setMessage }
}

export default WebSocket
