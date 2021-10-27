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


  // Countdown Start
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;

  const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    }
  };

  const TIME_LIMIT = 60;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let timerInterval = null;
  let remainingPathColor = COLOR_CODES.info.color;

  document.getElementById("countdown").innerHTML = `
<div class="countdown">
  <svg class="countdown__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="countdown__circle">
      <circle class="countdown__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="countdown-path-remaining"
        stroke-dasharray="283"
        class="countdown__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="countdown-label" class="countdown__label text text_rubik text_medium text_fsm-36">${formatTime(
    timeLeft
  )}</span>
</div>
`;

  startTimer();

  function onTimesUp() {
    clearInterval(timerInterval);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("countdown-label").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
  }

  function formatTime(time) {
    return `${time} сек`;
  }

  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("countdown-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("countdown-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("countdown-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("countdown-path-remaining")
        .classList.add(warning.color);
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("countdown-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
  // Countdown End
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
