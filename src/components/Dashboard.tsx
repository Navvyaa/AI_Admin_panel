import { useState } from "react"
import InboxSideBar from "./InboxSidebar"
import ChatMessage from "./ChatMessage"
import CopilotPanel from "./CopilotPanel"
import { ArrowLeft, Bot, Ellipsis, MoonStar, Sun } from 'lucide-react'
import { useChat } from "../context/chatContext"
import { useTheme } from "../context/themeContext";

export default function Dashboard() {
  const [copilotConvo] = useState<{ role: string; text: string }[]>([])
  const [composer, setComposer] = useState<string>("");
  const [mobileView, setMobileView] = useState<'inbox' | 'chat' | 'copilot'>('inbox');
  const { message: messages } = useChat(); // Add this line
  const { darkMode, toggleDarkMode } = useTheme();

  const handleAddToComposer = (text: string) => {
    setComposer(text)
  }

  const handleBackToInbox = () => {
    setMobileView('inbox');
  }

  const handleChatSelect = () => {
    setMobileView('chat');
  }

  return (
    <>
      <section className={`lg:flex hidden h-screen ${darkMode ? 'bg-gray-900' : 'lg:bg-gray-100'}`}>
        <InboxSideBar onChatSelect={handleChatSelect} />
        <ChatMessage initialComposer={composer} onMobileBack={handleBackToInbox} />
        <CopilotPanel conversation={copilotConvo} onCompose={handleAddToComposer} onMobileViewChange={(view) => setMobileView(view)} />
      </section>
      <section className={`lg:hidden block h-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {mobileView === 'inbox' && <InboxSideBar onChatSelect={handleChatSelect} />}
        {mobileView !== 'inbox' && (
          <div className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} z-100 p-4 flex items-center gap-4 border-b`}>
            <button onClick={handleBackToInbox} className={`p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg`}>
              <ArrowLeft size={20} className={darkMode ? 'text-white' : 'text-gray-800'} />
            </button>
            <span className={`font-semibold ${darkMode ? 'text-white' : ''}`}>
              {mobileView === 'chat'
                ? messages.find(m => m.isActive)?.sender || 'Chat'
                : <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 ${darkMode ? 'bg-gray-800' : 'bg-white/80'} rounded-full flex items-center justify-center`}>
                        <Bot size={16} className={darkMode ? 'text-white' : 'text-gray-700'} />
                      </div>
                      <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} ml-2`}>AI Copilot</h2>
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold cursor-pointer ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors`}>
                    Details
                  </h3>
                </div>
              }
            </span>
            {mobileView === 'chat' && (
              <div className="flex items-center gap-5 ml-auto">
                <div className="flex items-center gap-3">
                  <button className={`lg:p-2 p-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer rounded-lg`}>
                    <Ellipsis size={window.innerWidth >= 1024 ? 20 : 14} className={darkMode ? 'text-white' : ''} />
                  </button>
                  <button
                    onClick={toggleDarkMode}
                    className={`lg:p-2 p-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer rounded-lg transition-all duration-300`}>
                    {darkMode ? (
                      <Sun size={window.innerWidth >= 1024 ? 20 : 14} style={{ fill: 'white', stroke: 'white' }} />
                    ) : (
                      <MoonStar size={window.innerWidth >= 1024 ? 20 : 14} style={{ fill: 'black' }} />
                    )}
                  </button>
                </div>
                <button
                  onClick={() => setMobileView('copilot')}
                  className={`ml-auto p-2 ${darkMode ? 'hover:bg-gray-700 bg-gray-800' : 'hover:bg-gray-200 bg-gray-100'} rounded-full`}
                >
                  <Bot size={20} className={darkMode ? 'text-white' : ''} />
                </button>
              </div>
            )}
          </div>
        )}
        <div className="mt-14">
          {mobileView === 'chat' && <ChatMessage initialComposer={composer} onMobileBack={handleBackToInbox} />}
          {mobileView === 'copilot' && (
            <CopilotPanel conversation={copilotConvo} onCompose={handleAddToComposer} onMobileViewChange={(view) => setMobileView(view)} />
          )}
        </div>
      </section>
    </>
  )
}
