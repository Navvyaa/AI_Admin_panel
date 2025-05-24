import Dashboard from './components/Dashboard'
import ChatProvider from './context/chatContext'
import './App.css'
import { ThemeProvider } from './context/themeContext'
import { useState } from 'react'
import Loading from './components/Loading'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading onLoadComplete={handleLoadComplete} />;
  }

  return (
    <>
      <section className='w-full h-screen'>
        <ThemeProvider>
          <ChatProvider>
            <Dashboard />
          </ChatProvider>
        </ThemeProvider>
      </section>
    </>
  )
}

export default App
