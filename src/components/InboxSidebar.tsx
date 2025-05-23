import ConversationList from "./ConversationList";
import { ChevronDown } from 'lucide-react';

// interface InboxSideBarProps {
//     onChatSelect: () => void;
// }

export default function InboxSideBar() {
    return (
        <section className="lg:w-1/5 bg-white w-full lg:shadow-md m-1 rounded-xl">
            <div className="p-4 pb-9">
                <p className="lg:text-xl font-semibold border-b border-gray-200 p-2 pb-3">Your inbox</p>
                <div className="mt-4">
                    <div className="flex justify-between items-center p-2 font-bold">
                        <button className="cursor-pointer hover:bg-gray-50 flex gap-2 items-center">3 Open <ChevronDown size={20}/></button>
                        <div className="flex gap-2 items-center">Waiting Longest <ChevronDown size={20} /></div>
                    </div>
                    <ConversationList  />
                </div>
            </div>
        </section>
    );
}