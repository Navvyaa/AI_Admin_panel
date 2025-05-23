"use client"

import { useState } from "react"
import InboxSideBar from "./InboxSidebar"
import ChatMessage from "./ChatMessage"
import CopilotPanel from "./CopilotPanel"

export default function Dashboard() {
  const [chat, setChat] = useState<string[]>(["Customer: I need help with a defective item."])

  const [copilotConvo, setCopilotConvo] = useState<{ role: string; text: string }[]>([])
  const [composer, setComposer] = useState("")

  const handleSend = () => {
    if (!composer.trim()) return
    setChat((prev) => [...prev, "Agent: " + composer])
    setComposer("")
  }

  const handleAddToComposer = (text: string) => {
    setCopilotConvo((prev) => [...prev, { role: "ai", text }])
    setComposer(text)
  }

  return (
    <section className="flex h-screen bg-gray-50">
      <InboxSideBar />
      <div className="flex-1 flex flex-col border-r">
        <ChatMessage />
      </div>
      <CopilotPanel conversation={copilotConvo} onCompose={handleAddToComposer} />
    </section>
  )
}
