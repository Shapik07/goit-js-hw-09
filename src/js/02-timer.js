import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('input'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: 'today',
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    checkValidateDate();
  },
};

flatpickr('#datetime-picker', options);

let selectedDate = null;

refs.startBtn.addEventListener('click', startTimer);
refs.startBtn.setAttribute('disabled', true);

function checkValidateDate() {
  let currentDate = options.defaultDate;

  refs.startBtn.setAttribute('disabled', true);

  if (currentDate > selectedDate) {
    Notify.failure('Please choose a date in the future');
    return;
  }

  refs.startBtn.removeAttribute('disabled');
}

function startTimer() {
  intervalId = setInterval(() => {
    let timeDiff = selectedDate - Date.now();
    const finishTime = convertMs(timeDiff);

    startCountdown(timeDiff);

    refs.days.textContent = finishTime.days;
    refs.hours.textContent = finishTime.hours;
    refs.minutes.textContent = finishTime.minutes;
    refs.seconds.textContent = finishTime.seconds;
  }, 1000);
}

function startCountdown(timeDiff) {
  if (timeDiff < 900) {
    stopCountdown();
  }
}

function stopCountdown() {
  clearInterval(intervalId);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
