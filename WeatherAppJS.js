let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchbutton");
const weatherForecastEl = document.getElementById('weather-forecast');

searchButton.addEventListener('click',(e)=>
{

    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';

});

const getWeather=async (city)=>
{

    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e6564a138613b3c93c77593131546de7`,
        {mode: 'cors'}
        );

        const weatherData= await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);


        if(id<300 && id>200)
        {
            tempicon.src="./icon/storm.png"
        }
        else if(id<400 && id>300)
        {
            tempicon.src="./icon/clouds.png"
        }
        else if(id<600 && id>500)
        {
            tempicon.src="./icon/raining.png"
        }
        else if(id<700 && id>600)
        {
            tempicon.src="./icon/snow.png"
        }
        else if(id<800 && id>700)
        {
            tempicon.src="./icon/clouds.png"
        }
        else if(id==800)
        {
            tempicon.src="./icon/clear.png"
        }



    }


    catch(error)
    {
        alert('city not found');
    }

};

window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {


            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e6564a138613b3c93c77593131546de7`

            fetch(api).then((response) => {

                return response.json();

            })


                .then(data => {

                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);

                    if (id < 300 && id > 200) {
                        tempicon.src = "./icon/storm.png"
                    }
                    else if (id < 400 && id > 300) {
                        tempicon.src = "./icon/clouds.png"
                    }
                    else if (id < 600 && id > 500) {
                        tempicon.src = "./icon/raining.png"
                    }
                    else if (id < 700 && id > 600) {
                        tempicon.src = "./icon/snow.png"
                    }
                    else if (id < 800 && id > 700) {
                        tempicon.src = "./icon/clouds.png"
                    }
                    else if (id == 800) {
                        tempicon.src = "./icon/clear.png"
                    }




                    console.log(data);


                })

        }
        )
    }
})

// let otherDayForcast = ''
// data.daily.forEach((day,idx) => {

//     if(idx == 0){

//     }
//     else{
//         otherDayForcast += `
//         <div class="weather-forecast-item">
//                 <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
//                 <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="weather-icon">
//                 <div class="temp">Night - ${day.temp.night}&#176; C </div>
//                 <div class="temp">Day - ${day.temp.day}&#176; C</div>
//             </div>
//         `
//     }

// });



// --------------------------------------------------------------------------------------------------------------------





// const timeEl = document.getElementById('time');
// const dateEl = document.getElementById('date');
// const timezone = document.getElementById('time-zone');
// const countryEl = document.getElementById('country');
// const currentTempEl = document.getElementById('temperature');
// const currentWeatherItemsEl = document.getElementById('temperature');


// getWeatherData()
// function getWeatherData () {
//     navigator.geolocation.getCurrentPosition((success) => {

//         let {latitude, longitude } = success.coords;

//         // fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
//         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).then(res => res.json()).then(data => {


//         console.log(data);
//         showWeatherData(data);
//         })

//     })
// }
function showWeatherData(data) {
    //     let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    //     timezone.innerHTML = data.timezone;
    //     countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    //     currentWeatherItemsEl.innerHTML = 
    //     `<div class="weather-item">
    //         <div>Humidity</div>
    //         <div>${humidity}%</div>
    //     </div>
    //     <div class="weather-item">
    //         <div>Pressure</div>
    //         <div>${pressure}</div>
    //     </div>
    //     <div class="weather-item">
    //         <div>Wind Speed</div>
    //         <div>${wind_speed}</div>
    //     </div>
    //     <div class="weather-item">
    //         <div>Sunrise</div>
    //         <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    //     </div>
    //     <div class="weather-item">
    //         <div>Sunset</div>
    //         <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    //     </div>
    //     </div>
    //     <span id="weather-desc">Cloudy</span>
    //    </div>


    //     `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `
        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
        <div class="other">
        <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
        <div class="temp">${day.temp_max}°C </div>
        <div class="temp">${day.temp_min}°C </div>
        </div>
        
        
        
        <div class="temp-box">
        <img src="weatherchange.gif" alt="weatherlogo" id="img">
        <P id="temperature">${day.main.feels_like}<span><sup>C / F</sup></span></P>
        </div>
        `
        } else {
            otherDayForcast += `
        <div class="weather-forecast-item">
        <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="temp">${day.temp.night}°C </div>
        <div class="temp">${day.temp.day}°C </div>
        </div>
        
        `
        }

    })


    weatherForecastEl.innerHTML = otherDayForcast;
}

