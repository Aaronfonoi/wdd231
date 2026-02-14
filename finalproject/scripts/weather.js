// Select HTML elements in the document
const weatherLocal = document.querySelector('#town');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#description');
const weatherTemp = document.querySelector('#temperature');

// Create required variables for the URL
const myKey = "ef3335b5e590d5dc88d205a0392ae208"; // API key
const myLat = "48.47";
const myLong = "-122.33";


const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// To grab the current weather data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// DISPLAY THE JSON DATA ONTO MY WEB PAGE
function displayResults(data) {
    weatherLocal.innerHTML = data.name;
    weatherDesc.innerHTML = data.weather[0].description;
    weatherTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`; // Display in Fahrenheit to match forecast
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
}

apiFetch();

// Select HTML elements for forecast
const forecastTown = document.querySelector('#forecast-town');
const forecastTempToday = document.querySelector('#forecast-temp-today');
const forecastTempNext = document.querySelector('#forecast-temp-next');
const forecastTempAfter = document.querySelector('#forecast-temp-after');
const dayNameNext = document.querySelector('#day-name-next span:first-child');
const dayNameAfter = document.querySelector('#day-name-after span:first-child');

// Forecast API URL
const forecastUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// Fetch weather forecast data
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data); // Call function to display data
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to get day name from a Date object
function getDayName(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

// DISPLAY FORECAST DATA ONTO THE WEB PAGE
function displayForecast(data) {
    // Display town name
    forecastTown.innerHTML = data.city.name;

    // Group forecast data by day
    const dailyForecasts = groupForecastsByDay(data.list);

    // Get the next 3 days (including today if it's not too late, otherwise start from tomorrow)
    const today = new Date();
    const currentHour = today.getHours();

    let startIndex = 0;
    // If it's after 6 PM, start showing tomorrow's forecast as "today"
    if (currentHour >= 18) {
        startIndex = 1;
    }

    const forecastsToShow = dailyForecasts.slice(startIndex, startIndex + 3);

    // Display today's forecast (or tomorrow's if late in the day)
    if (forecastsToShow[0]) {
        const todayData = forecastsToShow[0];
        forecastTempToday.innerHTML = `${Math.round(todayData.avgTemp)}&deg;F`;
    }

    // Display next day forecast
    if (forecastsToShow[1]) {
        const nextDayData = forecastsToShow[1];
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + (startIndex + 1));

        dayNameNext.innerHTML = `${getDayName(nextDay)}:`;
        forecastTempNext.innerHTML = `${Math.round(nextDayData.avgTemp)}&deg;F`;
    }

    // Display day after next forecast
    if (forecastsToShow[2]) {
        const dayAfterData = forecastsToShow[2];
        const dayAfter = new Date(today);
        dayAfter.setDate(today.getDate() + (startIndex + 2));

        dayNameAfter.innerHTML = `${getDayName(dayAfter)}:`;
        forecastTempAfter.innerHTML = `${Math.round(dayAfterData.avgTemp)}&deg;F`;
    }
}

// Function to group forecast data by day and calculate daily averages
function groupForecastsByDay(forecastList) {
    const dailyData = {};

    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();

        if (!dailyData[dayKey]) {
            dailyData[dayKey] = {
                temps: [],
                date: date
            };
        }

        dailyData[dayKey].temps.push(item.main.temp);
    });

    // Convert to array and calculate averages
    return Object.values(dailyData).map(day => ({
        date: day.date,
        avgTemp: day.temps.reduce((sum, temp) => sum + temp, 0) / day.temps.length
    })).sort((a, b) => a.date - b.date);
}

// Call the forecast API function
fetchForecast();