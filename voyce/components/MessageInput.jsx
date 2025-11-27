import { useState } from "react";
import {FiSend} from "react-icons/fi";

export default function MessageInput() {
    const [text, setText] = useState("");
    const [focus, SetFocus] = useState(false);

    return (
        <div className="flex items-center gap-2">
            <input
                className="w-full border border-gray-300 rounded-lg h-12 py-2 pl-9 pr-3 text-md font-sans text-black  focus:outline-none focus:border-blue-500 bg-white/80"
                //    placeholder="Écrire un message..."
                onFocus={() => SetFocus(true)}
                onBlur={() => SetFocus(false)}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <span
                className={focus || text ? "absolute left-75  w-auto bottom-1 text-[16px] font-bold text-sky-800 -translate-y-12 duration-300 opacity-0" : "absolute opacity-100 tracking-wide pointer-events-none duration-300 left-0 bottom-5 pl-78 text-[15px] text-sky-600"}> Écrire un message... </span>


            <button
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition flex items-center justify-center transition-transform transform hover:scale-110 cursor-pointer">
                <FiSend size={20}/>
            </button>
        </div>
    );
}
