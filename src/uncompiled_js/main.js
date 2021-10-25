$(function () {
  $('html').addClass('js');

  initializeRanges();

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


const initializeRanges = () => {
  $('.range').each(function () {
    recalculateRangeValue(this);
  });

  $('.range').on('input', function () {
    recalculateRangeValue(this);
  });
};

const recalculateRangeValue = (range) => {
  const min = range.min;
  const max = range.max - min;
  const current = range.value - min;
  const percentage = current * 100 / max;
  const output = $(range).parents('.calculator__label-box').find('.input.bold');

  $(range).css('background', `linear-gradient(90deg, #59AEFF, #59AEFF, #59AEFF ${percentage}%, transparent ${percentage}%, transparent 100%)`);
  output.val(`${range.value} ${output.data().symbol}`);
}

