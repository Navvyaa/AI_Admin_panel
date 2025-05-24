import { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/chatContext';
import { ChevronDown, MessageSquareText, Zap, SmileIcon, BookMarked, Ellipsis, MailOpen, MoonStar,Sun } from 'lucide-react';
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react';
import { useTheme } from '../context/themeContext';

export default function ChatMessage({ initialComposer = '', onMobileBack }: { initialComposer?: string, onMobileBack?: () => void }) {
    const { message: messages, setActiveMessage } = useChat();
    const [composer, setComposer] = useState(initialComposer);
    const hasActiveMessage = messages.some(message => message.isActive);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const { darkMode, toggleDarkMode } = useTheme();


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setComposer(prev => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

    const handleClose = () => {
        if (window.innerWidth <= 1024) {
            onMobileBack?.();
        }
    };

    return (
        <section className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-white'} h-[100dvh] lg:h-auto relative m-1 rounded-2xl overflow-hidden`}>
            <div className={`flex-1 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'} p-4 lg:pt-0 space-y-3 overflow-y-auto no-scrollbar`} >
                {hasActiveMessage ? (
                    messages.map((message) =>
                        message.isActive && (
                            <div key={message.id}>
                                <div className="space-y-4">
                                    <div className={`lg:flex lg:sticky hidden pt-5 lg:pt-3 items-center justify-between border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} pb-2 top-0 z-10`}>
                                        <div className={`lg:text-xl font-semibold p-2 pl-8 lg:pl-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {message.sender}
                                        </div>
                                        <div className='flex items-center gap-3 pb-2'>
                                            <button className={`lg:p-2 p-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer rounded-lg`}>
                                                <Ellipsis size={window.innerWidth >= 1024 ? 20 : 14} color={darkMode ? 'white' : 'black'} />
                                            </button>
                                            <button
                                                onClick={toggleDarkMode}
                                                className={`lg:p-2 p-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer rounded-lg transition-all duration-300`}>
                                                {darkMode ? (
                                                    <Sun size={window.innerWidth >= 1024 ? 20 : 14} style={{ fill: 'white' ,stroke:'white' }} />
                                                ) : (
                                                    <MoonStar size={window.innerWidth >= 1024 ? 20 : 14} style={{ fill: 'black' }} />
                                                )}
                                            </button>
                                            <button
                                                onClick={handleClose}
                                                className={`lg:p-2 p-1 px-3 ${darkMode ? 'bg-gray-200 hover:bg-gray-100 text-gray-900' : 'bg-gray-900 hover:bg-gray-950 text-white'} cursor-pointer rounded-lg flex items-center gap-2 font-semibold text-xs`}
                                            >
                                                <MailOpen size={window.innerWidth >= 1024 ? 14 : 14} /> Close
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pb-4 lg:overflow-y-auto">
                                        {message.chatHistory?.map((chat, index) => (
                                            <div key={index} className={`flex gap-4 items-end mt-6 ${chat.role === 'you' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`flex-shrink-0 w-8 h-8 ${chat.role !== 'user' ? (darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-600') : (darkMode ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-600')} rounded-full flex items-center justify-center font-medium`}>
                                                    {chat.role === 'you' ? 'Y' : message.avatar}
                                                </div>
                                                <div className={`text-md max-w-[65%] p-3 rounded-lg ${chat.role !== 'user' ? (darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900') + ' rounded-br-none' : (darkMode ? 'bg-blue-800 text-white' : 'bg-blue-100 text-gray-900') + ' rounded-bl-none'}`}>
                                                    {chat.text.split('\n').map((line, i) => (
                                                        <span key={i} className="break-words whitespace-pre-wrap">
                                                            {line}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                        )
                    )
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>Select a chat to display</p>
                    </div>
                )}
            </div>

            {hasActiveMessage && (
                <div className={`lg:static sticky bottom-0 left-0 right-0 p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} rounded-b-2xl`}>
                    <div className='flex gap-2 items-center mb-2'>
                        <MessageSquareText size={20} color={darkMode ? 'white' : 'black'} style={{ fill: darkMode ? 'white' : 'black', stroke: darkMode ? 'black' : 'white' }} />
                        <p className={`font-semibold text-[14px] ${darkMode ? 'text-white' : 'text-gray-900'}`}>Chat</p>
                        <ChevronDown size={16} color={darkMode ? 'white' : 'black'} />
                    </div>
                    <textarea
                        className={`w-full rounded p-2 text-sm focus:outline-none resize-none h-[50px] border-0 ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-900 placeholder-gray-500'}`}
                        value={composer}
                        onChange={(e) => setComposer(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                        placeholder="Write your response..."
                    />
                    <div className='flex justify-between items-center mt-2'>
                        <div className='flex gap-2 items-center'>
                            <button className={`${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} p-1 rounded cursor-pointer`}>
                                <Zap size={window.innerWidth >= 1024 ? 18 : 14} style={{ fill: darkMode ? 'white' : 'black' }} />
                            </button>
                            <div className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>|</div>
                            <button className={`${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} p-1 rounded cursor-pointer`}>
                                <BookMarked size={window.innerWidth >= 1024 ? 20 : 14} style={{ fill: darkMode ? 'white' : 'black', stroke: darkMode ? 'black' : 'white' }} />
                            </button>
                            <button className={`${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'} p-1 rounded cursor-pointer`}
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                <SmileIcon size={window.innerWidth >= 1024 ? 20 : 16} style={{ fill: darkMode ? 'white' : 'black', stroke: darkMode ? 'black' : 'white' }} />
                            </button>
                            {showEmojiPicker && (
                                <div
                                    ref={emojiPickerRef}
                                    className="absolute bottom-12 left-0 z-50"
                                >
                                    <EmojiPicker
                                        onEmojiClick={onEmojiClick}
                                        width={300}
                                        height={400}
                                        theme={darkMode ? 'dark' as Theme : 'light' as Theme}
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleSend}
                            className={`${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-200'} p-2 flex items-center gap-3 rounded-lg text-sm font-semibold`}
                        >
                            Send <ChevronDown size={16} color={darkMode ? 'gray' : 'gray'} />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}