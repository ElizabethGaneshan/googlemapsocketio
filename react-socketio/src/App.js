import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the Socket.IO server

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('message'); // Cleanup event listener
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('message', input); // Send a message to the server
      setInput(''); // Clear the input
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Socket.IO Chat</h1>
      <div style={{ marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
