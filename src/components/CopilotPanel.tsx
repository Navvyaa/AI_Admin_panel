"use client"

import { useState, useEffect,useRef } from "react"
import { aiResponses } from "../lib/data"
import { Send, Bot, Sparkles } from "lucide-react"
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
  const [isThinking, setIsThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isThinking]);


  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAsk = () => {
    if (!input.trim()) return

    const userMessage = { role: "user", text: input }
    setChatHistory((prev) => [...prev, userMessage])
    setIsThinking(true);

    const keyword = Object.keys(aiResponses).find((keyword) => input.toLowerCase().includes(keyword))
    const reply = keyword ? aiResponses[keyword] : "Sorry, I couldn't find anything helpful for that."

    // Show thinking animation for 2 seconds
    setTimeout(() => {
      setIsThinking(false);
      const aiMessage = { role: "ai", text: reply }
      setChatHistory((prev) => [...prev, aiMessage])
      setAiReply(reply)
    }, 2000)

    setInput("")
  }

  // Loading Screen
  if (isLoading) {
    return (
      <section className="h-[100dvh] lg:h-auto lg:w-96 bg-gradient-to-br from-indigo-100 via-purple-200 to-blue-200 m-1 rounded-xl overflow-hidden flex flex-col items-center justify-center">
        <div className="text-center text-gray-700">
          <div className="relative">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Bot size={32} className="text-gray-700" />
            </div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-black/30 border-t-gray-800 rounded-full animate-spin mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold mb-2">AI Copilot</h2>
          <p className="text-black/80">Initializing...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="h-[100dvh] lg:h-auto lg:w-96 bg-gradient-to-br from-indigo-100 via-purple-200 to-blue-200 m-1 rounded-xl overflow-hidden flex flex-col">
      {/* Header with gradient */}
      <div className="p-4 border-b border-black/20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-black" />
                </div>
                <h2 className="text-lg font-semibold text-black ml-2">AI Copilot</h2>
              </div>
            </div>
            <h3 className="text-lg font-semibold cursor-pointer text-black/80 hover:text-black transition-colors">Details</h3>
          </div>
          <span className="px-2 py-1 text-xs font-medium text-black bg-white/20 rounded-lg backdrop-blur-sm">
            <SquareSplitHorizontal size={18} />
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-[80px]">
        {chatHistory.length === 0 ? (
          <div className="flex flex-col gap-4 items-center h-full justify-center space-x-3">
            <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot size={24} className="text-gray-800" />
            </div>
            <div className="text-center">
              <p className="text-xl font-medium text-gray-800">Hi, I'm Fin – your AI Copilot</p>
              <p className="mt-1 text-sm text-black/70">Ask me anything about this conversation</p>
            </div>
          </div>
        ) : (
          <>
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}>
                <div className={`flex items-end gap-2 ${msg.role === "ai" ? "flex-row" : "flex-row-reverse"}`}>
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Bot size={16} className="text-black" />
                    </div>
                  )}
                  {msg.role === "user" && (
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-black text-sm font-medium">Y</span>
                    </div>
                  )}
                  <div
                    className={`text-sm p-3 rounded-lg max-w-[75%] ${msg.role === "ai"
                        ? "bg-white/90 text-gray-800 rounded-bl-none backdrop-blur-sm"
                        : "bg-white/20 text-gray-600 rounded-br-none backdrop-blur-sm"
                      }`}
                  >
                    {msg.text}
                    {msg.role === "ai" && i === chatHistory.length - 1 && aiReply !== "Sorry, I couldn't find anything helpful for that." && (
                      <div className="mt-3 space-y-2">
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
                          className="text-xs px-3 py-2 flex gap-2 font-semibold items-center bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:scale-105"
                        >
                          <PencilLine size={14} strokeWidth={2.5} />
                          <p>Add to Composer</p>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Thinking Animation */}
            {isThinking && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2 flex-row">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot size={16} className="text-black" />
                  </div>
                  <div className="bg-gradient-to-r from-white/20 to-white/30 text-black rounded-lg rounded-bl-none backdrop-blur-sm p-4 max-w-[75%]">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-black animate-pulse" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div className="w-2 h-2 bg-black/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-black/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-black/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
             <div ref={messagesEndRef} />
          </>
        )}
      </div>

      
      <div className="lg:static absolute bottom-0 overflow-y-hidden left-0 right-0 p-4 border-t border-black/20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm">
      <div className="mb-3 text-center flex items-center gap-2">
          <p className="text-xs text-black/60">Suggested :</p>
          <button className="mt-1 text-xs px-3 py-1 bg-black/20 text-white rounded-full hover:bg-black/30 transition-colors backdrop-blur-sm">
            How do I get a refund?
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            className="w-full pl-4 pr-10 py-3 text-sm bg-white/90 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 placeholder-gray-500"
            disabled={isThinking}
          />
          <button
            onClick={handleAsk}
            disabled={!input.trim() || isThinking}
            className="absolute right-8 text-indigo-500 hover:text-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
       
      </div>
    </section>
  )
}