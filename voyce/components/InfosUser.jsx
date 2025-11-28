"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {FiArrowLeft, FiEdit2, FiTrash2} from "react-icons/fi";
import img1 from "../public/roman-reigns-1.png";
import logo from "../public/logo.png";

export default function InfosUser({ user, setShowInfosUser, onEdit, onDelete, onPhotoChange }) {
    const [visible, setVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [focus, setFocus] = useState({});
    const [icon, setIcon] = useState({ 4: "blind" });

    const [formData, setFormData] = useState({
        prenom: user?.prenom || "",
        nom: user?.nom || "",
        username: user?.username || "",
        phone: user?.phone || "",
        password: "",
        photo: user?.photo || img1,
    });

    useEffect(() => {
        setTimeout(() => setVisible(true), 60);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditClick = () => {
        if (editing) onEdit(formData);
        setEditing(!editing);
    };

    const handlePhotoClick = () => {
        if (!editing) return;

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const url = URL.createObjectURL(file);
            setFormData({ ...formData, photo: url });

            if (onPhotoChange) onPhotoChange(file);
        };

        input.click();
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-30 flex items-center justify-center">
            <div
                className={`
        relative bg-white rounded-xl shadow-xl w-[30%] p-6 border border-gray-300 
        flex flex-col transition-all duration-500
        ${visible ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        ${editing ? "h-[83%]" : "h-[70%]"}
    `}
            >

                {/* X button */}
                <button
                    onClick={() => setShowInfosUser(false)}
                    className="absolute top-3 right-3 bg-black text-white w-9 h-9 rounded-full
                    flex items-center justify-center cursor-pointer text-sm font-bold
                    hover:scale-110 transition"
                >
                    X
                </button>

                {/* ✔️ TITRE */}
                <h2 className="text-xl font-semibold text-center mb-2 mt-2">
                    Informations du compte
                </h2>

                {/* PHOTO */}
                <div className="flex justify-center mt-4">
                    <div
                        onClick={handlePhotoClick}
                        className={`w-36 h-36 rounded-full overflow-hidden border-4 border-gray-200 shadow-md cursor-pointer 
                        ${editing ? "hover:scale-110 transition duration-300" : ""}`}
                    >
                        <Image
                            src={formData.photo}
                            alt="avatar"
                            width={180}
                            height={180}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* ZONE SCROLLABLE */}
                <div className="flex-1 overflow-y-auto px-4 mt-4">

                    {/* MODE NORMAL → description */}
                    {!editing && (
                        <p className="text-gray-700 text-[15px] leading-relaxed text-center mb-4">
                            Jean est un utilisateur de Voyce. Son nom Voyce (Alice au pays des merveilles),
                            son numéro de téléphone (+242 06 987 654) et il a actuellement 20 amis
                            sur la plateforme.
                        </p>
                    )}

                    {/* MODE EDITION → inputs */}
                    {editing && (
                        <div className="flex flex-col gap-4 justify-center mt-2 pb-10 w-full">

                            {/* Ligne 1 : Prénom + Nom */}
                            <div className="flex gap-4 w-full">
                                {["prenom", "nom"].map((field) => (
                                    <div key={field} className="relative w-1/2">

                                        <input
                                            type="text"
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            onFocus={() => setFocus((prev) => ({ ...prev, [field]: true }))}
                                            onBlur={() => setFocus((prev) => ({ ...prev, [field]: false }))}
                                            className="w-full border rounded-lg px-3 pt-3 pb-1 text-gray-800 text-sm
                        transition-all duration-300 border-blue-500 bg-white shadow-sm
                        focus:outline-none focus:ring-1 focus:ring-blue-400 h-11"
                                        />

                                        <span
                                            className={
                                                focus?.[field] || formData[field]
                                                    ? "absolute left-3 top-1 text-xs text-sky-600 -translate-y-3 transition-all opacity-0"
                                                    : "absolute left-3 top-3 text-sm text-gray-500 transition-all opacity-100"
                                            }
                                        >
                        {field === "prenom" ? "Prénom" : "Nom"}
                    </span>
                                    </div>
                                ))}
                            </div>

                            {/* Ligne 2 : Username + Téléphone */}
                            <div className="flex gap-4 w-full">
                                {["username", "phone"].map((field) => (
                                    <div key={field} className="relative w-1/2">

                                        <input
                                            type="text"
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            onFocus={() => setFocus((prev) => ({ ...prev, [field]: true }))}
                                            onBlur={() => setFocus((prev) => ({ ...prev, [field]: false }))}
                                            className="w-full border rounded-lg px-3 pt-3 pb-1 text-gray-800 text-sm
                        transition-all duration-300 border-blue-500 bg-white shadow-sm
                        focus:outline-none focus:ring-1 focus:ring-blue-400 h-11"
                                        />

                                        <span
                                            className={
                                                focus?.[field] || formData[field]
                                                    ? "absolute left-3 top-1 text-xs text-sky-600 -translate-y-3 transition-all opacity-0"
                                                    : "absolute left-3 top-3 text-sm text-gray-500 transition-all opacity-100"
                                            }
                                        >
                        {field === "username" ? "Username" : "Téléphone"}
                    </span>
                                    </div>
                                ))}
                            </div>

                            {/* Ligne 3 : Mot de passe (seul) */}
                            <div className="relative w-full">

                                <input
                                    type={icon[4] === "blind" ? "password" : "text"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocus((prev) => ({ ...prev, password: true }))}
                                    onBlur={() => setFocus((prev) => ({ ...prev, password: false }))}
                                    className="w-full border rounded-lg px-3 pt-3 pb-1 text-gray-800 text-sm
                transition-all duration-300 border-blue-500 bg-white shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-400 h-11"
                                />

                                <span
                                    className={
                                        focus?.password || formData.password
                                            ? "absolute left-3 top-1 text-xs text-sky-600 -translate-y-3 transition-all opacity-0"
                                            : "absolute left-3 top-3 text-sm text-gray-500 transition-all opacity-100"
                                    }
                                >
                Mot de passe
            </span>

                                <img
                                    src={`/icons/${icon[4]}.png`}
                                    alt=""
                                    width={22}
                                    height={22}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={() =>
                                        setIcon((prev) => ({
                                            ...prev,
                                            4: prev[4] === "blind" ? "Eye" : "blind",
                                        }))
                                    }
                                />
                            </div>

                        </div>
                    )}


                    {/* BOUTONS EN BAS */}
                    <div className={` w-full flex gap-3 justify-center ${editing ? "-mt-5" : "mt-5"} mb-4 `}>

                        {/* Bouton Modifier / Enregistrer */}
                        <button
                            onClick={handleEditClick}
                            className="w-[35%] h-10 bg-green-900 hover:bg-green-900/90 text-white
        rounded-lg shadow-md flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-medium
        transition transform hover:scale-105"
                        >
                            <FiEdit2 size={16}/>
                            {editing ? "Enregistrer" : "Modifier"}
                        </button>

                        {/* Bouton Supprimer OU Annuler */}
                        {!editing ? (
                            // 🔴 Mode normal → Supprimer
                            <button
                                onClick={onDelete}
                                className="w-[35%] h-10 bg-red-600 hover:bg-red-700 text-white
            rounded-lg shadow-md flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-medium
            transition transform hover:scale-105"
                            >
                                <FiTrash2 size={16}/>
                                Supprimer
                            </button>
                        ) : (
                            // ⚫ Mode édition → Annuler
                            <button
                                onClick={() => setEditing(false)}
                                className="w-[35%] h-10 bg-black  text-white
            rounded-lg shadow-md flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-medium
            transition transform hover:scale-105"
                            >
                                <FiArrowLeft size={16}/>
                                Annuler
                            </button>
                        )}
                    </div>

                </div>


                {/* LOGO */}
                <div className="absolute bottom-3 right-3 ">
                    <Image src={logo} width={80} height={80} alt="logo"/>
                </div>
            </div>
        </div>
    );
}
