"use client";

import ConversationList from "@/components/ConversationList";
import MessageView from "@/components/MessageView";
import MessageInput from "@/components/MessageInput";
import NewConversation from "@/components/NewConversation";
import NewFriends from "@/components/NewFriends";
import InfosUser from "@/components/InfosUser";
import Exit from "@/components/Exit";
import Image from "next/image";
import add from "@/public/nui2_127px.png"


import closeIcon from "@/public/delete_sign_127px.png";
import infoIcon from "@/public/info_127px.png";
import chatIcon from "@/public/add_127px.png";
import Newfriends from "@/public/add_user_group_man_man_127px.png";
import exit from "@/public/exit_127px.png";
import {useState} from "react";

export default function Page() {
    const [openMenu, setOpenMenu] = useState(false);
    const [showNewConv, setShowNewConv] = useState(false);
    const [showNewFriends, setShowNewFriends] = useState(false);
    const [showInfosUser, setShowInfosUser] = useState(false);
    const [showExit, setShowExit] = useState(false);

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

                <div className="fixed bottom-13 left-50 transform -translate-x-1/2 flex justify-center items-center">

                    {/* --- BOUTON PRINCIPAL --- */}
                    <button
                        onClick={toggleMenu}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white w-11 h-11 rounded-[13px] flex items-center justify-center shadow-xl transition-transform transform hover:scale-110 z-20"
                    >
                        <Image
                            src={openMenu ? closeIcon : add}
                            alt="toggle menu"
                            width={18}
                            height={18}
                        />
                    </button>

                    {/* --- BOUTONS RADIAUX ANIMÉS --- */}
                    <div className="absolute top-1 left-1 w-0 h-0">
                        {[
                            {icon: chatIcon, color: "bg-green-600", action: () => setShowNewConv(true)},
                            {icon: Newfriends, color: "bg-blue-600", action: () => setShowNewFriends(true)},
                            {
                                icon: infoIcon, color: "bg-[#8000ff]", action: () => { setShowInfosUser(true)
                                }
                            },
                            {
                                icon: exit, color: "bg-red-500", action: () => {
                                    setShowExit(true)
                                }
                            },
                        ].map((btn, index) => {

                            const d = 39; // distance diagonale

                            const positions = [
                                {x: -d, y: -d}, // ↖
                                {x: d, y: -d}, // ↗
                                {x: d, y: d}, // ↘
                                {x: -d, y: d}, // ↙
                            ];

                            const {x, y} = openMenu ? positions[index] : {x: 0, y: 0};

                            return (
                                <button
                                    key={index}
                                    onClick={() => {
                                        btn.action();
                                        toggleMenu();
                                    }}
                                    className={`
          ${btn.color} w-9 h-9 rounded-[13px]
          text-white shadow-lg flex items-center justify-center
          absolute transition-all duration-300
          ${openMenu ? "opacity-100 scale-100" : "opacity-0 scale-50"}
        `}
                                    style={{
                                        transform: `translate(${x}px, ${y}px)`,
                                        transitionDelay: `${index * 70}ms`,
                                    }}
                                >
                                    <Image src={btn.icon.src} alt="" width={15} height={15}/>
                                </button>
                            );
                        })}
                    </div>

                </div>



            </div>


            {showNewConv && (
                <>
                    <NewConversation closeIcon={closeIcon} setShowNewConv={setShowNewConv}/>
                </>

            )}

            {showNewFriends && (
                <>
                    <NewFriends setShowNewFriends={setShowNewFriends}/>
                </>

            )}{showInfosUser && (
                <>
                    <InfosUser setShowInfosUser={setShowInfosUser}/>
                </>

            )}{showExit && (
                <>
                    <Exit setShowExit={setShowExit}/>
                </>

            )}


        </div>
    );
}
