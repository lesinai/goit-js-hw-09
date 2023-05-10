import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import {Notify} from 'notiflix';

// Instances
const refs = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    timerDays: document.querySelector('span[data-days]'),
    timerHours: document.querySelector('span[data-hours]'), timerMinutes: document.querySelector('span[data-minutes]'), timerSeconds: document.querySelector('span[data-seconds]'),
};
refs.btnStart.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const todayDate = options.defaultDate;
        const selectedDate = selectedDates[0];
        const deltaDates = selectedDate - todayDate;
        deltaDates < 0 ? Notify.failure('Please choose a date in the future') : refs.btnStart.disabled = false;
    },
};
const calendar = flatpickr(refs.input, options);

// Class
class Timer {
    constructor({ countdownInterface }) {
        this.intervalId = null;
        this.countdownInterface = countdownInterface;
    }
    start() {
        refs.btnStart.disabled = true;
        const finalSelectedDate = calendar.selectedDates[0];
        const finalSelectedDateInSecs = finalSelectedDate.getTime();
        this.intervalId = setInterval(() => {
            const todayDate = Date.now();
            const deltaDates = finalSelectedDate - todayDate;
            const convertedDate = this.convertMs(deltaDates); this.countdownInterface(convertedDate);
            
            const todayDate2 = Date.now();
            if (finalSelectedDateInSecs <= todayDate2) {
                this.stop()
            };
        }, 1000);
    }
    stop() {
        clearInterval(this.intervalId);
        refs.btnStart.disabled = false;
        const convertedDate = this.convertMs(0);
        this.countdownInterface(convertedDate);
    }
    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        // Remaining days
        const days = this.addLeadingZero(Math.floor(ms / day));
        // Remaining hours
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
        return { days, hours, minutes, seconds };
    }
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
};

// Our timer!!!
const timer = new Timer({
    countdownInterface: updateTimerInterface,
});

// Add listener
refs.btnStart.addEventListener('click', timer.start.bind(timer));

// Update interface
function updateTimerInterface({ days, hours, minutes, seconds }) {
    refs.timerDays.textContent = `${days}`;
    refs.timerHours.textContent = `${hours}`;
    refs.timerMinutes.textContent = `${minutes}`;
    refs.timerSeconds.textContent = `${seconds}`;
};