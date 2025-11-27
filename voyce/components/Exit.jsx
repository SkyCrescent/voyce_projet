import {useEffect, useState} from "react";
import Image from "next/image";
import {FiEdit2, FiLock, FiMail, FiPhone, FiTrash2} from "react-icons/fi";
import {useRouter} from "next/navigation";

export default function Exit({setShowExit}){
    const router = useRouter();

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 60);
    }, []);

    return(
        <>

            <div className="fixed inset-0 bg-black/70 z-30 flex items-center justify-center">

                {/* Container */}
                <div
                    className={`relative bg-white rounded-xl shadow-xl w-[25%] p-6 
                border border-gray-300 flex flex-col transition-all duration-500
                ${visible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                >
                    {/* CONTENU : PHOTO + INFOS */}

                        <div className="flex items-center">
                            <p className="text-black font-normal mx-auto cursor-pointer text-center text-md text-base font-sans">
                               Voulez vous vraiment vous déconnecter ?
                            </p>
                        </div>



                    {/* BOUTONS en bas droite */}
                    <div className="w-full mt-6 flex flex-col gap-3">

                        {/* Modifier */}
                        <button
                            // onClick={onEdit}
                            onClick={()=>{
                                router.push(`../`)
                            }}
                            className="w-full py-2 rounded-lg bg-green-900 hover:bg-green-900/90 text-white font-medium text-[15px] shadow-md flex items-center justify-center gap-2 transition transform hover:scale-105"
                        >
                            {/*<FiEdit2 size={18}/>*/}
                           Oui
                        </button>

                        {/* Supprimer */}
                        <button
                            onClick={()=>{setShowExit(false)}}
                            className="w-full py-2 rounded-lg bg-black hover:bg-black text-white font-medium text-[15px] shadow-md flex items-center justify-center gap-2 transition transform hover:scale-105"
                        >
                            {/*<FiTrash2 size={18}/>*/}
                              Non
                        </button>

                    </div>

                </div>
            </div>

        </>
    )
}