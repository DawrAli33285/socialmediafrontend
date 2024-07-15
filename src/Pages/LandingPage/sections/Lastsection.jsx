import React from "react";

const Lastsection=()=>{
React.useEffect(()=>{
    togglefaqbtn();
},[])
const togglefaqbtn=()=>{
let path=document.querySelectorAll('.path-faq-svgpath')
let svg=document.querySelectorAll('.path-faq-svg')
for(let i=0;i<svg.length;i++){
let clicked=false;
svg[i].addEventListener('click',function(e){
    clicked=!clicked;

        e.preventDefault();
let faqdiv=document.querySelector('.landing-page-faq-content')

      if(clicked==true){
    
    path[i].setAttribute('d','M7.01068 17.5326V14.9021H25.4238V17.5326H7.01068Z')
    console.log("children")
    console.log(faqdiv.children[i])
faqdiv.children[i].classList.add('togglefaq')
   document.querySelectorAll('.faq-question')[i].style.display="flex" 
}else{
    faqdiv.children[i].classList.remove('togglefaq')
    document.querySelectorAll('.faq-question')[i].style.display="none" 
    path[i].setAttribute('d','M25.3336 16.1016V16.7682C25.3336 17.1364 25.0352 17.4349 24.667 17.4349H17.0003V25.1016C17.0003 25.4697 16.7018 25.7682 16.3336 25.7682H15.667C15.2988 25.7682 15.0003 25.4697 15.0003 25.1016V17.4349H7.33366C6.96547 17.4349 6.66699 17.1364 6.66699 16.7682V16.1016C6.66699 15.7334 6.96547 15.4349 7.33366 15.4349H15.0003V7.76822C15.0003 7.40003 15.2988 7.10156 15.667 7.10156H16.3336C16.7018 7.10156 17.0003 7.40003 17.0003 7.76822V15.4349H24.667C25.0352 15.4349 25.3336 15.7334 25.3336 16.1016Z')
}

    })
}
}


    return(
        <div className="lastsection-div flex flex-col justify-center items-center">
        <h2>La seule plateforme qui offre de véritables connexions</h2>
        <p>Abonnez vous directement à votre créateur préféré et valorisez son contenu qui vous est proposé en exclusivité.</p>
       <button>Inscription</button>
<img src="/images/Group 89.png"></img>

<div className="landing-page-faq">
<div className="landing-page-faq-heading flex flex-row">
<h2 className="flex flex-row space-x-8">FAQ   
</h2>
<p>s</p>
</div>
<div className="landing-page-faq-content flex flex-col">
<div className="flex flex-row">
<div className="flex flex-col justify-center items-center faq-content-text">
<div className="flex flex-row items-center">

<p>Qu'est-ce que CARMEN ?</p>
<svg  className="path-faq-svg cursor-pointer"  width="22" height="22" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className="path-faq-svgpath" d="M25.3336 16.1016V16.7682C25.3336 17.1364 25.0352 17.4349 24.667 17.4349H17.0003V25.1016C17.0003 25.4697 16.7018 25.7682 16.3336 25.7682H15.667C15.2988 25.7682 15.0003 25.4697 15.0003 25.1016V17.4349H7.33366C6.96547 17.4349 6.66699 17.1364 6.66699 16.7682V16.1016C6.66699 15.7334 6.96547 15.4349 7.33366 15.4349H15.0003V7.76822C15.0003 7.40003 15.2988 7.10156 15.667 7.10156H16.3336C16.7018 7.10156 17.0003 7.40003 17.0003 7.76822V15.4349H24.667C25.0352 15.4349 25.3336 15.7334 25.3336 16.1016Z" fill="#B4E4FF"/>
</svg>
</div>
<div className="faq-question">
<p>CARMEN offre une expérience en mettant l'accent sur la confidentialité et la sécurité. Notre plate-forme propose également une gamme de fonctionnalités premium, notamment la messagerie privée.</p>
</div>
</div>

</div>
<div className="flex flex-row">
<div className="flex flex-col justify-center items-center faq-content-text">
<div className="flex flex-row items-center">

<p>Qu'est-ce qui différencie CARMEN des autres plateformes de chat ?</p>
<svg className="path-faq-svg cursor-pointer" width="22" height="22" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className="path-faq-svgpath" d="M25.3336 16.1016V16.7682C25.3336 17.1364 25.0352 17.4349 24.667 17.4349H17.0003V25.1016C17.0003 25.4697 16.7018 25.7682 16.3336 25.7682H15.667C15.2988 25.7682 15.0003 25.4697 15.0003 25.1016V17.4349H7.33366C6.96547 17.4349 6.66699 17.1364 6.66699 16.7682V16.1016C6.66699 15.7334 6.96547 15.4349 7.33366 15.4349H15.0003V7.76822C15.0003 7.40003 15.2988 7.10156 15.667 7.10156H16.3336C16.7018 7.10156 17.0003 7.40003 17.0003 7.76822V15.4349H24.667C25.0352 15.4349 25.3336 15.7334 25.3336 16.1016Z" fill="#B4E4FF"/>
</svg>
</div>
<div className="faq-question">
<p>CARMEN offre une expérience en mettant l'accent sur la confidentialité et la sécurité. Notre plate-forme propose également une gamme de fonctionnalités premium, notamment la messagerie privée.</p>
</div>
</div>

</div>
<div className="flex flex-row">
<div className="flex flex-col justify-center items-center faq-content-text">
<div className="flex flex-row items-center">

<p>Est-ce que CARMEN est gratuit ?</p>
<svg className="path-faq-svg cursor-pointer"  width="22" height="22" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className="path-faq-svgpath" d="M25.3336 16.1016V16.7682C25.3336 17.1364 25.0352 17.4349 24.667 17.4349H17.0003V25.1016C17.0003 25.4697 16.7018 25.7682 16.3336 25.7682H15.667C15.2988 25.7682 15.0003 25.4697 15.0003 25.1016V17.4349H7.33366C6.96547 17.4349 6.66699 17.1364 6.66699 16.7682V16.1016C6.66699 15.7334 6.96547 15.4349 7.33366 15.4349H15.0003V7.76822C15.0003 7.40003 15.2988 7.10156 15.667 7.10156H16.3336C16.7018 7.10156 17.0003 7.40003 17.0003 7.76822V15.4349H24.667C25.0352 15.4349 25.3336 15.7334 25.3336 16.1016Z" fill="#B4E4FF"/>
</svg>
</div>
<div className="faq-question">
<p>CARMEN offre une expérience en mettant l'accent sur la confidentialité et la sécurité. Notre plate-forme propose également une gamme de fonctionnalités premium, notamment la messagerie privée.</p>
</div>
</div>

</div>
<div className="flex flex-row">
<div className="flex flex-col justify-center items-center faq-content-text">
<div className="flex flex-row items-center">

<p>Mes informations sont-elles privées sur CARMEN ?</p>
<svg className="path-faq-svg cursor-pointer"  width="22" height="22" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className="path-faq-svgpath" d="M25.3336 16.1016V16.7682C25.3336 17.1364 25.0352 17.4349 24.667 17.4349H17.0003V25.1016C17.0003 25.4697 16.7018 25.7682 16.3336 25.7682H15.667C15.2988 25.7682 15.0003 25.4697 15.0003 25.1016V17.4349H7.33366C6.96547 17.4349 6.66699 17.1364 6.66699 16.7682V16.1016C6.66699 15.7334 6.96547 15.4349 7.33366 15.4349H15.0003V7.76822C15.0003 7.40003 15.2988 7.10156 15.667 7.10156H16.3336C16.7018 7.10156 17.0003 7.40003 17.0003 7.76822V15.4349H24.667C25.0352 15.4349 25.3336 15.7334 25.3336 16.1016Z" fill="#B4E4FF"/>
</svg>
</div>
<div className="faq-question">
<p>CARMEN offre une expérience en mettant l'accent sur la confidentialité et la sécurité. Notre plate-forme propose également une gamme de fonctionnalités premium, notamment la messagerie privée.</p>
</div>
</div>

</div>
<div className="flex flex-row">
<div className="flex flex-col justify-center items-center faq-content-text">
<div className="flex flex-row items-center">

<p>Puis-je utiliser CARMEN sur mon appareil mobile ?</p>
<svg className="path-faq-svg cursor-pointer" width="22" height="22" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className="path-faq-svgpath" d="M25.3336 16.1016V16.7682C25.3336 17.1364 25.0352 17.4349 24.667 17.4349H17.0003V25.1016C17.0003 25.4697 16.7018 25.7682 16.3336 25.7682H15.667C15.2988 25.7682 15.0003 25.4697 15.0003 25.1016V17.4349H7.33366C6.96547 17.4349 6.66699 17.1364 6.66699 16.7682V16.1016C6.66699 15.7334 6.96547 15.4349 7.33366 15.4349H15.0003V7.76822C15.0003 7.40003 15.2988 7.10156 15.667 7.10156H16.3336C16.7018 7.10156 17.0003 7.40003 17.0003 7.76822V15.4349H24.667C25.0352 15.4349 25.3336 15.7334 25.3336 16.1016Z" fill="#B4E4FF"/>
</svg>
</div>
<div className="faq-question">
<p>CARMEN offre une expérience en mettant l'accent sur la confidentialité et la sécurité. Notre plate-forme propose également une gamme de fonctionnalités premium, notamment la messagerie privée.</p>
</div>
</div>

</div>
<p id="faq-text">Si vous avez d'autres questions, n'hésitez pas à contacter notre équipe d'assistance.</p>
</div>

</div>

        </div>
    )
}
export default Lastsection;