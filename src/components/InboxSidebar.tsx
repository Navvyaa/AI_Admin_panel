import ConversationList from "./ConversationList";

export default function InboxSideBar() {
    
    return (

        <section className="lg:w-1/5 bg-white  lg:shadow-md h-full">
            <div className="p-4">
                <p className="lg:text-2xl font-semibold">Your inbox</p>
                <div className="mt-4">
                    <div className="flex justify-between items-center px-2 font-semibold">
                        <button className="cursor-pointer hover:bg-gray-50" >5 Open</button>
                        <div>Waiting Longest</div>
                    </div>
                    <ConversationList />
                </div>
            </div>
        </section>
    )
}