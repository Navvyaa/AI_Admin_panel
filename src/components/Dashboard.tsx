
import { useState } from "react"
import InboxSideBar from "./InboxSidebar"
import ChatMessage from "./ChatMessage"
import CopilotPanel from "./CopilotPanel"
import {  ArrowLeft, Bot } from 'lucide-react'

export default function Dashboard() {
  const [copilotConvo] = useState<{ role: string; text: string }[]>([])
  const [composer, setComposer] = useState<string>("");
  const [mobileView, setMobileView] = useState<'inbox' | 'chat' | 'copilot'>('inbox');

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
      <section className="lg:flex hidden h-screen lg:bg-gray-100 bg-white">
        <InboxSideBar onChatSelect={handleChatSelect} />
        <ChatMessage initialComposer={composer} />
        <CopilotPanel conversation={copilotConvo} onCompose={handleAddToComposer} />
      </section>
      <section className="lg:hidden block h-full bg-gray-100">
        {mobileView === 'inbox' && <InboxSideBar onChatSelect={handleChatSelect} />}
        {mobileView !== 'inbox' && (
          <div className="fixed top-0 left-0 right-0 bg-white z-10 p-4 flex items-center gap-4">
            <button onClick={handleBackToInbox} className="p-2">
              <ArrowLeft size={20} />
            </button>
            <span className="font-semibold">
              {mobileView === 'chat' ? 'Chat' : 'Copilot'}
            </span>
            {mobileView === 'chat' && (
              <button 
                onClick={() => setMobileView('copilot')} 
                className="ml-auto p-2"
              >
                <Bot size={20} />
              </button>
            )}
          </div>
        )}
        <div className="mt-14">
          {mobileView === 'chat' && <ChatMessage initialComposer={composer} />}
          {mobileView === 'copilot' && (
            <CopilotPanel conversation={copilotConvo} onCompose={handleAddToComposer} />
          )}
        </div>
      </section>
    </>
  )
}
