const swiper2 = new Swiper('.swiper2', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    effect:'coverflow',
    // autoplay:true,
    autoplay:{
      delay:1000,
      pauseOnMouseEnter:true,
      disableOnInteraction:false,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
  
  });