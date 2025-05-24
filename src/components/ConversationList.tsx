import { useChat } from '../context/chatContext';
import { useTheme } from '../context/themeContext';

interface ConversationListProps {
    onChatSelect?: () => void;
}

export default function ConversationList({ onChatSelect }: ConversationListProps) {
    const { message: messages, setActiveMessage } = useChat();
    const { darkMode } = useTheme();

    const handleMessageClick = (message: any) => {
        setActiveMessage(message);
        if (onChatSelect) {
            onChatSelect();
        }
    };

    return (
        <section className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="h-full flex flex-col">
                <div className="p-2"></div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {messages.map((message) => (
                        <div key={message.id}
                            onClick={() => handleMessageClick(message)} 
                            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                                message.isActive 
                                    ? (darkMode ? 'bg-blue-900/50' : 'bg-blue-50')
                                    : (darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50')
                            }`}
                        >
                            <div className={`flex-shrink-0 w-10 h-10 ${darkMode ? 'bg-blue-600' : 'bg-blue-100'} rounded-full flex items-center justify-center ${darkMode ? 'text-white' : 'text-blue-600'} font-medium`}>
                                {message.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'} truncate`}>{message.sender}</h3>
                                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{message.time}</span>
                                </div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>{message.preview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}