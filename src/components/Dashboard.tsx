import { useState } from "react";
import InboxSideBar from "./InboxSidebar";
import CopilotPanel from "./CopilotPanel";
import ChatMessage from "./ChatMessage";

export default function Dashboard() {
  const [chat, setChat] = useState<string[]>([
    "Customer: Hi, I need help with a defective item."
  ]);

  const addToChat = (msg: string) => {
    setChat(prev => [...prev, "AI: " + msg]);
  };

  return (
    <section className="flex h-screen bg-gray-50">
      <InboxSideBar />
      <ChatMessage chat={chat} />
      <CopilotPanel onSuggestionClick={addToChat} />
    </section>
  );
}
