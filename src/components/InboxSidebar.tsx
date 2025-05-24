import ConversationList from "./ConversationList";
import { ChevronDown } from 'lucide-react';
import { useTheme } from "../context/themeContext";

interface InboxSideBarProps {
    onChatSelect: () => void;
}

export default function InboxSideBar({ onChatSelect }: InboxSideBarProps) {
    const { darkMode } = useTheme();

    return (
        <section className={`lg:w-1/5 lg:h-auto ${darkMode ? 'bg-gray-900' : 'bg-white'} overflow-y-hidden lg:shadow-md m-1 rounded-xl`}>
            <div className="p-3 pb-9">
                <p className={`text-xl font-semibold border-b ${darkMode ? 'border-gray-700 text-white' : 'border-gray-200'
                    } p-2 pb-3`}>
                    Your inbox
                </p>
                <div className="mt-4">
                    <div className={`flex justify-between items-center p-2 font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        <button className={`cursor-pointer ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                            } flex gap-2 items-center`}>
                            3 Open <ChevronDown size={16} />
                        </button>
                        <div className="flex gap-2 items-center">
                            Waiting Longest <ChevronDown size={16} />
                        </div>
                    </div>
                    <ConversationList onChatSelect={onChatSelect} />
                </div>
            </div>
        </section>
    );
}