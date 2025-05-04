import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './LandingPage';


function App() {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(setMessage);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <LandingPage />
      <h1>Hello from React + Vite!</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
