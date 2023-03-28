// Imports
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Variables
let choosenDate = null;
let endDate = null;
// Object
const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  fieldDiv: document.querySelectorAll('.field'),
  timer: document.querySelector('.timer'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      choosenDate = selectedDates[0];
      refs.startBtn.disabled = false;
      Notify.success('Thank you, timer accepted date');
    }
  },
};

// Styles
refs.startBtn.disabled = true;

const styleTimerDiv = () => {
  refs.timer.style.display = 'flex';
  refs.timer.style.gap = 10 + 'px';

  refs.fieldDiv.forEach(element => {
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
    element.style.alignItems = 'center';
  });
};

//  functions
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const { days, hours, minutes, seconds } = value;
  refs.days.textContent = `${days.toString().padStart(2, '0')}`;
  refs.hours.textContent = `${hours.toString().padStart(2, '0')}`;
  refs.minutes.textContent = `${minutes.toString().padStart(2, '0')}`;
  refs.seconds.textContent = `${seconds.toString().padStart(2, '0')}`;
}

function onClickStartBtn() {
  refs.startBtn.disabled = true;
  refs.inputEl.disabled = true;
  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    endDate = choosenDate - currentDate;
    const leftTime = convertMs(endDate);
    addLeadingZero(leftTime);

    if (endDate <= 1000) {
      clearInterval(intervalId);
      refs.inputEl.disabled = false;
    }
  }, 1000);
}

// return
styleTimerDiv();
flatpickr(refs.inputEl, options);
refs.startBtn.addEventListener('click', onClickStartBtn);