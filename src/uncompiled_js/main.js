$(function () {
  $('html').addClass('js');

  new Swiper('.swiper.swiper_paginate-dots', {
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
    },
  });
  
  new Swiper('.swiper.swiper_paginate-fraction', {
    pagination: {
      el: '.swiper-pagination',
      type: "fraction",
      formatFractionCurrent: function (number) {
        return ('0' + number).slice(-2);
      },
      formatFractionTotal: function (number) {
          return ('0' + number).slice(-2);
      },
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});
