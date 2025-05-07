import React from 'react'
import ReactDOM from 'react-dom/client'
import MainApp from './MainApp';

function App() {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(setMessage);
  }, []);

  return (
    <>
    <MainApp />
    </>
    
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
