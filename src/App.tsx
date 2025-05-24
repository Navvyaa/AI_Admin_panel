import Dashboard from './components/Dashboard'
import ChatProvider from './context/chatContext'
import './App.css'
import { useState } from 'react'
import Loading from './components/Loading'
import { ThemeProvider } from './context/themeContext'
function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {

    return (
      <ThemeProvider>
    <Loading onLoadComplete={handleLoadComplete} />
    </ThemeProvider>
    )
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
