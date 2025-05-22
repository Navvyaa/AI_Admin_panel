import { useState } from 'react';
import { aiResponses } from '../lib/data';

export default function CopilotPanel({ onSuggestionClick }: { onSuggestionClick: (msg: string) => void }) {
  const [input, setInput] = useState('');
  const [aiReply, setAiReply] = useState('');

  const handleAsk = () => {
    const keyword = Object.keys(aiResponses).find(key => input.toLowerCase().includes(key));
    const reply = keyword ? aiResponses[keyword] : "Sorry, I couldn't find anything helpful for that query.";
    setAiReply(reply);
  };

  return (
    <section className="w-96 bg-white border-l border-gray-200">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">AI Copilot</h2>
            <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">Beta</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              🤖
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Hi, I'm Fin – your AI Copilot</p>
              <p className="mt-1 text-sm text-gray-500">Ask me about this conversation</p>
            </div>
          </div>
          {aiReply && (
            <div className="bg-gray-100 p-3 rounded text-sm text-gray-700 space-y-2">
              <p>{aiReply}</p>
              <button
                onClick={() => onSuggestionClick(aiReply)}
                className="text-xs text-white bg-blue-600 px-2 py-1 rounded"
              >
                Add to Chat
              </button>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full pl-4 pr-10 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleAsk}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
