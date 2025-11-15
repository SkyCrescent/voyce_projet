import { useState } from "react";

export default function MessageInput() {
    const [text, setText] = useState("");

    return (
        <div className="flex items-center gap-2">
            <input
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Écrire un message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                Envoyer
            </button>
        </div>
    );
}
