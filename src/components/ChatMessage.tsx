import { useState,useEffect } from 'react';
import { useChat } from '../context/chatContext';
import { ChevronDown, MessageSquareText, Zap, SmileIcon, BookMarked, Ellipsis, MailOpen, MoonStar } from 'lucide-react';


export default function ChatMessage({ initialComposer = '' }: { initialComposer?: string }) {
    const { message: messages, setActiveMessage } = useChat();
    const [composer, setComposer] = useState(initialComposer);
    const hasActiveMessage = messages.some(message => message.isActive);

    useEffect(() => {
        setComposer(initialComposer);
    }, [initialComposer]);

    const handleSend = () => {
        if (!composer.trim()) return;
        const activeMsg = messages.find(m => m.isActive);
        if (!activeMsg) return;

        const newMessage = {
            id: activeMsg.id,
            sender: 'You',
            avatar: 'Y',
            preview: composer.substring(0, 50) + '...',
            fullMessage: composer,
            time: 'now',
            isActive: true,
            chatHistory: [...(activeMsg.chatHistory || []), { role: 'you', text: composer }]
        };
        setActiveMessage(newMessage);
        setComposer('');
    };

    return (
        <section className="flex-1 flex flex-col bg-white lg:h-auto h-[calc(100vh-4rem)] relative m-1 rounded-2xl">
            <div className="flex-1 rounded-xl bg-white p-4 overflow-y-auto space-y-3 pb-40">

                {hasActiveMessage ? (
                    messages.map((message) =>

                        message.isActive && (
                            <>
                                <div key={message.id} className="space-y-4">
                                    <div className='flex items-center  relative justify-between border-b border-gray-200 pb-2'>
                                        <div className="lg:text-xl font-semibold p-2 pl-8 lg:pl-2">
                                            {message.sender}
                                        </div>
                                        <div className='flex items-center gap-3 pb-2'>
                                            <button className='lg:p-2 p-1 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg'><Ellipsis size={window.innerWidth >= 1024 ? 20 : 14}/></button>
                                            <button className='lg:p-2 p-1 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg'><MoonStar size={window.innerWidth >= 1024 ? 20 : 14} style={{ fill: 'black' }} /></button>
                                            <button className='lg:p-2 p-1 px-3 bg-gray-900 hover:bg-gray-950 cursor-pointer rounded-lg flex items-center gap-2 font-semibold text-white text-xs '><MailOpen size={window.innerWidth >= 1024 ? 14 : 14}/> Close</button>
                                        </div>
                                    </div>
                                    {message.chatHistory?.map((chat, index) => (
                                        <div key={index} className={`flex gap-4 items-end mt-6 ${chat.role === 'you' ? 'flex-row-reverse' : ''}`}>
                                            <div className={`flex-shrink-0 w-8 h-8 ${chat.role !== 'user' ? 'bg-gray-100' : 'bg-blue-100'} rounded-full flex items-center justify-center ${chat.role !== 'user' ? 'text-gray-600' : 'text-blue-600'} font-medium`}>
                                                {chat.role === 'you' ? 'Y' : message.avatar}
                                            </div>
                                            <div className={`text-md max-w-[65%] p-3 rounded-lg ${chat.role !== 'user' ? 'bg-amber-100 rounded-br-none' : 'bg-blue-100 rounded-bl-none'}`}>
                                                {chat.text.split('\n').map((line, i) => (
                                                    <span key={i} className="break-words whitespace-pre-wrap">
                                                        {line}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border border-gray-200 shadow-lg flex flex-col gap-2 m-2 rounded-lg bg-white absolute bottom-0 left-0 right-0">
                                    <div className='flex gap-2 items-center'>
                                        <MessageSquareText size={20} color='black' style={{ fill: 'black', stroke: 'white' }} />
                                        <p className='font-semibold text-[14px]'>Chat</p>
                                        <ChevronDown size={16} color='black' />
                                    </div>
                                    <textarea
                                        className="flex-1 rounded p-2 text-sm focus:outline-none w-full resize-none h-[50px]  overflow-y-auto"
                                        value={composer}
                                        onChange={(e) => setComposer(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                                        placeholder="Write your response..."
                                    />
                                    <div className='relative flex justify-between items-center'>
                                        <div className='flex gap-2'>
                                            <button className='hover:bg-gray-50'><Zap size={window.innerWidth >= 1024 ? 18 : 14} style={{ fill: 'black' }} /></button>
                                            <div className=''>|</div>
                                            <button className='hover:bg-gray-50'><BookMarked size={window.innerWidth >= 1024 ? 20 : 14} style={{ fill: 'black', stroke: 'white' }} /></button>
                                            <button className='hover:bg-gray-50'><SmileIcon size={window.innerWidth >= 1024 ? 20 : 16} style={{ fill: 'black', stroke: 'white' }} /></button>
                                        </div>
                                        <button
                                            onClick={handleSend}
                                            className="text-gray-500 p-2 flex items-center gap-3 rounded-lg hover:bg-gray-200 text-sm font-semibold w-auto"
                                        >
                                            Send <ChevronDown size={16} color='gray' />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    )

                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-lg">Select a chat to display</p>
                    </div>
                )}
            </div>

        </section>
    );
}
