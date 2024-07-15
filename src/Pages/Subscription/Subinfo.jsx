import React from "react";
import "./subscription.css"
import 'toastr/build/toastr.min.css';
import toastr from 'toastr'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar/Navbar";
import Accountnavbar from "../../common/Accountnavbar/Accountnavbar";
const Subinfo = () => {
    //completed
    //subinfopage
    const [checkbox,setCheckbox]=React.useState(false)
    const [name,setName]=React.useState("")
    const [id,setId]=React.useState("")
    const [price,setPrice]=React.useState("")
    const location=useLocation();
    const navigate=useNavigate()
    React.useEffect(() => {
        const search = location.search;
        const params = new URLSearchParams(search);
        const id = params.get('id');
        const name = params.get('name');
        const price = params.get('price');
    
        setName(name);
        setPrice(price);
        setId(id);
    }, [location]);
    
    const buynow=()=>{
if(checkbox==false){
    toastr.error('veuillez cocher la case')
}else{
navigate(`/subscriptions?name=${name}&id=${id}&price=${price}`)
}
    }
    return (
        <div className="h-full subinfo-div flex flex-col" style={{ background: '#0C0E1C',color:'white' }}>
              <Accountnavbar pagename={"Choix de l’abonnement"}/>
    
     
    <Navbar pagename={"Choix de l’abonnement"}/>
 <div className="flex flex-col   md:items-center svg-subinfo">
 <div style={{color:'white',gap:'1rem'}} className="flex flex-row space-x-2 items-center subinfo-back">
             <svg onClick={()=>navigate(-1)} className="cursor-pointer" width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.66046 20.9999C9.41322 21.0007 9.16894 20.9512 8.94557 20.8552C8.72219 20.7591 8.52539 20.619 8.36964 20.4449L0.37647 11.4458C0.133064 11.1774 0 10.8408 0 10.4934C0 10.146 0.133064 9.80935 0.37647 9.54098L8.65097 0.541827C8.93187 0.235531 9.33552 0.0429128 9.77312 0.00634665C10.2107 -0.0302195 10.6464 0.0922618 10.9844 0.346846C11.3223 0.601429 11.5349 0.967262 11.5752 1.36386C11.6156 1.76047 11.4804 2.15535 11.1995 2.46165L3.80211 10.5009L10.9513 18.5401C11.1536 18.7603 11.2822 19.0284 11.3217 19.3127C11.3612 19.597 11.3101 19.8856 11.1743 20.1443C11.0385 20.4031 10.8237 20.6212 10.5555 20.7728C10.2872 20.9244 9.9766 21.0032 9.66046 20.9999Z" fill="white"/>
</svg>

             Retour
             </div>
            <div style={{marginTop:'3rem'}} className="flex subinfo-contentdiv flex-col max-w-[800px] p-[20px] lg:p-[35px] rounded-[20px] border border-blue-500 mx-auto my-0">
      
                <h2 className="text-white flex justify-center items-center gap-2 font-bold text-[24px]">
                    {name} <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                        <path d="M22.0101 13.7401C21.6392 13.2282 21.4396 12.6122 21.4396 11.9801C21.4396 11.348 21.6392 10.732 22.0101 10.2201L22.7701 9.17009C22.863 9.04188 22.9242 8.89343 22.9485 8.73696C22.9728 8.58049 22.9597 8.42048 22.9101 8.27009C22.86 8.12128 22.7762 7.98608 22.6651 7.87505C22.5541 7.76403 22.4189 7.68019 22.2701 7.63009L21.0401 7.23009C20.4376 7.03573 19.9123 6.65494 19.5403 6.14269C19.1682 5.63043 18.9686 5.01321 18.9701 4.38009V3.08009C18.97 2.92226 18.9325 2.76669 18.8607 2.62612C18.789 2.48554 18.6849 2.36395 18.5572 2.27129C18.4294 2.17863 18.2815 2.11753 18.1256 2.09299C17.9697 2.06845 17.8102 2.08116 17.6601 2.13009L16.4201 2.53009C15.8181 2.72489 15.1699 2.72437 14.5683 2.5286C13.9666 2.33283 13.4422 1.95184 13.0701 1.44009L12.3101 0.390093C12.2131 0.268401 12.0898 0.170138 11.9496 0.102604C11.8094 0.0350698 11.6557 0 11.5001 0C11.3444 0 11.1908 0.0350698 11.0506 0.102604C10.9103 0.170138 10.7871 0.268401 10.6901 0.390093L9.93009 1.44009C9.55799 1.95184 9.03361 2.33283 8.43194 2.5286C7.83026 2.72437 7.18209 2.72489 6.58009 2.53009L5.34009 2.13009C5.19003 2.08116 5.03052 2.06845 4.87461 2.09299C4.71869 2.11753 4.5708 2.17863 4.44302 2.27129C4.31525 2.36395 4.21123 2.48554 4.13946 2.62612C4.06769 2.76669 4.03021 2.92226 4.03009 3.08009V4.38009C4.03163 5.01321 3.83196 5.63043 3.4599 6.14269C3.08784 6.65494 2.56264 7.03573 1.96009 7.23009L0.730094 7.63009C0.581285 7.68019 0.446082 7.76403 0.335055 7.87505C0.224029 7.98608 0.14019 8.12128 0.0900938 8.27009C0.0405054 8.42048 0.0273391 8.58049 0.0516786 8.73696C0.0760181 8.89343 0.137167 9.04188 0.230094 9.17009L0.990094 10.2201C1.36094 10.732 1.56061 11.348 1.56061 11.9801C1.56061 12.6122 1.36094 13.2282 0.990094 13.7401L0.230094 14.7901C0.137167 14.9183 0.0760181 15.0668 0.0516786 15.2232C0.0273391 15.3797 0.0405054 15.5397 0.0900938 15.6901C0.14019 15.8389 0.224029 15.9741 0.335055 16.0851C0.446082 16.1962 0.581285 16.28 0.730094 16.3301L1.96009 16.7301C2.56264 16.9245 3.08784 17.3052 3.4599 17.8175C3.83196 18.3298 4.03163 18.947 4.03009 19.5801V20.8801C4.03021 21.0379 4.06769 21.1935 4.13946 21.3341C4.21123 21.4746 4.31525 21.5962 4.44302 21.6889C4.5708 21.7816 4.71869 21.8427 4.87461 21.8672C5.03052 21.8917 5.19003 21.879 5.34009 21.8301L6.57009 21.4301C7.17337 21.232 7.82399 21.2309 8.42797 21.4268C9.03194 21.6227 9.55799 22.0056 9.93009 22.5201L10.6901 23.5701C10.7835 23.6972 10.9054 23.8006 11.0461 23.8718C11.1869 23.9431 11.3424 23.9802 11.5001 23.9802C11.6578 23.9802 11.8133 23.9431 11.954 23.8718C12.0948 23.8006 12.2167 23.6972 12.3101 23.5701L13.0701 22.5201C13.4428 22.0063 13.9689 21.624 14.5727 21.4281C15.1764 21.2323 15.8267 21.233 16.4301 21.4301L17.6601 21.8301C17.8102 21.879 17.9697 21.8917 18.1256 21.8672C18.2815 21.8427 18.4294 21.7816 18.5572 21.6889C18.6849 21.5962 18.789 21.4746 18.8607 21.3341C18.9325 21.1935 18.97 21.0379 18.9701 20.8801V19.5801C18.9686 18.947 19.1682 18.3298 19.5403 17.8175C19.9123 17.3052 20.4376 16.9245 21.0401 16.7301L22.2701 16.3301C22.4189 16.28 22.5541 16.1962 22.6651 16.0851C22.7762 15.9741 22.86 15.8389 22.9101 15.6901C22.9597 15.5397 22.9728 15.3797 22.9485 15.2232C22.9242 15.0668 22.863 14.9183 22.7701 14.7901L22.0101 13.7401ZM16.2101 10.6871L11.2101 15.6871C11.0226 15.8746 10.7683 15.9799 10.5031 15.9799C10.2379 15.9799 9.98362 15.8746 9.79609 15.6871L6.79609 12.6871C6.70058 12.5948 6.6244 12.4845 6.57199 12.3625C6.51958 12.2405 6.492 12.1093 6.49084 11.9765C6.48969 11.8437 6.51499 11.712 6.56527 11.5891C6.61555 11.4662 6.68981 11.3546 6.7837 11.2607C6.87759 11.1668 6.98924 11.0926 7.11214 11.0423C7.23504 10.992 7.36672 10.9667 7.4995 10.9678C7.63227 10.969 7.76349 10.9966 7.8855 11.049C8.0075 11.1014 8.11785 11.1776 8.21009 11.2731L10.5001 13.5661L14.7931 9.27309C14.9817 9.09093 15.2343 8.99014 15.4965 8.99242C15.7587 8.9947 16.0095 9.09987 16.1949 9.28527C16.3803 9.47068 16.4855 9.7215 16.4878 9.98369C16.49 10.2459 16.3893 10.4985 16.2071 10.6871H16.2101Z" fill="#5991C6" />
                    </svg>
                </h2>
                <h1 className="text-white font-semibold text-[28px] my-[40px] text-center">
                    En vous abonnant, vous aurez le pouvoir de
                </h1>
                <ul className=" list-none no-underline flex flex-col gap-[40px] justify-center lg:w-[50%] mx-auto">
                    <li className="text-white text-[20px] flex  items-center gap-3"><span className="h-[20px] w-[20px] flex justify-center items-center rounded-[100%] border border-blue-500  p-[4px]"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                        <path d="M6.39942 12.6352C6.19103 12.8342 5.8958 13 5.63531 13C5.37482 13 5.07959 12.8259 4.86252 12.6269L0 7.98406L1.54559 6.50829L5.64399 10.4216L16.4805 0L18 1.50064L6.39942 12.6352Z" fill="#5991C6" />
                    </svg></span>Débloquer mon contenu exclusif</li>
                    <li className="text-white text-[20px] flex  items-center gap-3"><span className="h-[20px] w-[20px] flex justify-center items-center rounded-[100%] border border-blue-500  p-[4px]"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                        <path d="M6.39942 12.6352C6.19103 12.8342 5.8958 13 5.63531 13C5.37482 13 5.07959 12.8259 4.86252 12.6269L0 7.98406L1.54559 6.50829L5.64399 10.4216L16.4805 0L18 1.50064L6.39942 12.6352Z" fill="#5991C6" />
                    </svg></span>Accéder à l’intégralité des audios</li>
                    <li className="text-white text-[20px] flex  items-center gap-3"><span className="h-[20px] w-[20px] flex justify-center items-center rounded-[100%] border border-blue-500  p-[4px]"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                        <path d="M6.39942 12.6352C6.19103 12.8342 5.8958 13 5.63531 13C5.37482 13 5.07959 12.8259 4.86252 12.6269L0 7.98406L1.54559 6.50829L5.64399 10.4216L16.4805 0L18 1.50064L6.39942 12.6352Z" fill="#5991C6" />
                    </svg></span>Me parler sur ma messagerie privée</li>
                    <li className="text-white text-[20px] flex  items-center gap-3"><span className="h-[20px] w-[20px] flex justify-center items-center rounded-[100%] border border-blue-500 p-[4px]"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                        <path d="M6.39942 12.6352C6.19103 12.8342 5.8958 13 5.63531 13C5.37482 13 5.07959 12.8259 4.86252 12.6269L0 7.98406L1.54559 6.50829L5.64399 10.4216L16.4805 0L18 1.50064L6.39942 12.6352Z" fill="#5991C6" />
                    </svg></span>Réserver un appel audio avec moi </li>

                </ul>
                <h2 className="text-white flex justify-center items-center gap-2 font-bold text-[28px] mt-[50px]">
                    S’abonner
                </h2>
                <div className=" h-[241px] relative mt-[20px] rounded-[20px] border border-blue-500 w-[216px] mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="216" height="128" viewBox="0 0 216 128" fill="none">
                        <path d="M97.5919 124.487L0 50.3781V13.1908C0 5.90899 5.90896 0.00900757 13.1908 0.0201079L202.849 0.309222C210.116 0.320298 216 6.21377 216 13.4799V50.3781L113.275 124.67C108.577 128.068 102.21 127.993 97.5919 124.487Z" fill="#22779C" />
                    </svg>
                    <h2 className="text-white absolute flex justify-center w-[200px] top-[10%] left-1/2 translate-x-[-50%]">Offre mensuelle</h2>
                    <h2 className="text-white absolute flex justify-center w-[200px] top-[20%] left-1/2 translate-x-[-50%]">Sans engagement</h2>
                    <h3 className="text-white text-center mt-[20px]">5,99€/mois</h3>
                </div>
                <span onClick={buynow} className="text-white rounded-[50px] cursor-pointer bg-[#22779C] flex justify-center items-center max-w-[215px] mx-auto px-[30px] py-[10px] mt-[20px] mb-[40px] hover:cursor-pointer">
                    Acheter maintenant
                </span>
                <span className="checkbox flex gap-1">
                    <input onChange={(e)=>setCheckbox(e.target.checked)} type="checkbox" className=" outline-white" />
                    <p className="m-0 text-white text-[18px]">
                        En vous inscrivant, vous déclarez avoir lu et accepté les
                        <a className="mx-[6px] inline text-blue-500" href="#">Conditions Générales d’Utilisation</a>
                        et la <a className="mx-[6px] inline text-blue-500" href="#">Politique de Confidentialité des Données.</a>
                    </p>

                </span>
                <p className="text-white text-center mt-[40px] text-[18px]">
                Un abonnement est unique par Créateur. Le prix d’un appel audio est en supplément du prix de l’abonnement et est fixé par le Créateur. 
                </p>
            </div>
 </div>
        </div>
    )
}

export default Subinfo