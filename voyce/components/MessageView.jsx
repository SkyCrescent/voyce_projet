import Image from "next/image";
import {FiMoreVertical, FiTrash2, FiUserMinus} from "react-icons/fi";
import photo1 from "@/public/roman-reigns-1.png";
export default function MessageView() {
    const contact = {
        name: "Aline",
        number: "+242 06 123 45 67",
        status: "En ligne",
        photo: photo1,
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
                            width={50}
                            height={50}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="leading-tight font-sans">
                        <p className="font-semibold text-gray-800 text-[15px]">{contact.name}</p>
                        <p className="text-[11px] text-gray-500">{contact.number} / <span
                            className="text-green-600"> {contact.status}</span></p>
                        {/*<p className="text-[10px] text-green-600"></p>*/}
                    </div>
                </div>

                {/* Icône plus d’infos */}
                <div className="flex items-center gap-4">

                    {/* Icône supprimer en rouge */}
                    <div
                        className="
                        p-2 rounded-full
                        hover:bg-gray-300/20
                        transition cursor-pointer
                    ">
                    <FiTrash2
                        size={18}
                        className="text-gray-700 hover:text-red-500 transition"
                        title="Supprimer cette conversation"
                    />
                </div>
                    {/* Icône retirer des amis */}
                    <div
                        className="
        p-2 rounded-full
        hover:bg-gray-300/20
        transition cursor-pointer
    "
                    >
                        <FiUserMinus
                            size={18}
                            className="text-gray-700 hover:text-red-600 transition"
                            title="Retirer de la liste d'amis"
                        />
                    </div>


                </div>

            </div>

            {/* 🔹 MESSAGES */}
            {/* 🔹 MESSAGES */}
            <div className="flex-1 overflow-y-auto p-3 bg-gradient-to-bl from-green-900/80 via-white/50 to-pink-600/50">

                {messages.map((m, index) => {
                    const isMe = m.from === "me";

                    return (
                        <div
                            key={m.id}
                            className={`mb-4 flex animate-fadeSlide ${isMe ? "justify-end" : "justify-start"}`}
                            style={{animationDelay: `${index * 40}ms`}}
                        >
                        <div
                                className={`
                        max-w-[70%] px-3 py-2 rounded-2xl shadow-md font-sans
                        flex items-end gap-2
                        ${isMe
                                    ? "bg-sky-900/80 text-white rounded-br-sm"
                                    : "bg-gray-100/90 text-gray-900 rounded-bl-sm"
                                }
                    `}
                            >
                                {/* Heure (si message reçu → LEFT / si message envoyé → RIGHT) */}
                                {!isMe && (
                                    <span className="text-[10px] text-gray-500 mb-[1px] whitespace-nowrap">
                            {m.time}
                        </span>
                                )}

                                {/* Texte */}
                                <p className="text-[14px] leading-snug break-words">
                                    {m.text}
                                </p>

                                {isMe && (
                                    <span className="text-[10px] text-gray-300 mb-[1px] whitespace-nowrap">
                            {m.time}
                        </span>
                                )}
                            </div>
                        </div>
                    );
                })}

            </div>

        </div>
    );
}
