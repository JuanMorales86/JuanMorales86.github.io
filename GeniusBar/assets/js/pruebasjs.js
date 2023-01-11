const swiper3 = new Swiper(".swiper-sec", {
  // Optional parameters

//   slidesPerView: "auto",
//   spaceBetween:15,
//   slidesPerGroupAuto:true,

  direction: "horizontal",
  loop: true,
  allowTouchMove:true,
  effect:"slide",
  autoHeight:true,//este sirve para que se suba o baje automatico
  //height:100,
  autoplay:{
    delay:1000,
    pauseOnMouseEnter:true,
    disableOnInteraction:false,
  },
  grabCursor:true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type:'bullets',
    // type:'progressbar',
    clickable:true,//para que clickeen en los ciculitos
    dynamicBullets:true,
},

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
//   scrollbar: {
//     el: ".swiper-scrollbar",
//     draggable:true,
//   },
});
