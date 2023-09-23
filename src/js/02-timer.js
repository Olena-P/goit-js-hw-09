import flatpickr from 'flatpickr';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;
let targetDate;

function updateTimer() {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    clearInterval(countdownInterval);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    startButton.disabled = true;
    alert('Time is up!');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(difference);
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

document.addEventListener('DOMContentLoaded', () => {
  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onClose: function (selectedDates) {
      const selectedDate = new Date(selectedDates[0]);
      const now = new Date();

      if (selectedDate <= now) {
        alert('Please choose a date in the future.');
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
        targetDate = selectedDate;
      }
    },
  });

  startButton.addEventListener('click', () => {
    countdownInterval = setInterval(updateTimer, 1000);
  });
});
