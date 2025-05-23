
import { useState } from "react"
import InboxSideBar from "./InboxSidebar"
import ChatMessage from "./ChatMessage"
import CopilotPanel from "./CopilotPanel"

export default function Dashboard() {
  
  const [copilotConvo, setCopilotConvo] = useState<{ role: string; text: string }[]>([])
  const [composer, setComposer] = useState("")

  const handleAddToComposer = (text: string) => {
    setComposer(text)
  }

  return (
    <>
    <section className=" lg:flex hidden h-screen bg-gray-100">
      <InboxSideBar />
      {/* <div className="flex-1 flex flex-col "> */}
        <ChatMessage initialComposer={composer} />
      {/* </div> */}
      <CopilotPanel conversation={copilotConvo} onCompose={handleAddToComposer} />
    </section>
    {/* <section className="lg:hidden ">

    </section> */}
    </>
  )
}
