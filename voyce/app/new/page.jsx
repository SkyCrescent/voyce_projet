"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function CreateAccount() {
    const [values, setValues] = useState({
        nom: "",
        prenom: "",
        photo: "",
        num: "",
        username: "",
        password: "",
    });
    const [phoneNumber, setPhoneNumber] = useState('');
const [ButtonEnabled, SetButtonEnabled] = useState(false)
    const [focus, SetFocus] = useState(false);
    const [focus2 , SetFocus2] = useState(false)
    const [focus3 , SetFocus3] = useState(false)
    const [focus4 , SetFocus4] = useState(false)

    const [focus5 , SetFocus5] = useState(false)
    const [focus6 , SetFocus6] = useState(false)
    const [focus7 , SetFocus7] = useState(false)
    const [focus8 , SetFocus8] = useState(false)
    const [focus9 , SetFocus9] = useState(false)
    const [focus10 , SetFocus10] = useState(false)
    const [selectedImage , SetselectedImage] = useState(false)
    const [selectedImage2, setSelectedImage2] = useState("");
    let url1 ="";
    const [change, setChange] = useState(true); // pour le password
    const [selectedFile, setSelectedFile] = useState(null);
    const [icon, setIcon] = useState({ 4: "blind", 5: "Eye" });

    const [dialog, setDialog] = useState({
        open: false,
        message: "",
        type: "" // "error" ou "success"
    });

    const handleFileChange = async (event) => {
        const fileInput = event.target;
        const selectedFile1 = fileInput.files[0];
        // const nomValue = nom
        console.log("LE sélectionné :",selectedFile1);
        if (selectedFile1) {
            //setFile(event.target.files[0]);
            // Vérifier si le fichier est une image en vérifiant l'extension
            const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
            const fileNameParts = selectedFile1.name.split(".");
            const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                // Si c'est une image, mettre à jour les valeurs avec le fichier sélectionné
                setSelectedFile(selectedFile1);
                SetselectedImage(true);
                const url ='/pages/api'
                console.log("Fichier sélectionné :", selectedFile1);
                try {
                    const formData = new FormData();
                    formData.append('file',selectedFile1);
                    // Envoi de la requête POST avec Axios vers le serveur
                    const response = await axios.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    console.log('File uploaded successfully:', response.data);
                    // Mise à jour de la valeur media avec le chemin du fichier

                    url1 =`/pages/api/${selectedFile1.name}`
                    console.log(url1)
                    setSelectedImage2(`./public/Users/${selectedFile1.name}`);
                    console.log(`./public/Users/${selectedFile1.name}`)

                    setValues((prevValues) => ({
                        ...prevValues,
                        photo: `./public/Users/${selectedFile1.name}`,
                    }));

                    console.log(values)
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            } else {
                // Si ce n'est pas une image, ne rien faire
                console.log("Le fichier sélectionné n'est pas une image");
            }
        } else {
            // Si aucun fichier n'est sélectionné, réinitialiser les valeurs
            setSelectedFile(null);
            url1 =''
            SetselectedImage(false);
            setValues((prevValues) => ({
                ...prevValues,
                photo:"",
            }));
            console.log("Aucun fichier sélectionné");
        }
    };

    const showChar = () => setChange(prev => !prev);
    const handleSubmit = () => {
        // Vérifier si un champ est vide
        const champsVides = Object.entries(values).filter(([key, value]) => value.trim() === "");

        if (champsVides.length > 0) {
            setDialog({
                open: true,
                message: "Veuillez remplir toutes les informations.",
                type: "error"
            });
            return;
        }

        // Sinon OK
        setDialog({
            open: true,
            message: "Inscription réussie !",
            type: "success"
        });

        console.log(values);
    };

    const handleChange2 = (e) => {
        //controle des champs de saisie
        const { name, value } = e.target;
        let cleanedValue = '';
        let inputVal = e.target.value;
        let formattedPhoneNumber = '';
        let cleanedAddress = '';
        if (name === 'nom'){
            let formattedValue = '';

// Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
            cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());

            // Mettre à jour l'état avec le nom de l'école nettoyé
            setValues({...values, nom: cleanedValue});
        } else if (name === 'prenom'){
// Supprimer les caractères spéciaux sauf les espaces et les tirets pour le nom de l'école
            cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());

            // Mettre à jour l'état avec le nom de l'école nettoyé
            setValues({...values, prenom: cleanedValue});
        } else if (name === 'adresse') {
            // Supprimer les caractères spéciaux pour l'adresse
            // cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = value.replace(/[^\w\s]/g, '');
            cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
            // Mettre à jour l'état avec l'adresse nettoyée
            setValues({ ...values, adresse: cleanedValue });
        } else if (name === 'username'  ) {
            // Supprimer les caractères spéciaux pour l'adresse
            // cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = value.replace(/[^\w\s]/g, '');
            cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
            // Mettre à jour l'état avec l'adresse nettoyée
            setValues({ ...values, username: cleanedValue });
        } else if (name === 'password'  ) {
            // Supprimer les caractères spéciaux pour l'adresse
            // cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            cleanedValue = value.replace(/[^\w\s]/g, '');
            cleanedValue = cleanedValue.replace(/\b\w/g, char => char.toUpperCase());
            // Mettre à jour l'état avec l'adresse nettoyée
            setValues({ ...values, password: cleanedValue });
        } else if (name === 'num'){

            if (inputVal === '') {
                // Si le champ est vide, réinitialiser les valeurs
                setPhoneNumber('');
                setValues({...values, num: ''});
            } else {
                // Supprimer tous les caractères non numériques
                const cleaned = inputVal.replace(/\D/g, '');
                // Ajouter les deux premiers chiffres (06)
                formattedPhoneNumber += cleaned.substring(0, 2);
// Ajouter un espace
                formattedPhoneNumber += ' ';
                // Ajouter le groupe de trois chiffres suivant (650)
                formattedPhoneNumber += cleaned.substring(2, 5);
                // Ajouter un espace
                formattedPhoneNumber += ' ';
                // Ajouter les deux derniers chiffres (07)
                formattedPhoneNumber += cleaned.substring(5, 7);
                // Ajouter un espace
                formattedPhoneNumber += ' ';
                // Ajouter les deux derniers chiffres (97)
                formattedPhoneNumber += cleaned.substring(7, 9);
                setPhoneNumber(formattedPhoneNumber);
                // Mettre à jour l'état avec la valeur formatée dans le champ "num"
                setValues({...values, num: formattedPhoneNumber});
                console.log(values)
            }
        }




    };


    return (
        <div className="relative flex min-h-screen items-center justify-center font-sans">
            {/* Background */}
            {/* Image d’arrière-plan avec opacité plus forte */}
            <div className="absolute inset-0 bg-[url('/oralisme_moyen-min.jpg')] bg-cover bg-center opacity-50" />

            {/* Dégradé beaucoup plus visible */}
            <div className="absolute inset-0 bg-gradient-to-bl
                from-green-900/80
                via-white/50
                to-pink-600/50" />

            <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
                {/* Ligne supérieure : image ronde à gauche + logo centré */}
                {/* Ligne supérieure : logo en haut à droite + photo centrée */}
                <div className="w-full relative flex justify-center mt-6 mb-10 animate-fadeZoom">

                    {/* Logo en haut à droite */}
                    <div className="absolute top-0 right-10 opacity-90 hover:opacity-100 transition duration-300">
                        <Image
                            src="/logo.PNG"
                            alt="Logo VOYCE"
                            width={160}
                            height={140}
                            className="dark:invert"
                        />
                    </div>

                    {/* Photo centrée avec ombre + animation + zoom au hover */}
                    <div className="w-[150px] h-[150px] rounded-full overflow-hidden shadow-xl shadow-gray-400/60
                    ring-4 ring-white hover:scale-105 transition-all duration-300">
                        <label htmlFor="imageInput2" className="w-full h-full cursor-pointer">
                            <input
                                type="file"
                                id="imageInput2"
                                accept=".jpg,.jpeg,.png"
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                            {selectedFile ? (
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Image sélectionnée"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-gray-300 rounded-full
                                flex items-center justify-center">
                                    <Image src="/picture.png" alt="Placeholder" width={40} height={40}/>
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                {/* Form container */}
                {/* Texte descriptif */}
                {/* text-gray-500 text-center text-sm */}
                <p className="text-center text-gray-500 text-[15px] font-medium mb-4">
                   Renseigner vos informations ci-dessous et rejoignez la communauté <span className="text-green-500" >VOYCE</span> .
                </p>

                <div className="relative w-[58%] space-y-6">
                    {/* Ligne 1 : Nom 40% et Prénom 60% */}
                    <div className="flex items-center gap-6">
                        <div className="relative w-[30%]">
                            <input
                                type="text"
                                name="nom"
                                value={values.nom}
                                onChange={handleChange2}
                                onFocus={() => SetFocus(true)}
                                onBlur={() => SetFocus(false)}
                                className="text-large relative w-[100%] text-gray-700 border rounded-lg bg-white/90 border-gray-300 py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                            />
                            <span
                                className={(focus || values.nom) ? "absolute left-3 p-1 w-auto top-3 px-1 text-sm font-normal text-sky-600 -translate-y-9 duration-300" : "absolute tracking-wide pointer-events-none duration-300 left-0 top-3 px-5 text-sky-700"}> Nom </span>

                        </div>

                        <div className="relative w-[65%]">
                            <input
                                type="text"
                                name="prenom"
                                value={values.prenom}
                                onChange={handleChange2}
                                onFocus={() => SetFocus2(true)}
                                onBlur={() => SetFocus2(false)}
                                className="w-full text-gray-700 bg-white/90 border border-gray-300 rounded-lg py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                            />
                            <span
                                className={(focus2 || values.prenom)
                                    ? "absolute left-3 text-sm font-normal text-sky-600 -top-5 duration-300"
                                    : "absolute left-3 top-3 text-sky-700 text-sm pointer-events-none duration-300"}>
          Prénom
        </span>
                        </div>
                    </div>

                    {/* Ligne 2 : Nom d'utilisateur 50% + Mot de passe 50% */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative w-[50%]">
                            <input
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange2}
                                onFocus={() => SetFocus8(true)}
                                onBlur={() => SetFocus8(false)}
                                className="w-full text-gray-700 bg-white/90 border border-gray-300 rounded-lg py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                            />
                            <span
                                className={(focus8 || values.username)
                                    ? "absolute left-3 text-sm font-normal text-sky-600 -top-5 duration-300"
                                    : "absolute left-3 top-3 text-sky-600 text-sm pointer-events-none duration-300"}>
          Nom d'utilisateur
        </span>
                        </div>

                        <div className="relative w-[50%]">
                            <input
                                type={change ? 'password' : 'text'}
                                name="password"
                                value={values.password}
                                onChange={handleChange2}
                                onFocus={() => SetFocus9(true)}
                                onBlur={() => SetFocus9(false)}
                                className="w-full text-gray-700 bg-white/90 border border-gray-300 rounded-lg py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                            />
                            <span
                                className={(focus9 || values.password)
                                    ? "absolute left-3 text-sm font-normal text-sky-600 -top-5 duration-300"
                                    : "absolute left-3 top-3 text-sky-600 text-sm pointer-events-none duration-300"}>
          Mot de Passe
        </span>
                            <img
                                src={change ? `/icons/${icon[4]}.png` : `/icons/${icon[5]}.png`}
                                alt=""
                                className="absolute right-4 top-[26%] cursor-pointer"
                                width={25}
                                height={25}
                                onClick={showChar}
                            />
                        </div>
                    </div>

                    {/* Ligne 3 : Numéro de téléphone 100% */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="num"
                            value={values.num}
                            onChange={handleChange2}
                            onFocus={() => SetFocus4(true)}
                            onBlur={() => SetFocus4(false)}
                            className="w-full text-gray-700 bg-white/90 border border-gray-300 rounded-lg py-2 px-4 h-12 focus:outline-none focus:border-blue-500"
                        />
                        <span
                            className={(focus4 || values.num)
                                ? "absolute left-3 text-sm font-normal text-sky-600 -top-5 duration-300"
                                : "absolute left-3 top-3 text-sky-600 text-sm pointer-events-none duration-300"}>
        Numéro de téléphone
      </span>
                    </div>

                    {/* Checkbox politique de confidentialité */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="policy"
                            className="mr-2 accent-blue-500"
                            onClick={() => {
                                SetButtonEnabled(!ButtonEnabled)
                            }}
                        />
                        <label htmlFor="policy" className="text-gray-700 text-sm">
                            J'accepte la politique de confidentialité
                        </label>
                    </div>

                    {/* Bouton inscription */}
                    <button
                        disabled={!ButtonEnabled}   // <-- bouton désactivé par défaut
                        className={`w-full py-3 rounded-lg font-semibold transition 
        ${ButtonEnabled
                            ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition duration-300 transform hover:scale-105 overflow-hidden shadow-xl shadow-sky-200/80"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }    `
                        }
                        onClick={handleSubmit}
                    >
                        Inscription
                    </button>


                    {/* Texte descriptif en bas */}
                    <p className="text-gray-500 text-center text-sm mt-2">
                        En vous inscrivant, vous acceptez nos conditions d'utilisation et la politique de
                        confidentialité.
                    </p>
                </div>


            </div>




            {dialog.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999]">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[350px] text-center">
                        <h2 className={`text-lg font-semibold mb-3 
                ${dialog.type === "error" ? "text-red-600" : "text-green-600"}`}>
                            {dialog.type === "error" ? "Des informations sont manquant" : "Bienvenu a vous !!"}
                        </h2>

                        <p className="text-gray-700 mb-4">{dialog.message}</p>

                        <button
                            onClick={() => setDialog({ ...dialog, open: false })}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition duration-300 transform cursor-pointer w-25"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}


        </div>

    );
}
