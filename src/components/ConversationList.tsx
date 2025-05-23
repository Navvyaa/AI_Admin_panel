
import { useChat } from '../context/chatContext';

export default function ConversationList() {
    const { message: messages, setActiveMessage } = useChat();

    return (
        <section className="flex-1 bg-white ">
            <div className="h-full flex flex-col">
                <div className="p-2">
                    {/* <div className="flex items-center justify-between"> */}
                        {/* <h2 className="text-xl font-semibold text-gray-900">Conversations</h2> */}
                        {/* <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div> */}
                    {/* </div> */}
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {messages.map((message) => (
                        <div key={message.id}
                            onClick={() => setActiveMessage(message)} 
                            className={`flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer ${message.isActive ? 'bg-blue-50' : ''}`}
                        >
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                {message.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900 truncate">{message.sender}</h3>
                                    <span className="text-sm text-gray-500">{message.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}