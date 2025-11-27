"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiLock, FiUser, FiPhone } from "react-icons/fi";
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

    const showChar = (id) => {
        setIcon((prev) => ({
            ...prev,
            [id]: prev[id] === "blind" ? "Eye" : "blind",
        }));
    };


    useEffect(() => {
        setTimeout(() => setVisible(true), 60);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditClick = () => {
        if (editing) {
            onEdit(formData);
        }
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
                className={`relative bg-white rounded-xl shadow-xl w-[50%] p-6
        border border-gray-300 flex flex-col transition-all duration-500
        ${visible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
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

                {/* Contenu principal centré */}
                <div className="flex flex-col items-center justify-center w-full gap-6">

                    {/* PHOTO + DESCRIPTION */}
                    <div className="flex w-full gap-6 items-start justify-center">
                        {/* Photo */}
                        <div
                            className={`w-44 h-44 rounded-full mt-3 overflow-hidden border-4 border-gray-200 shadow-md cursor-pointer
                    ${editing ? "hover:scale-110 transition-all duration-300" : ""}`}
                            onClick={handlePhotoClick}
                        >
                            <Image
                                src={formData.photo || img1}
                                alt="avatar"
                                width={220}
                                height={220}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Description utilisateur / Inputs */}
                        <div className="flex-1 flex flex-col justify-center">
                            {!editing && (
                                <p className="text-gray-700 text-sm mx-5 mt-18">
                                    {/*{user*/}
                                    {/*    ? `Nom complet : ${user.prenom} ${user.nom} • Téléphone : ${user.phone || "Non renseigné"}`*/}
                                    {/*    : "Aucune information disponible pour ce compte."}*/}
                                    Jean est un utilisateur de Voyce. Son nom Voyce (Alice au pays des merveilles), son numéro de téléphone (+242 06 987 654) et il a actuellement 20 amis sur la plateforme
                                </p>
                            )}

                            {editing && (
                                <div className="flex flex-wrap gap-4 mt-8 justify-center">
                                    {["prenom", "nom", "username", "phone", "password"].map((field) => (
                                        <div key={field} className="relative flex-1 min-w-[48%]">
                                            <input
                                              //  type={field === "password" ? "password" : "text"} // tu peux ajouter un toggle si besoin
                                                type={field === "password" ? (icon[4] === "blind" ? "password" : "text") : "text"}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                                onFocus={() => setFocus((prev) => ({ ...prev, [field]: true }))}
                                                onBlur={() => setFocus((prev) => ({ ...prev, [field]: false }))}
                                                className={`w-full border rounded-lg px-3 pt-3 pb-1 text-gray-800 text-sm transition-all duration-300
                        ${editing
                                                    ? "border-blue-500 bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                                    : "border-gray-200 bg-gray-100"
                                                }`}
                                            />

                                            {/* Label flottant */}
                                            <span
                                                className={
                                                    focus?.[field] || formData[field]
                                                        ? "absolute left-3 top-1 text-xs text-sky-600 -translate-y-3 transition-all duration-300"
                                                        : "absolute left-3 top-3 text-sm text-gray-500 pointer-events-none transition-all duration-300"
                                                }
                                            >
                    {field === "prenom"
                        ? "Prénom"
                        : field === "nom"
                            ? "Nom"
                            : field === "username"
                                ? "Username"
                                : field === "phone"
                                    ? "Téléphone"
                                    : "Mot de passe"}
                </span>

                                            {/* Icône pour le password toggle */}
                                            {field === "password" && (
                                                <img
                                                    src={`/icons/${icon[4]}.png`}
                                                    alt=""
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                                    width={22}
                                                    height={22}
                                                    onClick={() =>
                                                        setIcon((prev) => ({
                                                            ...prev,
                                                            4: prev[4] === "blind" ? "Eye" : "blind",
                                                        }))
                                                    }
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}


                        </div>
                    </div>

                    {/* BOUTONS Modifier / Supprimer */}
                    <div className="w-full flex gap-3 justify-center mt-6">
                        <button
                            onClick={handleEditClick}
                            className="w-[20%] h-10 font-sans py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[14px] shadow-md flex items-center justify-center gap-2 transition transform hover:scale-105"
                        >
                            <FiEdit2 size={16}/>
                            {editing ? "Enregistrer" : "Modifier"}
                        </button>

                        <button
                            onClick={onDelete}
                            className="w-[20%] h-10 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-sans text-[14px] shadow-md flex items-center justify-center gap-2 transition transform hover:scale-105"
                        >
                            <FiTrash2 size={16}/>
                            Supprimer
                        </button>
                    </div>
                </div>

                {/* LOGO en bas à droite */}
                <div className="absolute bottom-4 right-4">
                    <Image src={logo} alt="logo" width={80} height={80} className="object-contain"/>
                </div>
            </div>
        </div>

    );
}
