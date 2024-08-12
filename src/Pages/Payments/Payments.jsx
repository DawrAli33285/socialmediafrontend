import { Link, useLocation,useNavigate } from 'react-router-dom';
import React from 'react';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr'
import "./payments.css"
import { useContext } from 'react';
import {store} from '../../redux/store/store'
import socketContext from '../../context/Socketcontext';
import { useDispatch } from 'react-redux';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
  } from '@stripe/react-stripe-js';
import {subscription,reserveCall} from '../../redux/slices/subscription';
  
const Payments = () => {

  const dispatch=useDispatch();
    const [conditionChecked,setConditionChecked]=React.useState(false)
    const stripe = useStripe();
    const [forceRender, setForceRender] = React.useState(0);
    const socketcontext=useContext(socketContext)
    const navigate=useNavigate();
    const location=useLocation();
    const elements = useElements();
  // React.useEffect(()=>{
  //   if (!socketContext) {
  //     // Force a re-render
  //     setForceRender(prev => prev + 1);
  //     return;
  // }

  // },[])

  React.useEffect(()=>{
const search=location.search
const params=new URLSearchParams(search)
const creatorid=params.get('id')
const creatorname=params.get('name')
const date=params.get('date')
const time=params.get('time')

const price=params.get('price')
setState({
    ...state,
    creatorid,
    creatorname,
    price,
    date,
    time
})
  },[])
  
    const handleSubmit = async (event) => {
        event.preventDefault();
  
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
            return;
          }
      
          const cardElement = elements.getElement(CardNumberElement);
   if(conditionChecked==true){
       
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      
if (error) {
   toastr.error(error)
  } else {
    console.log('[PaymentMethod]', paymentMethod);
    setState({
     ...state,
     paymentMethod:paymentMethod.id
    })
    let subdata={
      creatorid:state.creatorid,
      creatorname:state.creatorname,
      expiray:state.expiray,
      paymentMethod:paymentMethod.id,
      price:state.price,
      promo:state.promo,
      date:state.date,
      time:state.time
    }
    console.log('state')
    console.log(subdata)
 let res=await dispatch(reserveCall(subdata))
    // You can now use the paymentMethod.id to create a charge or a customer
  if(reserveCall.rejected.match(res)){
    toastr.error(res?.payload?.error)
 
  }
  let notificationreason=`You have just reserved a call with ${subdata.creatorname}`
  let socketnotification={
    creator:{
      _id:subdata.creatorid,
      name:subdata.creatorname
    },
    reason:notificationreason,
    user:store.getState().authenticationslices?.user?.user._id,
    createdAt:new Date().toISOString()
  }
  if(reserveCall.fulfilled.match(res)){
    toastr.success("sucess")
    console.log('socketcontext')
    console.log(socketcontext?.current)
    socketcontext?.current?.emit('socketnotification',socketnotification)
   navigate(`/chat?creator=${state.creatorid}&name=${state.creatorname}`)

    // const {paymentIntent, error} = await stripe.confirmCardPayment(
    //   `${res.payload.data.client_secret}`,
    //   {
      
    //   },
    // );



    

  }
  }
   }else{
    toastr.error("Please accept the conditions")
   }
      };
      const ELEMENT_OPTIONS = {
        style: {
          base: {
            color: "#fff",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#aab7c4"
            },
            border: 'none', // Removes the border
            outline: 'none', // Removes the outline
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        }
      };
    const [state,setState]=React.useState({
        price:'',
        creatorname:'',
        creatorid:'',
        expiray:'',
        paymentMethod:'',
        promo:'',
        date:'',
        time:''
    
    })
    const handleInputChange = (e) => {
        let { value } = e.target;
    
        // Remove all non-digit characters
        const numbersOnly = value.replace(/[^\d]/g, '');
    
        // Split the numbers into MM and YY parts
        let month = '';
        let year = '';
    
        if (numbersOnly.length >= 2) {
          month = numbersOnly.slice(0, 2);
          year = numbersOnly.slice(2, 4);
    
          // Ensure month is between 01 and 12
          const monthNum = parseInt(month, 10);
          if (monthNum < 1) {
            month = '01';
          } else if (monthNum > 12) {
            month = '12';
          }
        } else {
          month = numbersOnly;
        }
    
        // Combine the MM and YY parts with a slash
        let newInputValue = month;
        if (year.length > 0) {
          newInputValue += `/${year}`;
        }
    
        // Update the value of the input field
        e.target.value = newInputValue;
    setState({
        ...state,
        expiray:e.target.value
    })
    };
    return (
    <div className='payments-div'>
          <div className='payments-logo'>
<img src="https://res.cloudinary.com/dbjwbveqn/image/upload/v1703879452/image_15-removebg-preview_1_ucf6sl.png"/>
      </div>
      <div style={{padding:'1rem'}} className='flex flex-row space-x-3'>
<Link to={`/schedule?id=${state.creatorid}&name=${state.creatorname}`}>

<svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.66046 20.9999C9.41322 21.0007 9.16894 20.9512 8.94557 20.8552C8.72219 20.7591 8.52539 20.619 8.36964 20.4449L0.37647 11.4458C0.133064 11.1774 0 10.8408 0 10.4934C0 10.146 0.133064 9.80935 0.37647 9.54098L8.65097 0.541827C8.93187 0.235531 9.33552 0.0429128 9.77312 0.00634665C10.2107 -0.0302195 10.6464 0.0922618 10.9844 0.346846C11.3223 0.601429 11.5349 0.967262 11.5752 1.36386C11.6156 1.76047 11.4804 2.15535 11.1995 2.46165L3.80211 10.5009L10.9513 18.5401C11.1536 18.7603 11.2822 19.0284 11.3217 19.3127C11.3612 19.597 11.3101 19.8856 11.1743 20.1443C11.0385 20.4031 10.8237 20.6212 10.5555 20.7728C10.2872 20.9244 9.9766 21.0032 9.66046 20.9999Z" fill="white"/>
</svg>
</Link>
<p>
Retour
</p>
      </div>
      <div className='flex flex-row payments-center-div'>
      <svg width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.75 12.25V8.75C22.75 3.85 18.9 0 14 0C9.1 0 5.25 3.85 5.25 8.75V12.25C2.275 12.25 0 14.525 0 17.5V29.75C0 32.725 2.275 35 5.25 35H22.75C25.725 35 28 32.725 28 29.75V17.5C28 14.525 25.725 12.25 22.75 12.25ZM8.75 8.75C8.75 5.775 11.025 3.5 14 3.5C16.975 3.5 19.25 5.775 19.25 8.75V12.25H8.75V8.75ZM15.75 26.25C15.75 27.3 15.05 28 14 28C12.95 28 12.25 27.3 12.25 26.25V21C12.25 19.95 12.95 19.25 14 19.25C15.05 19.25 15.75 19.95 15.75 21V26.25Z" fill="#8CC8FF"/>
</svg>
<p>
100% sécurisé
</p>
      </div>
      <div className='payments-center-div'>
        <p className='my-2'>
        réservation d'appel  {state?.creatorname}
        </p>
      </div>
        <div className="min-h-screen  flex items-center justify-center">

          <div className="payments-form p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="mb-4">
             <p>
             RECAPITULATIF
             </p>
            </div>
    
            <div className="mb-4">
              <div className="flex justify-between monthly-sub-status items-center">
                <span className="text-gray-600">réservation d'appel mensuel {state?.creatorname}</span>
                <span className="text-gray-600">{state.price}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-white">TVA incluse</span>
                <span className="text-sm text-white">{(parseFloat(state.price)*20)/100}€</span>
              </div>
            </div>
    
            <div className="mb-6">
           <p className='font-semibold'>
           Ajouter un code promo (facultatif)
        
           </p>
           <div className="mb-4">
  <label htmlFor="promoCode" className="block text-sm font-medium text-white">
    Code promo
  </label>
  <div className="relative">
    <input
      id="promoCode"
      name='promo'
      value={state.promo}
      onChange={(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
      }}
      className="block w-full pl-3 pr-16 py-2 text-sm border rounded shadow-sm focus:outline-none"
      placeholder="EX. CA1423"
      type="text"
    />
    <button
    style={{width:'5rem',left:'80%',borderRadius:'30px'}}
      type="button"
      className="absolute inset-y-0 right-0 px-4 text-sm text-white bg-blue-500 rounded-r hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
    >
      Apply
    </button>
  </div>
</div>
            </div>
    
        
            {/* ... more inputs for card number, expiration date, etc ... */}
            <div className="mb-6">
         
            <p>
            Numero de carte bancaire
           </p>
            <div className='stripe-input-div'>
            <CardNumberElement options={ELEMENT_OPTIONS}/>
            </div>
            </div>
           
            <div className="mb-6">
           <p>
           Cryptogramme
           </p>
              <div  className='stripe-input-div'>

             <CardCvcElement options={ELEMENT_OPTIONS}></CardCvcElement>
              </div>
            </div>
            <div className="mb-6">
           <p>
           Card expirey
           </p>
              <div  className='stripe-input-div'>
             <CardExpiryElement options={ELEMENT_OPTIONS}/>

              </div>
            </div>
            <div className='flex flex-row space-x-2'>
<input checked={conditionChecked} onChange={(e)=>{
    setConditionChecked(e.target.checked)
}} type="checkbox">

</input>
<p className='text-xs'>
En finalisant mon règlement, j'atteste mon accord avec les CGV et renonce à tout recours au droit de rétractation
</p>
            </div>
            <div className="flex items-center mt-6 justify-center items-center">
              <button  onClick={handleSubmit} style={{width:'40%',borderRadius:'30px'}} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline">
                Payer
              </button>
            </div>
            <p className='text-xs text-center my-3'>
            réservation d'appel mensuel de {state.price} / mois - annulable a tout moment
            </p>
            <p className='text-xs text-center my-5'>
            Besoin d’aide ? Nous sommes à votre disposition <span style={{color:'#8CC8FF'}} className='cursor-pointer'>Aide et Support</span>
            </p>
          </div>
        </div>
                </div>
      );
    };
    
export default Payments;
