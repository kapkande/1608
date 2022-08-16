const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
let i = 0



let greetingTranslation = {
    'en-EN': ['Good morning', 'Good afternoon', ' Good evening', 'Good night', 'Humidity', 'Wind speed'],
    'ru-RU': ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Доброй ночи', 'Влажность', 'Скорость ветра']
}


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);

}
showTime();

function showDate(Language) {
    const dateNew = new Date();
    const options = { month: 'long', day: 'numeric', weekday: 'long' };
    const currentDate = dateNew.toLocaleDateString(Language, options);
    date.textContent = currentDate;
}


function showGreeting(Language) {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 6 && hours < 12) {
        greeting.textContent = greetingTranslation[Language][0];
    } else
    if (hours >= 12 && hours < 18) {
        greeting.textContent = greetingTranslation[Language][1];
    } else if (hours >= 18 && hours < 24) {
        greeting.textContent = greetingTranslation[Language][2];
    } else if (hours >= 0 && hours < 6) {
        greeting.textContent = greetingTranslation[Language][3];
    }


    //     с 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы
    //     с 12:00 до 17:59 - Good afternoon / Добрый день / Добры дзень
    //     с 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар
    //     с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач
}

const body = document.querySelector('.body');
const randomNum = Math.floor(Math.random() * (20 - 1)) + 1
let currentNumbar = randomNum
showI()


function showI(i) {
    if (i == 'minus') {
        currentNumbar--
    } else if (i == 'plas') {
        currentNumbar++
    }
    if (currentNumbar > 20) {
        currentNumbar = 1
    } else if (1 > currentNumbar) {
        currentNumbar = 20
    }


    console.log(currentNumbar);
    setBg(currentNumbar)
}


function setBg(currentNumbar) {


    let date = new Date();
    let hours = date.getHours();
    let currentTime
    if (hours >= 6 && hours < 12) {
        currentTime = 'morning'
    } else
    if (hours >= 12 && hours < 18) {
        currentTime = 'afternoon'
    } else if (hours >= 18 && hours < 24) {
        currentTime = 'evening'

    } else if (hours >= 0 && hours < 6) {
        currentTime = 'night'
    }



    // console.log(i + ' i');
    const img = new Image();
    img.src = '/assets/img/bg.jpg'
    img.onload = () => {
        body.style.backgroundImage = `url("https://kapkande.github.io/stage1-tasks/images/${currentTime}/${String(currentNumbar).padStart(2, "0")}.jpg")`
    };
}
const onSlideNext = document.querySelector('.slide-next')
onSlideNext.addEventListener('click', (event) => {
    showI('plas')
})
const onSlidePrev = document.querySelector('.slide-prev')
onSlidePrev.addEventListener('click', (event) => {
    showI('minus')
})





const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
const weatherDescription = document.querySelector('.weather-description');
// const onSity = document.querySelector('.city').addEventListener('change', setLocalStorage);
const onCity = document.querySelector('.city').addEventListener('change', getWeather);
// const onСhangeCity = document.querySelector('.city').addEventListener('change', getLocalStorage);
let cityValue




function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);

}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name') || localStorage.getItem('city')) {
        name.value = localStorage.getItem('name');
        city.value = localStorage.getItem('city');
        console.log(city.value);
        getWeather()
    }
}
window.addEventListener('load', getLocalStorage)




async function getWeather() {

    let arrLanguage = LanguageNaw.split('-')
    if (city.value == '') {
        city.value = 'Минск'
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${arrLanguage[0]}&appid=637b173f7c89ce0915cf9413b46f3cbf&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.statusText == 'Not Found') {
        alert('error')
        city.value = 'Минск'
        getWeather()
    }
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = greetingTranslation[LanguageNaw][4] + ' : ' + data.main.humidity + '%';
    wind.textContent = greetingTranslation[LanguageNaw][5] + ' : ' + Math.round(data.wind.speed) + ' m/s';

}
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');


const onQuotes = document.querySelector('.change-quote').addEventListener('click', (event) => {
    getQuotes()
})
async function getQuotes() {
    let Lan
    if (LanguageNaw == 'ru-RU') {
        Lan = 'dataRu.json'
    } else if (LanguageNaw == 'en-EN') {
        Lan = 'dataEn.json'
    }
    let randomNum = Math.floor(Math.random() * (50 - 1)) + 1
    const quotes = `../js/${Lan}`;
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data[randomNum].text
    author.textContent = data[randomNum].author
}






//


let LanguageNaw
const Language = document.querySelector('.Language')
const onClikLanguage = document.querySelector('.Language').addEventListener('click', getLanguage);

function getLanguage() {

    if (Language.textContent == 'RU') {
        Language.textContent = 'EN'
        LanguageNaw = 'en-EN'

    } else if (Language.textContent == 'EN') {
        Language.textContent = 'RU'
        LanguageNaw = 'ru-RU'
    }

    console.log(LanguageNaw);

    showDate(LanguageNaw)
    showGreeting(LanguageNaw)
    getWeather(LanguageNaw)
    getQuotes(LanguageNaw);
}
getLanguage()

// const enterLabel = (even) => {
//     const target = even.target;
//     const isBTMPlat = ['play player-icon'].includes(target.className);


// }

// const enterLabel = document.querySelector('.todo__input').addEventListener('click', onMenuClick);