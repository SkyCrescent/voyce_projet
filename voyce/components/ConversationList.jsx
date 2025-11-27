"use client";

import Image from "next/image";
import { useState } from "react";
import {FiPlus, FiSearch} from "react-icons/fi";
import logo from "../public/logo.png"
import img1 from "../public/roman-reigns-1.png";
import img2 from "../public/goku.jpg";

export default function ConversationList() {
    const [search, setSearch] = useState("");
    const [focus, SetFocus] = useState(false);
    const [hover,SetHover] = useState(false)
    const conversations = [
        {
            id: 1,
            contact: "Aline",
            lastMsg: "D’accord merci !",
            date: "12:45",
            photo: img1,
        },
        {
            id: 2,
            contact: "Jean",
            lastMsg: "On se voit demain ?",
            date: "11:20",
            photo: img2,
        },
        {
            id: 3,
            contact: "Maman",
            lastMsg: "Tu as mangé ?",
            date: "Hier",
            photo: img2,
        },
    ];

    const filteredConversations = conversations.filter((c) =>
        c.contact.toLowerCase().includes(search.toLowerCase())
    );



    return (
        <div className="h-full flex flex-col  bg-gray-500/10 relative overflow-hidden">

            {/* 🔹 FOND DÉGRADÉ (ce que tu as demandé) */}

            <div className="absolute w-full "/>
            {/* Contenu réel au-dessus */}
            <div className="relative z-10">

                {/* 🔹 HEADER : Logo + Search */}
                <div className="border-b border-gray-200 px-3 py-2">

                    {/* Ligne 1 : Logo + Titre */}
                    <div className="flex items-center gap-3 mb-2">
                        <Image
                            src={logo.src}
                            alt="logo"
                            width={65}
                            height={65}
                            className="dark:invert"
                        />
                        <h2 className="text-lg font-semibold text-gray-700">Conversation</h2>
                    </div>
                    <div className="relative">
                        <span className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400">
                              <FiSearch
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                                  size={18}
                              />
                        </span>

                    {/* Ligne 2 : Champ de recherche */}
                            <input
                                type="text"
                                onFocus={() => SetFocus(true)}
                                onBlur={() => SetFocus(false)}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 pl-9 pr-3 text-sm text-black focus:outline-none focus:border-blue-500 bg-white/80"    />
                            <span
                                className={focus || search? "absolute left-4 p-1 w-auto top-3 text-xs font-normal text-sky-600 -translate-y-8 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-3 top-2   pl-7 text-[14px] text-sky-600"}> Rechercher </span>

                        </div>

                </div>
                {/* 🔹 LISTE DES CONVERSATIONS */}
                <div className="flex-1 overflow-y-auto p-1 font-roboto">
                    {filteredConversations.map((c) => (
                        <div
                            key={c.id}
                            className="flex items-center gap-3 p-3 mb-1 rounded-lg hover:bg-white/70 cursor-pointer shadow-md  "
                        >
                            {/* Photo bien ronde */}
                            <div
                                className="flex items-center justify-between gap-4   rounded-lg hover:bg-white/70 cursor-pointer group">
                                {/* Photo qui s’agrandit uniquement au hover */}
                                <div
                                    className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 bg-gray-100 transition-transform duration-300 group-hover:scale-105">
                                    <Image
                                        src={c.photo}
                                        alt={c.contact}
                                        width={55}
                                        height={55}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Texte - ne s’agrandit pas */}
                                <div className="flex flex-col justify-center font-sans flex-1 leading-tight transition-transform duration-300 group-hover:scale-105">
                                    <p className="font-semibold text-black text-[15px]">{c.contact}</p>
                                    <p className="text-[12px] text-sky-800/90 mt-1 truncate">{c.lastMsg}</p>
                                </div>

                                {/* Date */}
                                <span className="absolute text-[11px] mt-3 right-4 text-gray-900 ">{c.date}</span>
                            </div>
                        </div>
                    ))}

                    {filteredConversations.length === 0 && (
                        <p className="text-center text-black text-sm text-underline font-gotham mt-4">
                            Aucune conversation
                        </p>
                    )}

                </div>

            </div>
        </div>

    );
}
