"use client"

import { useState, useEffect,useRef } from "react"
import { aiResponses } from "../lib/data"
import { Send, Bot, Sparkles } from "lucide-react"
import { SquareSplitHorizontal, PencilLine } from "lucide-react";

type CopilotPanelProps = {
  onCompose: (msg: string) => void;
  conversation: { role: string; text: string }[];
  onMobileViewChange?: (view: 'chat') => void;  // Add this prop
};

export default function CopilotPanel({
  onCompose,
  conversation,
  onMobileViewChange
}: CopilotPanelProps) {
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

    
    setTimeout(() => {
      setIsThinking(false);
      const aiMessage = { role: "ai", text: reply }
      setChatHistory((prev) => [...prev, aiMessage])
      setAiReply(reply)
    }, 1500)

    setInput("")
  }

  // Loading Screen
  if (isLoading) {
    return (
      <section className="h-[100dvh] lg:h-auto lg:w-96 bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100 m-1 rounded-xl overflow-hidden flex flex-col items-center justify-center">
        <div className="text-center text-gray-700">
          <div className="relative">
            <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Bot size={32} className="text-gray-700" />
            </div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold mb-2">AI Copilot</h2>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </section>
    );
  }

  const handleAddToComposer = () => {
    onCompose(aiReply);
    setAiReply("");
    setChatHistory((prev) => prev.map((msg, idx) => {
      if (idx === chatHistory.length - 1) {
        return { ...msg, composed: true };
      }
      return msg;
    }));
    

    if (window.innerWidth < 1024 && onMobileViewChange) {
      onMobileViewChange('chat');
    }
  };

  return (
    <section className="h-[100dvh] lg:h-auto lg:w-96 bg-gradient-to-br from-blue-50 via-purple-200 to-blue-200 m-1 rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm lg:sticky hidden lg:block">
        <div className="flex items-center justify-between">
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
          <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-white/60 rounded-lg backdrop-blur-sm">
            <SquareSplitHorizontal size={18} />
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar" style={{ height: 'calc(100dvh - 500px)' }}>
        {chatHistory.length === 0 ? (
          <div className="flex flex-col gap-4 items-center h-full justify-center space-x-3">
            <div className="flex-shrink-0 w-16 h-16 bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot size={24} className="text-gray-700" />
            </div>
            <div className="text-center">
              <p className="text-xl font-medium text-gray-800">Hi, I'm Fin – your AI Copilot</p>
              <p className="mt-1 text-sm text-gray-600">Ask me anything about this conversation</p>
            </div>
          </div>
        ) : (
          <>
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}>
                <div className={`flex items-end gap-2 ${msg.role === "ai" ? "flex-row" : "flex-row-reverse"}`}>
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Bot size={16} className="text-gray-700" />
                    </div>
                  )}
                  {msg.role === "user" && (
                    <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-gray-700 text-sm font-medium">Y</span>
                    </div>
                  )}
                  <div
                    className={`text-sm p-3 rounded-lg max-w-[75%] ${msg.role === "ai"
                        ? "bg-white/90 text-gray-800 rounded-bl-none backdrop-blur-sm border border-gray-200"
                        : "bg-gray-100/80 text-gray-700 rounded-br-none backdrop-blur-sm"
                      }`}
                  >
                    {msg.text}
                    {msg.role === "ai" && i === chatHistory.length - 1 && aiReply !== "Sorry, I couldn't find anything helpful for that." &&  aiReply!=="Hi, how can I help you today?" &&(
                      <div className="mt-3 space-y-2 p-2">
                        <button
                          onClick={handleAddToComposer}
                          className="text-xs px-3 py-2 flex gap-2 font-semibold items-center bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105"
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
                  <div className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot size={16} className="text-gray-700" />
                  </div>
                  <div className="bg-gradient-to-r from-white/60 to-white/80 text-gray-700 rounded-lg rounded-bl-none backdrop-blur-sm p-4 max-w-[75%] border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-gray-700 animate-pulse" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
             <div  ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky lg:pb-4 pb-[36px] bottom-0 left-0 right-0 p-4 border-t border-gray-300 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm">
        <div className="mb-3 text-center flex items-center gap-2">
          <p className="text-xs text-gray-500">Suggested :</p>
          <button className=" text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors backdrop-blur-sm">
            How do I get a refund?
          </button>
        </div>
        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            className="w-full pl-4 pr-10 py-3 text-sm bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-200 placeholder-gray-500"
            disabled={isThinking}
          />
          <button
            onClick={handleAsk}
            disabled={!input.trim() || isThinking}
            className="absolute right-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}