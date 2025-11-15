export default function MessageView() {
    const messages = [
        { id: 1, from: "me", text: "Salut ! Ça va ?" },
        { id: 2, from: "other", text: "Oui ça va et toi ?" },
        { id: 3, from: "me", text: "Tranquille 😄" },
    ];

    return (
        <div>
            {messages.map((m) => (
                <div
                    key={m.id}
                    className={`mb-3 flex ${
                        m.from === "me" ? "justify-end" : "justify-start"
                    }`}
                >
                    <p
                        className={`px-4 py-2 rounded-xl max-w-[70%] ${
                            m.from === "me"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800"
                        }`}
                    >
                        {m.text}
                    </p>
                </div>
            ))}
        </div>
    );
}
