import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { messages as initialMessages } from "../lib/data";

interface Message {
    id: string;
    sender: string;
    avatar: string;
    preview: string;
    fullMessage: string;
    time: string;
    isActive: boolean;
}
 interface ChatContextType {
    message: Message[];
    activeMessage: Message | null;
    setActiveMessage: (message: Message) => void;
}
const ChatContext=createContext<ChatContextType | undefined>(undefined);

export default function ChatProvider ({children}:{children:ReactNode}){
    const [messages,setMessages]=useState<Message[]>(initialMessages);
    const [activeMessage,setActiveMessage]=useState<Message | null>(messages.find(m => m.isActive) || null);
    const handleSetActiveMessage = (message: Message) => {
        setMessages(messages.map(m => ({
          ...m,
          isActive: m.id === message.id
        })));
        setActiveMessage(message);
      };
    
      return (
        <ChatContext.Provider value={{
          message: messages,
          activeMessage,
          setActiveMessage: handleSetActiveMessage
        }}>
          {children}
        </ChatContext.Provider>
      );
    }
    
    export function useChat() {
      const context = useContext(ChatContext);
      if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
      }
      return context;
}