import ConversationList from "./ConversationList";
import { ChevronDown } from 'lucide-react';

interface InboxSideBarProps {
  onChatSelect: () => void;
}

export default function InboxSideBar({ onChatSelect }: InboxSideBarProps) {
    return (
        <section className="lg:w-1/5 lg:h-auto bg-white overflow-y-hidden lg:shadow-md m-1 rounded-xl">
            <div className="p-4 pb-9">
                <p className="text-xl font-semibold border-b border-gray-200 p-2 pb-3">Your inbox</p>
                <div className="mt-4">
                    <div className="flex justify-between items-center p-2 font-semibold text-sm">
                        <button className="cursor-pointer hover:bg-gray-50 flex gap-2 items-center">3 Open <ChevronDown size={16} /></button>
                        <div className="flex gap-2 items-center">Waiting Longest <ChevronDown size={16} /></div>
                    </div>
                    <ConversationList onChatSelect={onChatSelect} />
                </div>
            </div>
        </section>
    );
}