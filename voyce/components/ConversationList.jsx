"use client";

import Image from "next/image";
import { useState } from "react";
import {FiPlus, FiSearch} from "react-icons/fi";
import logo from "@/public/logo.png"
export default function ConversationList() {
    const [search, setSearch] = useState("");
    const [focus, SetFocus] = useState(false);

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
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                                className="w-full border border-gray-300 rounded-lg py-2 pl-9 pr-3 text-sm
                       focus:outline-none focus:border-blue-500 bg-white/80"    />
                            <span
                                className={focus || search? "absolute left-4 p-1 w-auto top-3 text-xs font-normal text-sky-600 -translate-y-8 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-3 top-2   pl-7 text-[14px] text-sky-600"}> Rechercher </span>

                        </div>
                </div>
                {/* 🔹 LISTE DES CONVERSATIONS */}
                <div className="flex-1 overflow-y-auto p-1 font-roboto">
                    {filteredConversations.map((c) => (
                        <div
                            key={c.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/70 cursor-pointer"
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
                                {/*<div*/}
                                {/*    className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow">*/}
                                {/*    <Image*/}
                                {/*        src={logo.src}*/}
                                {/*        alt="logo"*/}
                                {/*        width={18}*/}
                                {/*        height={18}*/}
                                {/*    />*/}
                                {/*</div>*/}
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



            </div>
        </div>
    );
}
