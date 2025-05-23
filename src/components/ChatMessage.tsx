import { useState } from 'react';
import { useChat } from '../context/chatContext';
import { ChevronDown, MessageSquareText ,Zap,SmileIcon,BookMarked, Ellipsis, MailOpen,MoonStar} from 'lucide-react';


export default function ChatMessage() {
    const { message: messages, setActiveMessage } = useChat();
    const [composer, setComposer] = useState('');
    const hasActiveMessage = messages.some(message => message.isActive);

    const handleSend = () => {
        if (!composer.trim()) return;
        const newMessage = {
            id: (messages.length + 1).toString(),
            sender: 'Agent',
            avatar: 'A',
            preview: composer.substring(0, 50) + '...',
            fullMessage: composer,
            time: 'now',
            isActive: true
        };
        // setActiveMessage(newMessage);
        setComposer('');
    };

    return (
        <div className="flex-1 flex flex-col bg-white">
            <section className="flex-1 bg-white h-full border-r border-gray-200 p-4 overflow-y-auto space-y-3">
                {hasActiveMessage ? (
                    messages.map((message, index) =>
                        message.isActive && (
                            <div key={index} className="space-y-2">
                                <div className='flex items-center relative justify-between border-b border-gray-200 '>
                                <div className="lg:text-xl font-semibold  p-2">
                                    {message.sender}
                                </div>
                                    <div className='flex items-center gap-3 pb-2'>
                                        <button className='p-2 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg'><Ellipsis  /></button>
                                        <button className='p-2 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg'><MoonStar size={20} style={{ fill: 'black' }} /></button>
                                        <button className='p-1 px-3 bg-gray-900  hover:bg-gray-950 cursor-pointer rounded-lg flex items-center gap-2 font-semibold text-white'><MailOpen size={18}/> Close</button>
                                    </div>
                                </div>
                                <div className='flex gap-4 items-end mt-6'>
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                        {message.avatar}
                                    </div>
                                    <div className="text-md max-w-[65%] p-2 rounded bg-gray-100">
                                        {message.fullMessage}
                                    </div>
                                </div>
                            </div>
                        )
                    )
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-lg">Select a chat to display</p>
                    </div>
                )}
            </section>
            <div className="p-4 border border-gray-200 shadow-lg flex flex-col gap-2  m-2 ronded-lg">
                <div className='flex gap-2 items-center'>
                    <MessageSquareText size={20} color='black'  style={{ fill: 'black',stroke:'white'}}/>
                    <p className='font-semibold text-[14px]'>Chat</p>
                    <ChevronDown size={16} color='black'/>
                </div>
                <input
                    type="text"
                    className="flex-1  rounded p-2 text-sm focus:outline-none"
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                    placeholder="Write your response..."
                />
                <div className='relative flex justify-between items-center'>
                    <div className='flex gap-2 '>
                        <button className='hover:bg-gray-50'><Zap size={18} style={{ fill: 'black'}}/></button>
                        <div className=''>|</div>
                        <button className='hover:bg-gray-50'><BookMarked size={20} style={{ fill: 'black',stroke:'white'}}/></button>
                        <button className='hover:bg-gray-50'><SmileIcon size={20} style={{ fill: 'black',stroke:'white'}}/></button>
                    </div>

                <button
                    onClick={handleSend}
                    className=" text-gray-500 p-2 flex items-center gap-3 hover:bg-gray-100 text-sm font-semibold w-auto  right-3 bottom-2"
                >
                    Send <ChevronDown size={16} color='gray'/>
                </button>
                </div>
               
            </div>
        </div>
    );
}
  