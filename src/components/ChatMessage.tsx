export default function ChatMessage({ chat }: { chat: string[] }) {
    return (
      <section className="flex-1 bg-white h-full border-r border-gray-200 p-4 overflow-y-auto space-y-3">
        {chat.map((line, i) => (
          <div key={i} className="text-sm p-2 rounded bg-gray-100">
            {line}
          </div>
        ))}
      </section>
    );
  }
  