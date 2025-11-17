import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";

export default function MessageView() {
    const contact = {
        name: "Aline",
        number: "+242 06 123 45 67",
        status: "En ligne",
        photo: "/roman-reigns-1.PNG",
    };

    const messages = [
        { id: 1, from: "me", text: "Salut ! Ça va ?", time: "12:40" },
        { id: 2, from: "other", text: "Oui ça va et toi ?", time: "12:41" },
        { id: 3, from: "me", text: "Tranquille 😄", time: "12:42" },
    ];

    return (
        <div className="h-full  flex flex-col ">



            {/* 🔹 HEADER : Infos du contact */}
            <div className="flex items-center justify-between px-4 py-3  bg-gray-500/10  shadow-sm">

                {/* Photo + infos */}
                <div className="flex items-center gap-3 ">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border">
                        <Image
                            src={contact.photo}
                            alt={contact.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="leading-tight">
                        <p className="font-semibold text-gray-800 text-[15px]">{contact.name}</p>
                        <p className="text-[12px] text-gray-500">{contact.number}</p>
                        <p className="text-[11px] text-green-600">{contact.status}</p>
                    </div>
                </div>

                {/* Icône plus d’infos */}
                <FiMoreVertical size={22} className="text-gray-700 cursor-pointer" />
            </div>

            {/* 🔹 MESSAGES */}
            <div className="flex-1 overflow-y-auto p-3 bg-gradient-to-bl
                from-green-900/80
                via-white/50
                to-pink-600/50">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`mb-5 flex ${
                            m.from === "me" ? "justify-end" : "justify-start"
                        }`}
                    >

                        <div className="max-w-[70%]">
                            <p
                                className={`px-3 py-2 text-base font-light text-[15px] rounded-xl ${
                                    m.from === "me"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                            >
                                {m.text}
                            </p>

                            {/* 🔹 Date / heure d’envoi */}
                            <p
                                className={`text-[10px] mt-1 ${
                                    m.from === "me"
                                        ? "text-right text-gray-200"
                                        : "text-left text-gray-500"
                                }`}
                            >
                                {m.time}
                            </p>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}
