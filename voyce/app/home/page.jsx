"use client";

import ConversationList from "@/components/ConversationList";
import MessageView from "@/components/MessageView";
import MessageInput from "@/components/MessageInput";
import Image from "next/image";
import add from "@/public/nui2_127px.png"


import closeIcon from "@/public/delete_sign_127px.png";
import infoIcon from "@/public/info_127px.png";
import chatIcon from "@/public/add_127px.png";
import Newfriends from "@/public/add_user_group_man_man_127px.png";
import exit from "@/public/exit_127px.png";
import {useState} from "react";

export default function Page() {

    const handleNewConversation = () => {
        console.log("Démarrer une nouvelle conversation !");
    };
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };
    return (
        <div className="w-full h-screen flex overflow-hidden bg-gray-50">

            {/* 📌 LISTE DES CONVERSATIONS (35%) */}
            <div className="w-[20%] border-r border-gray-300 bg-white overflow-y-auto">
                <ConversationList />
            </div>

            {/* 📌 ZONE DE MESSAGES (65%) */}
            <div className="w-[80%] flex flex-col">

                {/* Messages */}
                <div className="flex-1 overflow-y-auto ">
                    <MessageView/>
                </div>

                {/* Barre d’écriture */}
                <div className=" w-[100%]  p-2  bg-transaprent">
                    <MessageInput/>
                </div>
                {/*<button*/}
                {/*    onClick={handleNewConversation}*/}
                {/*    className="absolute bottom-8 left-52 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white w-11 h-11 rounded-[13px] flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"*/}
                {/*>*/}
                {/*    <Image*/}
                {/*        src={add.src}*/}
                {/*        alt="add icon"*/}
                {/*        width={18}*/}
                {/*        height={18}*/}
                {/*        className="object-contain"*/}
                {/*    />*/}
                {/*</button>*/}

                {/* 🔵 BOUTON FLOTTANT + MENU */}
                <div className="absolute bottom-8 left-52 flex flex-col items-center gap-3">

                    {/* --- BOUTONS QUI APPARAISSENT (ANIMATION) --- */}
                    <div className={`flex flex-col items-center gap-3 transition-all duration-300 
                        ${openMenu ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
                    `}>

                        {/* ℹ️ INFO */}


                        {/* 💬 Nouvelle conversation */}
                        <button
                            className="w-9 h-9 rounded-[13px] bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition">
                            <Image src={chatIcon.src} alt="chat" width={18} height={18}/>
                        </button>
                        <button
                            className="w-9 h-9 rounded-[13px] bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition">
                            <Image src={Newfriends.src} alt="chat" width={20} height={20}/>
                        </button>
                        <button
                            className="w-9 h-9 rounded-[13px] bg-gray-800/90 hover:bg-gray-900 text-white shadow-lg flex items-center justify-center transition">
                            <Image src={infoIcon.src} alt="info" width={15} height={15}/>
                        </button>

                        {/* 🚪 Déconnexion */}
                        <button
                            className="w-9 h-9 rounded-[13px] bg-red-600 hover:bg-red-700 text-white shadow-lg flex items-center justify-center transition">
                            <Image src={exit.src} alt="logout" width={15} height={15}/>
                        </button>

                    </div>

                    {/* --- BOUTON PRINCIPAL (toggle menu) --- */}
                    <button
                        onClick={toggleMenu}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white w-11 h-11 rounded-[13px] flex items-center justify-center shadow-xl transition-transform transform hover:scale-110"
                    //className="absolute bottom-8 left-52 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white w-11 h-11 rounded-[13px] flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
                    >
                        <Image
                            src={openMenu ? closeIcon : add}
                            alt="toggle menu"
                            width={18}
                            height={18}
                        />
                    </button>
                </div>
            </div>

        </div>
    );
}
