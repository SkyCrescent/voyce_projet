"use client";

import Image from "next/image";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import logo from "@/public/logo.png"
export default function ConversationList() {
    const [search, setSearch] = useState("");

    const conversations = [
        {
            id: 1,
            contact: "Aline",
            lastMsg: "D’accord merci !",
            date: "12:45",
            photo: { src: "/roman-reigns-1.PNG" },
        },
        {
            id: 2,
            contact: "Jean",
            lastMsg: "On se voit demain ?",
            date: "11:20",
            photo: { src: "/goku.JPG" },
        },
        {
            id: 3,
            contact: "Maman",
            lastMsg: "Tu as mangé ?",
            date: "Hier",
            photo: { src: "/goku.JPG" },
        },
    ];

    const filteredConversations = conversations.filter((c) =>
        c.contact.toLowerCase().includes(search.toLowerCase())
    );

    const handleNewConversation = () => {
        console.log("Démarrer une nouvelle conversation !");
    };

    return (
        <div className="h-full flex flex-col   relative overflow-hidden">

            {/* 🔹 FOND DÉGRADÉ (ce que tu as demandé) */}

            <div className="absolute w-full inset-0 bg-gradient-to-bl
                from-sky-600/50
                via-white/50
                to-sky-600/50
            "/>
            {/* Contenu réel au-dessus */}
            <div className="relative z-10">

                {/* 🔹 HEADER : Logo + Search */}
                <div
                    className="flex items-center justify-between pr-2 border-b border-gray-200 bg-white/70 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <Image
                            src={logo.src}
                            alt="logo"
                            width={60}
                            height={50}
                            className="dark:invert"
                        />
                        <h2 className="text-lg font-semibold text-gray-700">Chats</h2>
                    </div>

                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-blue-500 bg-white/80"
                    />
                </div>

                {/* 🔹 LISTE DES CONVERSATIONS */}
                <div className="flex-1 overflow-y-auto p-1 font-roboto">
                    {filteredConversations.map((c) => (
                        <div
                            key={c.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100/70 cursor-pointer"
                        >
                            {/* Photo bien ronde */}
                            <div
                                className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 bg-gray-100">
                                <Image
                                    src={`${c.photo.src}`}
                                    alt={c.contact}
                                    width={55}
                                    height={55}
                                    className="w-full h-full object-cover"
                                />


                                {/* Logo en bas à droite */}
                                <div
                                    className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow">
                                    <Image
                                        src="/logo.PNG"
                                        alt="logo"
                                        width={12}
                                        height={12}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-center flex-1 leading-tight">
                                <p className="font-semibold text-sky-600 text-[15px]">{c.contact}</p>
                                <p className="text-[12px] text-gray-700 font-light truncate">{c.lastMsg}</p>
                            </div>

                            <span className="text-xs text-gray-800">{c.date}</span>
                        </div>
                    ))}

                    {filteredConversations.length === 0 && (
                        <p className="text-center text-gray-200 mt-4">Aucune conversation</p>
                    )}
                </div>

                {/* 🔹 Bouton pour nouvelle conversation */}
                <button
                    onClick={handleNewConversation}
                    className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
                >
                    <FiPlus size={24}/>
                </button>

            </div>
        </div>
    );
}
