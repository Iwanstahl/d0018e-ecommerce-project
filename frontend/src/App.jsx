import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // State to store the data coming from Flask
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // fetch() sends a request to http://localhost:5173/api/time
    // Vite proxy then forwards it to http://127.0.0.1:5000/api/time
    fetch('/api/time')
      .then(res => res.json())
      .then(data => {
        setCurrentTime(data.time);
      });
  }, []); // The empty array [] means this runs only once when the page loads

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Instrument Shop</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        
        <p>The current server time is: {new Date(currentTime * 1000).toLocaleString()}.</p>
        
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App