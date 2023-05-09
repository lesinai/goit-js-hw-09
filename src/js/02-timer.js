import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const btnStartref = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

btnStartref.addEventListener('click', onBtnStartClick, { once: true} );



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (new Date() > selectedDates[0]) { alert('Please choose a date in the future'); }
        btnStartref.removeAttribute('disabled');
        },
};

const datePicker = flatpickr("#datetime-picker", options);


function onBtnStartClick() {
    const timeDiference = datePicker.selectedDates[0] - Date.now();

    const startInterval = setInterval(() => {
     const { days, hours, minutes, seconds } = convertMs(datePicker.selectedDates[0] - Date.now());
        spanDays.textContent = addLeadingZero(days);
        spanHours.textContent = addLeadingZero(hours);
        spanMinutes.textContent = addLeadingZero(minutes);
        spanSeconds.textContent = addLeadingZero(seconds);
    }, 1000);

    setTimeout(() => { clearInterval(startInterval) }, timeDiference)
}
   
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
    return String(value).padStart(2, '0');
}