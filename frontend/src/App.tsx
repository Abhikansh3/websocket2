import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [lastestMessage, setLaststMessage] = useState([])
  const [message, setMessage] = useState("")
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
      console.log('connected')
    }

    socket.onmessage = (message) => {
      console.log('received:', message.data)
      setLaststMessage(message.data)
    }
    setSocket(socket)
  }, [])


  if (!socket) {
    return (
      <div>
        web socker loading ....
      </div>
    )
  }
  return (
    <>
      <input onChange={(e) => {
        setMessage(e.target.value)
      }} />
      <button onClick={() => {
        socket.send(message)
      }}></button>

      {lastestMessage}
    </>
  )
}

export default App
