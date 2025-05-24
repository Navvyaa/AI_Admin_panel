
import { useState } from "react"
import InboxSideBar from "./InboxSidebar"
import ChatMessage from "./ChatMessage"
import CopilotPanel from "./CopilotPanel"
import { ArrowLeft, Bot, Ellipsis, MoonStar } from 'lucide-react'
import { useChat } from "../context/chatContext"

export default function Dashboard() {
  const [copilotConvo] = useState<{ role: string; text: string }[]>([])
  const [composer, setComposer] = useState<string>("");
  const [mobileView, setMobileView] = useState<'inbox' | 'chat' | 'copilot'>('inbox');
  const { message: messages } = useChat(); // Add this line

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
      <section className="lg:flex hidden h-screen lg:bg-gray-100">
        <InboxSideBar onChatSelect={handleChatSelect} />
        <ChatMessage initialComposer={composer} onMobileBack={handleBackToInbox} />
        <CopilotPanel conversation={copilotConvo} onCompose={handleAddToComposer} onMobileViewChange={(view) => setMobileView(view)} />
      </section>
      <section className="lg:hidden block h-full bg-white">
        {mobileView === 'inbox' && <InboxSideBar onChatSelect={handleChatSelect} />}
        {mobileView !== 'inbox' && (
          <div className="fixed top-0 left-0 right-0 bg-white z-100 p-4 flex items-center gap-4 border-b border-gray-200">
            <button onClick={handleBackToInbox} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} />
            </button>
            <span className="font-semibold">
              {mobileView === 'chat'
                ? messages.find(m => m.isActive)?.sender || 'Chat'
                :
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                        <Bot size={16} className="text-gray-700" />
                      </div>
                      <h2 className="text-lg font-semibold text-gray-800 ml-2">AI Copilot</h2>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold cursor-pointer text-gray-600 hover:text-gray-800 transition-colors">Details</h3>
                </div>
              }            
              </span>
            {mobileView === 'chat' && (
              <div className="flex items-center gap-5 ml-auto">
                <div className="flex items-center gap-3">
                  <button className='lg:p-2 p-1 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg'>
                    <Ellipsis size={window.innerWidth >= 1024 ? 20 : 14} />
                  </button>
                  <button className='lg:p-2 p-1 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg'>
                    <MoonStar size={window.innerWidth >= 1024 ? 20 : 14} style={{ fill: 'black' }} />
                  </button>
                </div>
                <button
                  onClick={() => setMobileView('copilot')}
                  className="ml-auto p-2 hover:bg-gray-200 bg-gray-100 rounded-full"
                >
                  <Bot size={20} />
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
