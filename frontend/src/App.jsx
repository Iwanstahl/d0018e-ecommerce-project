import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // State to store the data coming from Flask
  const [currentTime, setCurrentTime] = useState(null);

  // State for /api/data
  const [data, setData] = useState(null)

  useEffect(() => {
    // fetch() sends a request to http://localhost:5173/api/time
    // Vite proxy then forwards it to http://127.0.0.1:5000/api/time
    fetch('/api/time')
      .then(res => res.json())
      .then(data => {
        setCurrentTime(data.time);
      })
      .catch(err => console.error('Error fetching /api/time:', err));

    // Example for /api/data
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log("Data from /api/data:", data);
      })
      .catch(err => console.error('Error fetching /api/data:', err));

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

        <p>Data from server:</p>

        {data !== null && Array.isArray(data.data) && (
          (() => {
            // Define the column order you want
            const columns = ["user_id", "username", "email", "password_hash", "is_admin", "created_at"];

            // Mapping from field names to display names
            const columnNames = {
              user_id: "User ID",
              username: "Username",
              email: "Email",
              password_hash: "Password",
              is_admin: "Admin",
              created_at: "Created At"
            };
            
            return (
              <table border="1" cellPadding="5">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th key={col}>{columnNames[col]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((user) => (
                    <tr key={user.user_id}>
                      {columns.map((col) => {
                        let value = user[col];

                        // Convert is_admin 0/1 to false/true
                        if (col === "is_admin") {
                          value = value ? "True" : "False";
                        }

                        return <td key={col}>{value}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()
        )}
        
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App