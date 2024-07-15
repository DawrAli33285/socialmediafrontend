import React, { useState, useEffect, useRef, useCallback } from "react";
import "./report.css";
import 'toastr/build/toastr.min.css';
import toastr from 'toastr'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reportCreator } from "../../../redux/slices/reviewSlice";
import { useLocation } from "react-router-dom";
const Reportcontent = () => {
    const [fdropselected, setfdropselected] = useState("Sélectionner votre profil");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownscnd, setShowDropdownscnd] = useState(false);
    const [fdropselectedscnd, setfdropselectedscnd] = useState("Sélectionner l'objet de votre signalement");
    const [subject, setSubject] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const options = ["utilisateur", "créateur"];
    const optionsscnd = ["Connexion ou Inscription", "Incident de paiement", "Demande à être remboursé", "Problèmes techniques", "Autres", "Signaler un post ou profil "];
    const dropdownRef = useRef(null);
    const dropdownRefSecond = useRef(null);
    const [attachment, setAttachment] = useState(null);
    const navigate=useNavigate();
const dispatch=useDispatch();
const location=useLocation();
    const handleAttachmentChange = (e) => {
        const file = e.target.files[0];
        setAttachment(file);
    };
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };
    const handleDropdownTogglescnd = () => {
        setShowDropdownscnd(!showDropdownscnd);
    };
    const handleOptionSelect = (option) => {
        setfdropselected(option);
        setShowDropdown(false);
    };
    const handleOptionSelectscnd = (option) => {
        setfdropselectedscnd(option);
        setShowDropdownscnd(false);
    };
    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const sendData = () => {
        const emailvar = email
        const array = {
            email : emailvar
        }
    }
    const reportNow=async()=>{
        const search=location.search
        const params=new URLSearchParams(search)
        const creator=params.get('creator')
        let formdata=new FormData()
        formdata.append('image',attachment)
        formdata.append('email',email)
        formdata.append('creator',creator)
        formdata.append('subject',subject)
        formdata.append('description',description)
        formdata.append('reported_by',fdropselected)
        formdata.append('type_of_report',fdropselectedscnd)

     let reportres=await dispatch(reportCreator(formdata));
     if(reportCreator.rejected.match(reportres)){
        console.log('reportres')
        console.log(reportres)
        toastr.error('erreur de serveur, veuillez essayer plus tard')
     }
     if(reportCreator.fulfilled.match(reportres)){
        console.log('reportres')
        toastr.success("rapport soumis avec succès")
        console.log(reportres)
     }
    }
    return (
        <div className="lg:w-[80%] w-full new md:px-0 px-[20px] report-contentdiv">
            <div className="flex flex-row space-x-2">
            <svg onClick={()=>navigate(-1)} className="cursor-pointer" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 12.5H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5.5L5 12.5L12 19.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <p>
                Retour
                </p>
            </div>
            <h3 className="text-white text-[30px] font-bold mb-[20px] my-7">Réaliser une demande </h3>
            <div className="flex flex-col items-center lg:p-[48px] p-[10px]  border-[#5991C6] rounded-[20px] border-[1px]">
                <div
                    ref={dropdownRef}
                    className="custom-select justify-between relative w-full py-[10px] px-[13px] flex items-center border-[1px] bg-[#11142E] border-[#5991C6] text-[#BEC1CD] rounded-[20px]"
                    onClick={handleDropdownToggle}
                >
                    <span>{fdropselected} </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 text-white"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                    {showDropdown && (
                        <div className="dropdown block bg-[#15357E] absolute top-full left-0 mt-2 w-full  border-[#5991C6] rounded-[20px] z-10">
                            <div className="dropdown-second">
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        className="dropdown-item py-2 px-4 hover:bg-[#1C2045]"
                                        onClick={() => handleOptionSelect(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <p className=" lg:mt-[45px] mt-[20px] mb-[10px] w-full text-white font-semibold text-[16px]">Adresse e-mail</p>
                <div className="justify-between items-center relative w-full py-[10px] px-[13px] flex  border-[1px] bg-[#11142E] border-[#5991C6] text-[#BEC1CD] rounded-[20px]"
                >
                    <form>
                        <input className="bg-transparent outline-none w-full" type="email" placeholder="Entrer votre adresse email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    </form>
                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group 100">
                            <path id="Vector" d="M0.824219 1.46777V12.3052L6.24293 6.88648L0.824219 1.46777Z" fill="white" />
                            <path id="Vector_2" d="M1.90137 0.380859L8.76154 7.24104C9.62795 8.10745 11.139 8.10745 12.0054 7.24104L18.8656 0.380859H1.90137Z" fill="white" />
                            <path id="Vector_3" d="M13.0863 8.32336C12.3652 9.04524 11.4047 9.44366 10.3831 9.44366C9.36145 9.44366 8.40098 9.04524 7.67986 8.32336L7.32427 7.96777L1.91016 13.3819H18.856L13.4419 7.96777L13.0863 8.32336Z" fill="white" />
                            <path id="Vector_4" d="M14.5234 6.88648L19.9421 12.3052V1.46777L14.5234 6.88648Z" fill="white" />
                        </g>
                    </svg>
                </div>
                {
                    email.length === 0 ? <span className=" text-red-600 w-full mt-[4px]">Veuillez entrer la bonne adresse e-mail</span> : ""
                }
                <p className=" lg:mt-[45px] mt-[20px] mb-[10px] w-full text-white font-semibold text-[16px]">Objet</p>
                <div
                    ref={dropdownRefSecond}
                    className="custom-select justify-between relative w-full py-[10px] px-[13px] flex items-center border-[1px] bg-[#11142E] border-[#5991C6] text-[#BEC1CD] rounded-[20px]"
                    onClick={handleDropdownTogglescnd}
                >
                    <span>{fdropselectedscnd}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 text-white"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                    {showDropdownscnd && (
                        <div className="dropdown block bg-[#15357E] absolute top-full left-0 mt-2 w-full border-[#5991C6] rounded-[20px] z-10">
                            <div className="dropdown-second">
                                {optionsscnd.map((option, index) => (
                                    <div
                                        key={index}
                                        className="dropdown-item py-2 px-4 hover:bg-[#1C2045]"
                                        onClick={() => handleOptionSelectscnd(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <p className=" lg:mt-[45px] mt-[20px] mb-[10px] w-full text-white font-semibold text-[16px]">Sujet</p>
                <div className="justify-between items-center relative w-full py-[10px] px-[13px] flex  border-[1px] bg-[#11142E] border-[#5991C6] text-[#BEC1CD] rounded-[20px]"
                >
                    <form>
                        <input className="bg-transparent outline-none w-full" type="text" placeholder="Entrer le sujet" onChange={(e) => { setSubject(e.target.value) }} value={subject} />
                    </form>
                </div>
                <p className=" lg:mt-[45px] mt-[20px] mb-[10px] w-full text-white font-semibold text-[16px]">Description</p>
                <div className="justify-between items-center relative w-full py-[10px] px-[13px] flex  border-[1px] bg-[#11142E] border-[#5991C6] text-[#BEC1CD] rounded-[20px]"
                >

                    <textarea className="bg-transparent outline-none w-full" type="text" placeholder="Nous comprenons le problème auquel vous êtes confronté et nous voulons vous assurer que notre équipe travaille activement pour résoudre rapidement le problème." onChange={(e) => { setDescription(e.target.value) }} value={description} />

                </div>
                <p className=" lg:mt-[45px] mt-[20px] mb-[10px] w-full text-white font-semibold text-[16px]">Pièces jointes</p>
                <div className="justify-between items-center relative w-full py-[10px] px-[13px] flex  border-[1px] bg-[#11142E] border-[#5991C6] text-[#BEC1CD] rounded-[20px]"
                >

                    <input type="text" disabled className="bg-transparent outline-none w-[80%] text-white" placeholder="Ajouter des pièces jointes" />
                    <span style={{width:'8rem',fontSize:'0.8rem'}} className="w-[20%] border-[#25365E] rounded-xl flex justify-center bg-[#25365e]">
                        <label htmlFor="attachment" className="cursor-pointer flex gap-1 items-center">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="IconLeft">
                                    <path id="Icon" d="M9.78694 4.87037L5.88425 8.77306C5.42141 9.2359 5.42141 9.98632 5.88425 10.4492C6.34709 10.912 7.09751 10.912 7.56036 10.4492L11.3614 6.54648C12.2871 5.62079 12.2871 4.11995 11.3614 3.19427C10.4357 2.26858 8.93485 2.26858 8.00916 3.19427L4.20815 7.09695C2.81962 8.48548 2.81962 10.7367 4.20815 12.1253C5.59668 13.5138 7.84793 13.5138 9.23646 12.1253L12.9445 8.42593" stroke="#DADDE7" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </svg>
                            Pièce jointe
                        </label>
                        <input
                            id="attachment"
                            type="file"
                            accept=".pdf, .doc, .docx, .jpg, .png"
                            className="hidden"
                            onChange={handleAttachmentChange}
                        />
                    </span>

                </div>
                <div onClick={reportNow} className="cursor-pointer h-[43px] py-[8px] px-[30px] w-full text-center hover:cursor-pointer bg-[#275ACE] border-[#8CC8FF] rounded-[45px] mt-[40px]">
                    Envoyer
                </div>
            </div>

        </div>
    );
};

export default Reportcontent;
