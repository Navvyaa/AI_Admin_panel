"use client"

import { useState } from "react"
import { aiResponses } from "../lib/data"
import { Send, Bot } from "lucide-react"
import { useRef } from "react"
import { SquareSplitHorizontal, PencilLine } from "lucide-react";
export default function CopilotPanel({
  onCompose,
  conversation,
}: {
  onCompose: (msg: string) => void
  conversation: { role: string; text: string }[]
}) {
  const [input, setInput] = useState<string>("");
  const [aiReply, setAiReply] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>(conversation || []);
  const scrollend = useRef(chatHistory.length);

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
    <section className=" lg:w-96 bg-white m-1 rounded-xl h-[100dvh] overflow-x-hidden flex flex-col p-2 ">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 pl-8 lg:pl-0" >
            <h2 className="text-xl font-semibold border-b-3 border-current">Copilot</h2>
            <h3 className="text-lg font-semibold cursor-pointer">Details</h3>
          </div>

          <span className="px-2 py-1 text-xs font-medium text-black bg-gray-100 rounded-lg"><SquareSplitHorizontal size={18} /></span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="flex flex-col gap-4 items-center h-full justify-center space-x-3">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-blue-600" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-gray-900"> Hi, I'm Fin – your AI Copilot</p>
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
                    <span className="text-gray-600 text-sm font-medium">Y</span>
                  </div>
                )}
                <div
                  className={`text-sm p-3 rounded-lg max-w-[75%] ${msg.role === "ai"
                      ? "bg-gray-100  rounded-bl-none"
                      : "bg-gray-200 text-gray-800 rounded-br-none"
                    }`}
                >
                  {msg.text}
                  {msg.role === "ai" && i === chatHistory.length - 1 && aiReply !== "Sorry, I couldn't find anything helpful for that." && (
                    <div className="p-4  space-y-2">
                      <button
                        onClick={() => {
                          onCompose(aiReply);
                          setAiReply("");
                          setChatHistory((prev) => prev.map((msg, idx) => {
                            if (idx === chatHistory.length - 1) {
                              return { ...msg, composed: true };
                            }
                            return msg;
                          }));
                        }}
                        className="text-xs px-3 py-2 flex gap-3 font-semibold items-center  bg-gray-900 text-white rounded-3xl  hover:bg-black transition-colors"
                      >
                        <PencilLine size={16} strokeWidth={2.5} />
                        <p>Add to Composer</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>



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
