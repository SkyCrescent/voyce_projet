"use client";

import Image from "next/image";
import {FiSearch, FiUserPlus, FiX} from "react-icons/fi";
import { useState, useEffect } from "react";
import logo from "@/public/logo.png";

export default function NewFriends({ setShowNewFriends }) {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [focus, SetFocus] = useState(false);

    const contacts = [
        { id: 1, name: "Aline", phone: "+242 06 123 456", avatar: "/goku.jpg", email: "Alice au pays des merveilles" },
        { id: 2, name: "Jean", phone: "+242 06 987 654", avatar: "/roman-reigns-1.png", email: "Alice au pays des merveilles" },
        { id: 3, name: "Patrick", phone: "+242 05 111 222", avatar: "/goku.jpg", email: "Alice au pays des merveilles" },
        { id: 4, name: "Marc", phone: "+242 06 555 555", avatar: "/goku.jpg", email: "Alice au pays des merveilles" },
    ];

    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        setTimeout(() => setLoading(true), 80);
    }, []);

    return (
        <div className="fixed inset-0 z-30 bg-black/70 flex items-center justify-center">
            <div
                className={`relative flex bg-white border border-gray-300 shadow-xl rounded-xl w-[80%] max-w-full h-[88%] transition-all duration-500 ${loading ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>

                {/* LEFT PANEL - Contacts List */}
                <div className="w-[30%]  h-full flex flex-col bg-gray-500/10 relative overflow-hidden">

                    {/* 🔹 FOND DÉGRADÉ (si besoin tu peux ajouter un div avec un gradient ici) */}
                    <div
                        className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-white/0 to-gray-200/20"></div>

                    {/* Contenu réel au-dessus */}
                    <div className="relative z-10 flex flex-col h-full">

                        {/* 🔹 HEADER : Logo + Search */}
                        <div className="border-b border-gray-200 px-3 py-2">
                            {/* Ligne 1 : Logo + Titre */}
                            <div className="flex items-center gap-3 mb-2">
                                <Image
                                    src={logo.src}
                                    alt="logo"
                                    width={85}
                                    height={85}
                                    className="dark:invert"
                                />
                                <h2 className="text-lg font-semibold text-gray-700">Potentiel amis</h2>
                            </div>

                            {/* Ligne 2 : Champ de recherche */}

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
                                    className={focus || search ? "absolute left-4 p-1 w-auto top-3 text-xs font-normal text-sky-600 -translate-y-8 opacity-0 duration-300" : "absolute opacity-100 tracking-wide pointer-events-none duration-300 left-3 top-2   pl-7 text-[14px] text-sky-600"}> Rechercher </span>

                            </div>


                        </div>

                        {/* 🔹 LISTE DES CONTACTS */}
                        <div className="flex-1 overflow-y-auto p-2 font-roboto">
                            {filtered.length > 0 ? (
                                filtered.map(contact => (
                                    <div
                                        key={contact.id}
                                        onClick={() => setSelectedContact(contact)}
                                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                                            selectedContact?.id === contact.id ? "bg-blue-500 text-white" : "hover:bg-white/70"
                                        }`}
                                    >
                                        <div
                                            className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 bg-gray-100">
                                            <Image
                                                src={contact.avatar}
                                                alt={contact.name}
                                                width={50}
                                                height={50}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center flex-1 leading-tight">
                                            <p className={`font-semibold text-[15px] ${selectedContact?.id === contact.id ? "text-white" : "text-black"}`}>
                                                {contact.name}
                                            </p>
                                            <p className={`text-[12px] font-light truncate ${selectedContact?.id === contact.id ? "text-gray-200" : "text-sky-700"}`}>
                                                {contact.phone}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-black text-sm mt-4">Aucun contact</p>
                            )}
                        </div>
                    </div>
                </div>


                {/* RIGHT PANEL - Selected Contact Info */}

                <div
                    className="w-[80%] p-6 bg-gradient-to-bl from-green-900/80 via-white/50 to-pink-600/50 flex flex-col justify-start relative h-full rounded-tr-xl rounded-br-xl">

                    {/* Bouton X en haut à droite */}
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={() => setShowNewFriends(false)}
                            className="bg-black text-white rounded-full w-9 h-9 font-bold text-sm cursor-pointer transform hover:scale-110 transition duration-300"
                        >
                            X
                        </button>
                    </div>

                    {/* Logo en haut, centré */}


                    {/* Si aucun contact sélectionné */}
                    {!selectedContact && (
                        <>
                            <div className="flex justify-center mt-20 z-10 mb-2">
                                <Image src={logo.src} alt="logo" width={300} height={300}/>
                            </div>

                            <div className="flex flex-col justify-start items-center">
                                <p className="text-black/80 font-normal cursor-pointer text-center text-lg text-base font-sans">
                                    Sélectionnez un profils à gauche pour en savoir plus.
                                </p>
                            </div>
                        </>
                    )}


                    {/* Si un contact est sélectionné */}
                    {selectedContact && (
                        <div className="flex flex-col flex-1 justify-between h-full p-4">
                            {/* Titre */}
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6 cursor-default">Au sujet
                                de {selectedContact.name}</h3>

                            {/* Contenu central : photo à gauche, infos à droite */}
                            <div className="flex items-center gap-6 flex-1">
                                {/* Photo agrandie */}
                                <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={selectedContact.avatar}
                                        alt={selectedContact.name}
                                        width={160}
                                        height={160}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                {/* Infos contact */}
                                <div className="flex flex-col justify-center cursor-default " >
                                    <p className="text-gray-700 text-lg text-center">
                                        {selectedContact.name} est un utilisateur de Voyce. Son nom Voyce
                                        ({selectedContact.email}), son numéro de téléphone ({selectedContact.phone}) et
                                        il a actuellement 20 amis sur la plateforme.
                                    </p>
                                </div>

                            </div>


                            {/* Boutons en bas */}
                            <div className="flex mt-6 gap-4 justify-center ">
                                <button
                                    className=" w-[200px] bg-green-900 h-12 hover:bg-green-900/90 cursor-pointer text-white py-2 rounded-lg text-[15px] font-medium flex items-center justify-center gap-2 transform hover:scale-105 transition duration-300"
                                >
                                    <FiUserPlus size={15}/>
                                    Ajouter comme ami
                                </button>

                                <button
                                    onClick={() => setSelectedContact(null)}
                                    className=" w-[130px] bg-black hover:black text-white cursor-pointer py-2 rounded-lg font-medium flex items-center justify-center gap-2 transform hover:scale-105 transition duration-300"
                                >
                                    <FiX size={18}/>
                                    Annuler
                                </button>
                            </div>

                        </div>
                    )}


                </div>

            </div>
        </div>
    );
}
