"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import axios from  'axios'
import {useRouter} from "next/navigation";
export default function SplashLogin() {
    const [mounted, setMounted] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();
    const [animateLogo, setAnimateLogo] = useState(false);
    const [focus, SetFocus] = useState(false);
    const [values, setValues] = useState({ username: "", password: "" });
    const [icon, setIcon] = useState({ 4: "blind" });

    const colors = ["#0000ff", "#ff0000", "#8000ff"];

    const input = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Nom",
            value: values.username,
            label: "Nom d'utilisateur",
            className:
                "text-xl w-[90%] text-gray-700 bg-white/65 border rounded-lg border-gray-300 py-2 pl-10 h-14 focus:outline-none focus:border-blue-500",
            icon: <FiUser className="absolute left-3 top-[26%] text-gray-400" />,
        },
        {
            id: 4,
            name: "password",
            type: icon[4] === "blind" ? "password" : "text",
            value: values.password,
            placeholder: "password",
            label: "Mot de Passe",
            className:
                "text-xl relative w-[90%] text-gray-700 bg-white/65 border rounded-lg border-gray-300 py-2 pl-10 h-14 focus:outline-none focus:border-blue-500",
            img: `/icons/${icon[4]}.png`,
            icon: <FiLock className="absolute left-3 top-[32%] text-black" />,
        },
    ];

    // ---------------------------------------------------------
    // 🟦 ANIMATION LOGO → PAUSE 4s → FORMULAIRE
    // ---------------------------------------------------------
    useEffect(() => {
        setMounted(true);

        // Animation couleur spinner
        const colorTimer = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % colors.length);
        }, 1000);

        // Splash visible 3 secondes
        const splashTimer = setTimeout(() => {
            clearInterval(colorTimer);

            // 1️⃣ Zoom-out du logo
            setAnimateLogo(true);

            // 2️⃣ Attendre la fin du zoom-out (1.5s)
            setTimeout(() => {
                // 3️⃣ Pause de 4 secondes AVANT d'afficher le formulaire
                setTimeout(() => {
                    setShowForm(true);
                }, 50);
            }, 1500);
        }, 3000);

        return () => {
            clearInterval(colorTimer);
            clearTimeout(splashTimer);
        };
    }, []);

    const handleChange = (e) =>
        setValues({ ...values, [e.target.name]: e.target.value });

    const showChar = (id) => {
        setIcon((prev) => ({
            ...prev,
            [id]: prev[id] === "blind" ? "Eye" : "blind",
        }));
    };

    if (!mounted) return null;


    const handleSummit = async () => {

        console.log(values);
        const valuesNotEmpty = Object.values(values).every(value => value !== "");

        if (valuesNotEmpty) {
            try {
                const response = await axios.get(`${baseUrl}/verification/connexion.php?username=${values.username}&password=${values.password}`);


                console.log(response.data.recu);
                console.log(response.data.recu.pass);

                if (response.data && response.data.recu  && response.data.recu.pass === true) {



                    if (response.data.recu.actif === 'non'){
                        console.log("dddd")
                        Seterros(true);
                        SetValue(false);
                        SetResult(false);
                        SetLocked(true)
                    }else{
                        console.log(response.data.recu);
                        setFilteredData(response.data.recu);
                        SetLoading(true);
                        Seterros(false);
                        SetValue(false);
                        SetResult(false);
                        SetLocked(false)
                        // router.push(`/admin/home`);
                        const encryptedData = btoa(response.data.recu.id);

                        console.log(response.data.recu.poste_agent)

                        {
                            response.data.recu.poste_agent === "Directeur Général" ? router.push(`./home/director?bla=${encodeURIComponent(encryptedData)}`)
                                :  response.data.recu.poste_agent === "Chef de Service" || response.data.recu.poste_agent === "Particulie(re)"  ? router.push(`./home/else?bla=${encodeURIComponent(encryptedData)}`)

                                    :response.data.recu.poste_agent === "Administrateur" ? router.push(`./home/admin?bla=${encodeURIComponent(encryptedData)}`)

                                        : router.push(`./home/second?bla=${encodeURIComponent(encryptedData)}`)
                        }

                    }
                } else {
                    Seterros(true);
                    SetValue(false);
                    SetResult(true);
                    SetLocked(false)
                    console.log("La réponse de l'API est incorrecte ou ne contient pas de données.", response);
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des données de l'API : ", error);
            }


        } else {
            Seterros(true);
            SetValue(true);
            SetResult(false);
            SetLocked(false)
        }
    }


    return (
        <div className="relative flex items-center justify-center min-h-screen bg-white font-sans">

            {/* 🔹 Image de fond */}
            <div className="absolute inset-0 bg-[url('/oralisme_moyen-min.jpg')] bg-cover bg-center opacity-50"/>

            {/* Dégradé beaucoup plus visible */}
            <div className="absolute inset-0 bg-gradient-to-bl
                from-green-900/80
                via-white/50
                to-pink-600/50"/>
            {/* ------------------------------------------------------------------ */}
            {/* 🔵  LOGO + SPINNER (Splash Screen)                               */}
            {/* ------------------------------------------------------------------ */}
            {!showForm && (
                <div
                    className={`absolute flex flex-col items-center justify-center transition-all duration-700 ${
                        animateLogo
                            ? "scale-0 opacity-0"
                            : "scale-100 opacity-100"
                    }`}
                >
                    {/* Spinner rond */}
                    <div className="absolute w-52 h-52 rounded-full animate-spin">
                        <div
                            className="absolute w-4 h-4 rounded-full"
                            style={{
                                backgroundColor: colors[colorIndex],
                                top: "-4px",
                                left: "50%",
                                marginLeft: "-8px",
                                boxShadow: `0 0 20px ${colors[colorIndex]}55, 0 0 40px ${colors[colorIndex]}33`,
                            }}
                        ></div>
                    </div>

                    {/* Logo au centre */}
                    <Image
                        className="dark:invert"
                        src="/logo.PNG"
                        alt="logo"
                        width={180}
                        height={150}
                        priority
                    />
                </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* 🟣  FORMULAIRE                                                    */}
            {/* ------------------------------------------------------------------ */}
            <div
                className={`transition-all duration-700 absolute w-full flex items-center justify-center ${
                    showForm
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
                }`}
            >
                <main className="flex flex-col items-center justify-center py-10 w-full max-w-md">

                    {/* 🔹 Logo juste au-dessus du formulaire */}
                    {/* Icône + Logo */}
                    <div className="flex flex-col items-center">

                        {/* Icône de salutation */}
                        <div className="opacity-60">
                            <img
                                src="/16406024.png"
                                alt="salutation"
                                width={160}
                                height={100}
                                className="drop-shadow-lg"
                            />
                        </div>

                        {/* Logo principal */}
                        <Image
                            className="dark:invert -mt-16 opacity-900"
                            src="/Voyce.PNG"
                            alt="Logo VOYCE"
                            width={190}
                            height={160}
                            priority
                        />
                    </div>


                    <div className="flex flex-col mx-3 -mt-18 w-full items-center justify-center -space-y-3">
                        {input.map((inputs) => (
                            <div
                                className="rounded-md h-24 w-full flex flex-col items-center justify-center"
                                key={inputs.id}
                            >
                                <div className="relative w-full">
                                    <input
                                        onFocus={() => SetFocus(true)}
                                        onBlur={() => SetFocus(false)}
                                        type={inputs.type}
                                        name={inputs.name}
                                        className="w-72 mx-20 text-[15px] text-gray-700 bg-white/65 border border-gray-300 rounded-lg h-12 pl-10 pr-3 focus:outline-none focus:border-blue-500"
                                        onChange={(e) => handleChange(e)}
                                        value={inputs.value}
                                    />


                                    {inputs.img && (
                                        <img
                                            src={inputs.img}
                                            alt=""
                                            className="absolute right-24 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            width={22}
                                            height={22}
                                            onClick={() => showChar(inputs.id)}
                                        />
                                    )}
                                    <span
                                        className={focus || values.password || values.username ? "absolute left-20 p-1 w-auto top-6 text-sm font-normal text-sky-600 -translate-y-12 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 pl-24 text-[15px] text-sky-600"}> {inputs.label} </span>
                                </div>
                            </div>
                        ))}

                        {/* 🔹 Bouton et autres éléments */}
                        <div className="w-full flex flex-col items-center justify-center text-center mt-4">
                            <button
                                className="w-48 bg-sky-600 hover:bg-sky-700 text-white font-medium cursor-pointer py-3 rounded-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                onClick={() => {
                                    //   e.preventDefault();    // ← Évite le submit automatique
                                    router.push(`new`)
                                }}>
                                <FiLock size={16} className="text-white"/>
                                Connexion
                            </button>


                            <div className="w-[50%] h-[1px] bg-sky-500 mt-6 rounded-full"/>

                            <p
                                onClick={() => {
                                    router.push(`new`)
                                }}
                                className="text-sm font-[Poppins] mt-6 text-purple-800 hover:underline hover:text-sky-800 cursor-pointer">
                                Je n’ai pas de compte
                            </p>

                            <Image
                                className="dark:invert mt-6"
                                src="/nom copy.PNG"
                                alt="Logo VOYCE"
                                width={100}
                                height={120}
                                priority
                            />
                        </div>
                    </div>
                </main>

            </div>
        </div>

    );
}
