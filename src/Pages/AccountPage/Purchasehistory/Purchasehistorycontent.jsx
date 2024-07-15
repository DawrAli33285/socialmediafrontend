import React from "react";
import {useDispatch} from 'react-redux'
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { getStripeSubscriptions, getSubscriptions } from "../../../redux/slices/subscription";
import InvoiceComponent from "./Invoicecomponent";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
  } from '@stripe/react-stripe-js';
const Purcasehistorycontent=()=>{
    const dispatch=useDispatch();
    const stripe=useStripe();
    const [subscription,setSubscriptions]=React.useState([])
    const [invoiceSubscription,setInvoiceSubscription]=React.useState()
    const [showinvoicepopup,setShowInvoicePopup]=React.useState(false)
    React.useEffect(()=>{
fetchSubscriptions();
    },[])
    const fetchSubscriptions=async()=>{
  let subres=await dispatch(getSubscriptions())
if(getSubscriptions.rejected.match(subres)){
    console.log('subres')
    console.log(subres)
    
}   
if(getSubscriptions.fulfilled.match(subres)){
console.log('subres')
console.log(subres)
setSubscriptions(subres.payload.data.response)

}
}
const getDate = (fulldate) => {
   
    let date = new Date(fulldate);
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();
    let day = date.getDate(); 

    return day + '/' + month + '/' + year;
}

const formatDate = (dateString) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${day} ${months[monthIndex]}, ${year}`;
  };
  
  const formatDateWithSlash = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  const downloadInvoiceAsPDF = () => {
    const invoiceElement = document.querySelector('#invoice');

    html2canvas(invoiceElement, { useCORS: true, scale: 1 }).then((canvas) => {
        // Constants for A4 dimensions in inches
        const a4WidthInches = 8.27;
        const a4HeightInches = 11.69;

        // Convert canvas dimensions to inches (assuming 96 DPI)
        const canvasWidthInches = canvas.width / 96;
        const canvasHeightInches = canvas.height / 88;

        // Check if the canvas height is less than A4 height
        const verticalMargin = canvasHeightInches < a4HeightInches
            ? (a4HeightInches - canvasHeightInches) / 2 // Center vertically
            : 0; // No vertical margin if the canvas is as tall as or taller than A4

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'in',
            format: 'a4'
        });

        // Add the image to PDF
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, verticalMargin, a4WidthInches, canvasHeightInches);
        pdf.save('invoice.pdf');
    });

    setShowInvoicePopup(false);
};

  const handleinvoice=async(sub)=>{
    setShowInvoicePopup(true);
    console.log('sub')
    console.log(sub)
   setInvoiceSubscription(sub)
  
    let stripesubres=await dispatch(getStripeSubscriptions(sub.subid))
if(getStripeSubscriptions.rejected.match(stripesubres)){
    console.log('getStripeSubscriptions')
    console.log(stripesubres)
}
if(getStripeSubscriptions.fulfilled.match(stripesubres)){
    console.log('getStripeSubscriptions')
    console.log(stripesubres)
    // setInvoiceSubscription(stripesubres.payload.data)
}
}
    return(
        <div className="purchasehistorycontent-div">   
      {showinvoicepopup?<div className="invoicepopup-screen absolute">
      <div className="invoicepopup">
         <p style={{justifyContent:'center',alignItems:'center',fontSize:'1.3rem'}} className="flex py-3">Commande #19779197</p>
         <p className="px-7">Abonnement</p>
         <div className="flex flex-col px-7 py-3">
         <div className="flex flex-row space-x-3 items-center">
        <p>Jade B</p>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3366 9.16763C15.0778 8.82608 14.9384 8.41509 14.9384 7.99333C14.9384 7.57157 15.0778 7.16058 15.3366 6.81903L15.8672 6.11845C15.932 6.0329 15.9747 5.93385 15.9917 5.82945C16.0087 5.72506 15.9995 5.61829 15.9649 5.51795C15.9299 5.41867 15.8714 5.32845 15.7939 5.25438C15.7164 5.1803 15.622 5.12436 15.5181 5.09093L14.6595 4.82405C14.2389 4.69436 13.8723 4.4403 13.6126 4.09851C13.3528 3.75672 13.2135 3.3449 13.2145 2.92248V2.05509C13.2144 1.94978 13.1883 1.84599 13.1382 1.75219C13.0881 1.6584 13.0155 1.57727 12.9263 1.51545C12.8371 1.45362 12.7338 1.41286 12.625 1.39648C12.5162 1.38011 12.4048 1.38859 12.3001 1.42124L11.4345 1.68812C11.0142 1.8181 10.5618 1.81775 10.1418 1.68713C9.72176 1.55651 9.35571 1.3023 9.09596 0.960856L8.56543 0.260277C8.49769 0.179082 8.41168 0.113519 8.31379 0.0684593C8.2159 0.0233992 8.10865 0 8 0C7.89135 0 7.7841 0.0233992 7.68621 0.0684593C7.58832 0.113519 7.50231 0.179082 7.43457 0.260277L6.90404 0.960856C6.64429 1.3023 6.27824 1.55651 5.85824 1.68713C5.43823 1.81775 4.98576 1.8181 4.56553 1.68812L3.69994 1.42124C3.59519 1.38859 3.48384 1.38011 3.375 1.39648C3.26616 1.41286 3.16292 1.45362 3.07373 1.51545C2.98453 1.57727 2.91192 1.6584 2.86182 1.75219C2.81172 1.84599 2.78556 1.94978 2.78548 2.05509V2.92248C2.78655 3.3449 2.64716 3.75672 2.38744 4.09851C2.12772 4.4403 1.7611 4.69436 1.34049 4.82405L0.481872 5.09093C0.377994 5.12436 0.283613 5.1803 0.20611 5.25438C0.128607 5.32845 0.0700819 5.41867 0.0351118 5.51795C0.000495946 5.61829 -0.00869493 5.72506 0.00829554 5.82945C0.025286 5.93385 0.0679721 6.0329 0.13284 6.11845L0.663368 6.81903C0.92224 7.16058 1.06162 7.57157 1.06162 7.99333C1.06162 8.41509 0.92224 8.82608 0.663368 9.16763L0.13284 9.86821C0.0679721 9.95376 0.025286 10.0528 0.00829554 10.1572C-0.00869493 10.2616 0.000495946 10.3684 0.0351118 10.4687C0.0700819 10.568 0.128607 10.6582 0.20611 10.7323C0.283613 10.8064 0.377994 10.8623 0.481872 10.8957L1.34049 11.1626C1.7611 11.2923 2.12772 11.5464 2.38744 11.8882C2.64716 12.2299 2.78655 12.6418 2.78548 13.0642V13.9316C2.78556 14.0369 2.81172 14.1407 2.86182 14.2345C2.91192 14.3283 2.98453 14.4094 3.07373 14.4712C3.16292 14.533 3.26616 14.5738 3.375 14.5902C3.48384 14.6066 3.59519 14.5981 3.69994 14.5654L4.55855 14.2985C4.97968 14.1664 5.43385 14.1656 5.85546 14.2963C6.27708 14.4271 6.64429 14.6825 6.90404 15.0258L7.43457 15.7264C7.49974 15.8112 7.58489 15.8802 7.68312 15.9277C7.78135 15.9752 7.8899 16 8 16C8.1101 16 8.21865 15.9752 8.31688 15.9277C8.41511 15.8802 8.50026 15.8112 8.56543 15.7264L9.09596 15.0258C9.35614 14.683 9.72338 14.4279 10.1448 14.2972C10.5663 14.1666 11.0203 14.167 11.4414 14.2985L12.3001 14.5654C12.4048 14.5981 12.5162 14.6066 12.625 14.5902C12.7338 14.5738 12.8371 14.533 12.9263 14.4712C13.0155 14.4094 13.0881 14.3283 13.1382 14.2345C13.1883 14.1407 13.2144 14.0369 13.2145 13.9316V13.0642C13.2135 12.6418 13.3528 12.2299 13.6126 11.8882C13.8723 11.5464 14.2389 11.2923 14.6595 11.1626L15.5181 10.8957C15.622 10.8623 15.7164 10.8064 15.7939 10.7323C15.8714 10.6582 15.9299 10.568 15.9649 10.4687C15.9995 10.3684 16.0087 10.2616 15.9917 10.1572C15.9747 10.0528 15.932 9.95376 15.8672 9.86821L15.3366 9.16763ZM11.2879 7.13062L7.79756 10.4667C7.66666 10.5918 7.48913 10.6621 7.30403 10.6621C7.11893 10.6621 6.94141 10.5918 6.8105 10.4667L4.71632 8.46505C4.64964 8.40351 4.59646 8.32988 4.55988 8.24848C4.52329 8.16708 4.50404 8.07952 4.50323 7.99093C4.50243 7.90234 4.52009 7.81448 4.55519 7.73248C4.59029 7.65048 4.64212 7.57598 4.70766 7.51334C4.77321 7.45069 4.85115 7.40115 4.93694 7.3676C5.02272 7.33405 5.11465 7.31717 5.20733 7.31794C5.30002 7.31871 5.39162 7.33712 5.47679 7.37208C5.56195 7.40705 5.63898 7.45788 5.70338 7.52161L7.30194 9.05154L10.2987 6.18717C10.4304 6.06563 10.6067 5.99838 10.7897 5.9999C10.9728 6.00142 11.1478 6.07159 11.2773 6.1953C11.4067 6.31901 11.4801 6.48635 11.4817 6.6613C11.4833 6.83624 11.4129 7.00478 11.2858 7.13062H11.2879Z" fill="white"/>
</svg>

         </div>
<p>Effectue le 10 Sept 2023</p>
         </div>
         <div className="flex flex-row spacae-x-3 px-7">
<p>5,99€</p>
<p>Total TTC</p>
         </div>
         <p className="px-7">Cb</p>
<div  className="flex flex-col items-center justify-center">
<button onClick={downloadInvoiceAsPDF}>Télécharger la facture</button>
 <p className="cursor-pointer" onClick={(e)=>setShowInvoicePopup(false)} style={{marginTop:'1rem'}}>Fermer</p>
</div>
          </div>
        </div>
          :``}
<div className="flex flex-row items-center space-x-2">
<Link to='/account'>
<svg width="15" height="17" viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5112 28C12.191 28.0009 11.8746 27.9369 11.5853 27.8125C11.296 27.6882 11.0411 27.5066 10.8394 27.2813L0.487562 15.6266C0.17233 15.279 0 14.843 0 14.3931C0 13.9432 0.17233 13.5072 0.487562 13.1596L11.2038 1.50494C11.5676 1.10826 12.0903 0.858799 12.6571 0.811442C13.2238 0.764086 13.7881 0.92271 14.2257 1.25242C14.6634 1.58213 14.9387 2.05591 14.9909 2.56955C15.0432 3.08318 14.8682 3.59459 14.5044 3.99127L4.92407 14.4028L14.1829 24.8143C14.445 25.0995 14.6114 25.4467 14.6626 25.8149C14.7138 26.183 14.6475 26.5568 14.4717 26.8919C14.2958 27.2271 14.0177 27.5095 13.6703 27.7059C13.3228 27.9022 12.9206 28.0043 12.5112 28Z" fill="white"/>
</svg>
</Link>
<p>Retour</p>

</div>
<p style={{marginTop:'2rem',fontSize:'1.2rem'}}>
Catégorie de l’achat
</p>
<div className="purchasehistory-recordcontainer">
{subscription?.map((sub,i)=>{
    return <div key={i.toString()} className="purchase-history-record flex flex-col">
    <p style={{color:'#8CC8FF'}}>Abonnement</p>
    <div className="flex flex-row">
    <div className="flex flex-col">
    <div className="flex flex-row space-x-2">
    <p>{sub?.creator?.name}</p>
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.1708 11.5726C18.8472 11.1456 18.673 10.6319 18.673 10.1047C18.673 9.5775 18.8472 9.06377 19.1708 8.63682L19.8339 7.7611C19.915 7.65416 19.9684 7.53035 19.9896 7.39985C20.0109 7.26936 19.9994 7.1359 19.9561 7.01048C19.9124 6.88637 19.8392 6.77361 19.7424 6.68101C19.6455 6.58841 19.5275 6.51849 19.3977 6.4767L18.3244 6.1431C17.7986 5.98099 17.3403 5.66341 17.0157 5.23617C16.691 4.80894 16.5168 4.29416 16.5182 3.76613V2.6819C16.5181 2.55026 16.4854 2.42052 16.4227 2.30328C16.3601 2.18603 16.2693 2.08463 16.1578 2.00735C16.0463 1.93006 15.9173 1.87911 15.7812 1.85864C15.6452 1.83817 15.506 1.84877 15.3751 1.88958L14.2931 2.22319C13.7678 2.38566 13.2022 2.38522 12.6772 2.22195C12.1522 2.05867 11.6946 1.74091 11.3699 1.31411L10.7068 0.438383C10.6221 0.33689 10.5146 0.254936 10.3922 0.198611C10.2699 0.142286 10.1358 0.113037 10 0.113037C9.86419 0.113037 9.73012 0.142286 9.60776 0.198611C9.4854 0.254936 9.37788 0.33689 9.29321 0.438383L8.63005 1.31411C8.30536 1.74091 7.84781 2.05867 7.32279 2.22195C6.79778 2.38522 6.2322 2.38566 5.70692 2.22319L4.62492 1.88958C4.49398 1.84877 4.3548 1.83817 4.21875 1.85864C4.0827 1.87911 3.95365 1.93006 3.84216 2.00735C3.73067 2.08463 3.6399 2.18603 3.57727 2.30328C3.51465 2.42052 3.48195 2.55026 3.48185 2.6819V3.76613C3.48318 4.29416 3.30895 4.80894 2.9843 5.23617C2.65965 5.66341 2.20137 5.98099 1.67561 6.1431L0.602339 6.4767C0.472492 6.51849 0.354517 6.58841 0.257638 6.68101C0.160759 6.77361 0.0876024 6.88637 0.0438897 7.01048C0.000619933 7.1359 -0.0108687 7.26936 0.0103694 7.39985C0.0316075 7.53035 0.0849651 7.65416 0.166051 7.7611L0.82921 8.63682C1.1528 9.06377 1.32703 9.5775 1.32703 10.1047C1.32703 10.6319 1.1528 11.1456 0.82921 11.5726L0.166051 12.4483C0.0849651 12.5552 0.0316075 12.6791 0.0103694 12.8095C-0.0108687 12.94 0.000619933 13.0735 0.0438897 13.1989C0.0876024 13.323 0.160759 13.4358 0.257638 13.5284C0.354517 13.621 0.472492 13.6909 0.602339 13.7327L1.67561 14.0663C2.20137 14.2284 2.65965 14.546 2.9843 14.9732C3.30895 15.4005 3.48318 15.9152 3.48185 16.4433V17.5275C3.48195 17.6591 3.51465 17.7889 3.57727 17.9061C3.6399 18.0234 3.73067 18.1248 3.84216 18.2021C3.95365 18.2793 4.0827 18.3303 4.21875 18.3508C4.3548 18.3712 4.49398 18.3606 4.62492 18.3198L5.69819 17.9862C6.22459 17.821 6.79232 17.82 7.31933 17.9835C7.84634 18.1469 8.30536 18.4662 8.63005 18.8953L9.29321 19.771C9.37468 19.877 9.48111 19.9632 9.6039 20.0227C9.72668 20.0821 9.86237 20.113 10 20.113C10.1376 20.113 10.2733 20.0821 10.3961 20.0227C10.5189 19.9632 10.6253 19.877 10.7068 19.771L11.3699 18.8953C11.6952 18.4668 12.1542 18.1479 12.6811 17.9846C13.2079 17.8212 13.7753 17.8218 14.3018 17.9862L15.3751 18.3198C15.506 18.3606 15.6452 18.3712 15.7812 18.3508C15.9173 18.3303 16.0463 18.2793 16.1578 18.2021C16.2693 18.1248 16.3601 18.0234 16.4227 17.9061C16.4854 17.7889 16.5181 17.6591 16.5182 17.5275V16.4433C16.5168 15.9152 16.691 15.4005 17.0157 14.9732C17.3403 14.546 17.7986 14.2284 18.3244 14.0663L19.3977 13.7327C19.5275 13.6909 19.6455 13.621 19.7424 13.5284C19.8392 13.4358 19.9124 13.323 19.9561 13.1989C19.9994 13.0735 20.0109 12.94 19.9896 12.8095C19.9684 12.6791 19.915 12.5552 19.8339 12.4483L19.1708 11.5726ZM14.1098 9.02631L9.74695 13.1964C9.58332 13.3528 9.36142 13.4406 9.13004 13.4406C8.89866 13.4406 8.67676 13.3528 8.51313 13.1964L5.89539 10.6944C5.81205 10.6174 5.74558 10.5254 5.69985 10.4236C5.65412 10.3219 5.63005 10.2124 5.62904 10.1017C5.62803 9.99096 5.65011 9.88113 5.69398 9.77864C5.73786 9.67614 5.80265 9.58302 5.88458 9.50471C5.96651 9.4264 6.06393 9.36447 6.17117 9.32254C6.27841 9.2806 6.39331 9.2595 6.50917 9.26046C6.62503 9.26142 6.73953 9.28443 6.84598 9.32814C6.95244 9.37185 7.04873 9.43539 7.12922 9.51505L9.12742 11.4275L12.8734 7.847C13.038 7.69508 13.2584 7.61101 13.4872 7.61291C13.716 7.61481 13.9348 7.70253 14.0966 7.85716C14.2584 8.0118 14.3501 8.22098 14.3521 8.43966C14.3541 8.65834 14.2662 8.86901 14.1072 9.02631H14.1098Z" fill="#5991C6"/>
    </svg>
    </div>
    <div className="flex flex-row">
    <p style={{color:'#D9D9D9'}}>{getDate(sub?.createdAt)}</p>
    </div>
    </div>
 <div style={{width:'100%'}} className="flex flex-col items-end justify-end space-y-3">
 <svg onClick={(e)=>handleinvoice(sub)} className="cursor-pointer" width="22" height="17" viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4375 0C9.15879 0 5.04668 3.14531 0 8.25C4.34414 12.6135 7.99219 16.5 14.4375 16.5C20.8764 16.5 25.6137 11.5758 28.875 8.34023C25.5363 4.55039 20.8055 0 14.4375 0ZM14.4375 14.1346C11.2535 14.1346 8.6625 11.492 8.6625 8.25C8.6625 5.00156 11.2535 2.36543 14.4375 2.36543C17.6215 2.36543 20.2125 5.00801 20.2125 8.25C20.2125 11.4984 17.6215 14.1346 14.4375 14.1346Z" fill="white"/>
<path d="M14.4375 6.1873C14.4375 5.67813 14.6245 5.21406 14.9274 4.85313C14.7663 4.82734 14.6051 4.81445 14.4375 4.81445C12.5813 4.81445 11.0667 6.35488 11.0667 8.2498C11.0667 10.1447 12.5813 11.6852 14.4375 11.6852C16.2938 11.6852 17.8084 10.1447 17.8084 8.2498C17.8084 8.10156 17.7956 7.95332 17.7827 7.80508C17.4282 8.08223 16.9899 8.2498 16.5065 8.2498C15.3592 8.2498 14.4375 7.32812 14.4375 6.1873Z" fill="white"/>
</svg>

    <p className="purchasehistory-amount">{sub?.price}€</p>
    </div>
    </div>
    </div>
})}

</div>

<div id="invoice" className="bg-white">
      <div style={{background:'#3D3A3A'}} className="flex justify-between invoice-firstdiv px-4">
        <div className="text-3xl font-bold text-purple-700 invoice-logo items-center justify-center"><img src="https://res.cloudinary.com/dbjwbveqn/image/upload/v1703879452/image_15-removebg-preview_1_ucf6sl.png"/></div>
        <div style={{height:'70%'}} className='flex flex-col items-center justify-center' >
          <div className="text-2xl font-bold text-white">INVOICE</div>
          <div className='text-white'>Invoice No. {invoiceSubscription?.invoiceid}</div>
        </div>
      </div>
  <div style={{fontSize:'clamp(1rem,3vw,1.3rem)'}} className='flex flex-row justify-between px-4'>
  <div className="mt-8">
        <div className="font-extrabold">INVOICE TO:</div>
        <div className="font-extrabold">{invoiceSubscription?.subscriber?.username}</div>
        
      </div>
      <div  className="mt-8 flex flex-col items-end justify-center">
        <div className="font-bold">Order Number# {invoiceSubscription?.subid}</div>
        <div className='flex justify-end items-end'>{formatDate(invoiceSubscription?.createdAt)}</div>
      </div>
  </div>
      <div className="mt-8 invoice-firsttable px-4">
        <table className="w-full">
          <thead>
            <tr>
            <th className="text-left p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Name</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Price</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Incl. VAT</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Qty</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Discount</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>VAT</th>
              <th className="text-right p-2" style={{ backgroundColor: '#3D3A3A', color: '#FFFFFF' }}>Total Incl. VAT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Subscription to {invoiceSubscription?.creator?.name} from {formatDateWithSlash(invoiceSubscription?.createdAt)} to {formatDateWithSlash(invoiceSubscription?.expiray)}</td>
              <td className="text-right">{invoiceSubscription?.price}€</td>
              <td className="text-right">{invoiceSubscription?.price*0.3}€</td>
              <td className="text-right">1</td>
              <td className="text-right">-</td>
              <td className="text-right">{invoiceSubscription?.price}€ 30%</td>
              <td className="text-right">{invoiceSubscription?.price+(invoiceSubscription?.price*0.3)}€</td>
            </tr>
          </tbody>
        </table>
      </div>
   <div className='flex items-center justify-center'>
   <div className='invoice-borders px-4'>

</div>
   </div>
      <div  className="flex justify-between items-center mt-8 px-4">
        <div style={{fontSize:'clamp(1rem,3vw,1.2rem)'}}>
          <div className="font-extrabold">Payment Information</div>
          <div>Card</div>
          <div>
            In case of Subscription, the User's payment method will be debited
            again at each renewal of the Subscription
          </div>
          <div>
            All orders are subject to CARMEN's terms & conditions:
            https://abc.com
          </div>
        </div>
        <div style={{fontSize:'clamp(1rem,3vw,1.3rem)'}} className="text-right flex flex-col items-end justify-end">
      <div className='flex flex-row space-x-3 font-extrabold'>
      <div className='font-bolder flex flex-col items-start justify-start'>
          <p className="font-extrabold">TOTAL EXCL. VAT</p>
          <p className="font-extrabold">VAT</p>
          </div>
          <div className='font-bolder'><p className="font-extrabold">{invoiceSubscription?.price+(invoiceSubscription?.price*0.3)}€</p><p className="font-extrabold">1€</p></div>
      </div>
          <div className='invoice-tabletwo' style={{background:'#3D3A3A',color:'white',marginTop:'1rem'}}>TOTAL INCL. VAT {invoiceSubscription?.price+(invoiceSubscription?.price*0.3)}€</div>
        </div>
      </div>
      <div className="text-center mt-8">
        
      </div>
      <div className='invoice-footer'>
<p>AIR MEDIAS (RCS Lyon B 809 565 906) SAS with a capital of 507.800 euros - 16 RUE CUVIER, 69006 LYON - intracommunity VAT number FR90809565906 - SIRET 80956590600033</p>
      </div>
    </div>

        </div>
    )
}


export default Purcasehistorycontent;