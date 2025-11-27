"use client";

import Image from "next/image";
import {FiPlus, FiSearch, FiUserPlus} from "react-icons/fi";
import { useState, useEffect } from "react";
import closeIcon2 from "@/public/multiply_127px.png";
import logo from "@/public/Voyce.png";
export default function NewConversation({setShowNewConv, closeIcon}) {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [focus, SetFocus] = useState(false);
    const [selectedContactId, setSelectedContactId] = useState(null); // <- contact sélectionné

    const contacts = [
        { id: 1, name: "Aline", phone: "+242 06 123 456", avatar: "/goku.jpg" },
        { id: 2, name: "Jean", phone: "+242 06 987 654", avatar: "/roman-reigns-1.png" },
        { id: 3, name: "Patrick", phone: "+242 05 111 222", avatar: "/goku.jpg" },
        { id: 4, name: "Aline", phone: "+242 06 123 456", avatar: "/goku.jpg" },
        { id: 5, name: "Jean", phone: "+242 06 987 654", avatar: "/roman-reigns-1.png" },
        { id: 6, name: "Patrick", phone: "+242 05 111 222", avatar: "/goku.jpg" },
    ];

    const filtered = contacts.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        setTimeout(() => setLoading(true), 80);
    }, []);

    const handleSelect = (id) => {
        // si la même ligne est cliquée → désélectionner
        setSelectedContactId(prev => (prev === id ? null : id));
    };


    return (
        <div
            className="fixed inset-0 z-30 bg-black/70 flex items-center justify-center"
        >
            <div
                className={`relative flex flex-col items-center bg-white border border-gray-300 shadow-xl rounded-xl p-6 w-[30%] max-w-md h-[88%] transition-all duration-500 
    ${loading ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
            >
                {/* Titre et bouton Annuler */}
                <div className="w-full mb-4 flex flex-col">
                    {/* Titre */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">Nouvelle Conversation</h2>
                        <button
                            onClick={() => setShowNewConv(false)}
                            className="bg-black text-white rounded-full w-9 h-9 font-bold text-sm cursor-pointer transform hover:scale-110 transition duration-300"
                        >
                            X
                        </button>


                    </div>

                    {/* Texte en dessous */}
                    <p className="text-xs font-sans text-gray-900 mt-1">
                       Voici vos 66 Contacts sur Voyce.
                    </p>
                </div>

                {/* Champ recherche */}
                <div className="relative mb-4 w-full">
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
                            className="w-full border border-gray-300 rounded-lg py-2 pl-9 pr-3 text-sm text-black focus:outline-none focus:border-blue-500 bg-white/80"/>
                        <span
                            className={focus || search ? "absolute left-4 p-1 w-auto top-3 text-xs font-normal  text-sky-600 -translate-y-8 opacity-0 duration-300" : "absolute opacity-100 tracking-wide pointer-events-none duration-300 left-3 top-2  font-semibold pl-7 text-[14px] text-sky-600"}> Rechercher </span>

                    </div>
                </div>

                {/* Contenu central + bouton en bas */}
                <div className="flex flex-col justify-between w-full flex-1 p-1 overflow-hidden">
                    {/* Liste des contacts */}
                    <div className="overflow-y-auto pr-1 custom-scroll">
                        {filtered.length > 0 ? (
                            filtered.map((c) => (
                                <div
                                    key={c.id}
                                    onClick={() => handleSelect(c.id)}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer group transition"
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden ">
                                        <Image
                                            src={c.avatar}
                                            alt={c.name}
                                            width={40}
                                            height={40}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-800 font-semibold">{c.name}</p>
                                        <p className="text-gray-500 text-xs">{c.phone}</p>
                                    </div>
                                    {/*<FiPlus*/}
                                    {/*    size={20}*/}
                                    {/*    className="text-blue-600 opacity-0 group-hover:opacity-100 transition"*/}
                                    {/*/>*/}

                                    <Image src={logo.src} alt={logo}
                                           className="text-blue-600 opacity-0 group-hover:opacity-100 transition"
                                           width={50} height={80}/>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-black text-sm py-2">Aucun contact trouvé</p>
                        )}
                    </div>

                    {/* Bouton démarrer en bas */}
                    {selectedContactId && (
                        <button
                            className="mt-4 w-[58%] mx-auto py-2 rounded-lg shadow-md text-[15px] font-medium bg-blue-600 hover:bg-blue-700 text-white hover:scale-110 cursor-pointer transform transition duration-300"
                        >
                            Démarrer la conversation
                        </button>
                    )}

                </div>
            </div>

        </div>
    );
}
