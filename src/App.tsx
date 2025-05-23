import Dashboard from './components/Dashboard'
import ChatProvider from './context/chatContext'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <p className='text-xl text-purple-900'>This is admin panel ai dashboard</p> */}
      <section className='w-full h-screen '>
        <ChatProvider>
        <Dashboard />
        </ChatProvider>
      </section>
    </>
  )
}

export default App
