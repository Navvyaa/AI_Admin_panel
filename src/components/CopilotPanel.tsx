"use client"

import { useState } from "react"
import { aiResponses } from "../lib/data"
import { Send, Bot } from "lucide-react"

export default function CopilotPanel({
  onCompose,
  conversation,
}: {
  onCompose: (msg: string) => void
  conversation: { role: string; text: string }[]
}) {
  const [input, setInput] = useState("")
  const [aiReply, setAiReply] = useState("")
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>(conversation || [])

  const handleAsk = () => {
    if (!input.trim()) return

    
    const userMessage = { role: "user", text: input }
    setChatHistory((prev) => [...prev, userMessage])

    
    const keyword = Object.keys(aiResponses).find((keyword) => input.toLowerCase().includes(keyword))

    const reply = keyword ? aiResponses[keyword] : "Sorry, I couldn't find anything helpful for that."

    
    setTimeout(() => {
      const aiMessage = { role: "ai", text: reply }
      setChatHistory((prev) => [...prev, aiMessage])
      setAiReply(reply)
    }, 500)

    setInput("")
  }

  return (
    <section className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="lg:text-2xl font-semibold">AI Copilot</h2>
          <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">Beta</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Hi, I'm Fin – your AI Copilot</p>
              <p className="mt-1 text-sm text-gray-500">Ask me about this conversation</p>
            </div>
          </div>
        ) : (
          chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}>
              <div className={`flex items-end gap-2 ${msg.role === "ai" ? "flex-row" : "flex-row-reverse"}`}>
                {msg.role === "ai" && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-blue-600" />
                  </div>
                )}
                {msg.role === "user" && (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">You</span>
                  </div>
                )}
                <div
                  className={`text-sm p-3 rounded-lg max-w-[75%] ${
                    msg.role === "ai"
                      ? "bg-blue-100 text-blue-900 rounded-tl-none"
                      : "bg-gray-100 text-gray-800 rounded-tr-none"
                  }`}
                >
                  {msg.text}
                   {msg.role==="ai" && i===chatHistory.length-1 &&  aiReply!=="Sorry, I couldn't find anything helpful for that." &&  (
        <div className="p-4 bg-gray-50 space-y-2">
          {/* <p className="text-sm text-gray-800">{aiReply}</p> */}
          <button
            onClick={() => {
              onCompose(aiReply)
              setAiReply("")
            }}
            className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Add to Composer
          </button>
        </div>
      )}              
       </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* {aiReply && (
        <div className="p-4 bg-gray-50 space-y-2">
          <p className="text-sm text-gray-800">{aiReply}</p>
          <button
            onClick={() => {
              onCompose(aiReply)
              setAiReply("")
            }}
            className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Add to Composer
          </button>
        </div>
      )} */}

      <div className="p-4 border-t border-gray-200">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            className="w-full pl-4 pr-10 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleAsk}
            disabled={!input.trim()}
            className="absolute right-3 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
