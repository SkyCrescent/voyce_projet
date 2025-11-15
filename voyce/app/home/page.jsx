"use client";

import ConversationList from "@/components/ConversationList";
import MessageView from "@/components/MessageView";
import MessageInput from "@/components/MessageInput";

export default function Page() {
    return (
        <div className="w-full h-screen flex overflow-hidden bg-gray-50">

            {/* 📌 LISTE DES CONVERSATIONS (35%) */}
            <div className="w-[20%] border-r border-gray-300 bg-white overflow-y-auto">
                <ConversationList />
            </div>

            {/* 📌 ZONE DE MESSAGES (65%) */}
            <div className="w-[65%] flex flex-col">

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                    <MessageView />
                </div>

                {/* Barre d’écriture */}
                <div className="p-4 border-t border-gray-300 bg-white">
                    <MessageInput />
                </div>

            </div>

        </div>
    );
}
