

const userLocation= document.getElementById("userLocation");
const converter =document.getElementById("converter");
const weatherIcon= document.querySelector(".weatherIcon");
const temperature = document.querySelector(".temperature");
const feelslike =document.querySelector(".feelslike");
const description= document.querySelector(".description");

const date =document.querySelector(".date");
const city= document.querySelector(".city");

const HValue = document.querySelector("#HValue");
const WValue = document.querySelector("#WValue");
const SRValue = document.querySelector("#SRValue");
const SSValue = document.querySelector("#SSValue");
const CValue = document.querySelector("#CValue");
const UVValue = document.querySelector("#UVValue");
const PValue =document.querySelector("#PValue");

WEATHER_API_ENDPOINT=`https://api.openweathermap.org/data/2.5/weather?appid=844be8d4f4ac3ea1e7bb4d92af1a4353&q=`;
WEATHER_DATA_ENDPOINT=`https://api.openweathermap.org/data/2.5/weather?appid=844be8d4f4ac3ea1e7bb4d92af1a4353&exclude=minutely&units=metric`; 


function findUserLocation(){
    fetch(WEATHER_API_ENDPOINT+userLocation.value).then((res)=> res.json().then((data)=>{
  
        console.log(data.coord.lon, data.coord.lat)
        if(data.cod!=`` && data.cod!=200){
            alert(data.message)
            return;
        }

        console.log(data)

        // ---------------- adding values to the divs--------------------------
        city.innerHTML=data.name+", "+data.sys.country;
        weatherIcon.style.background=`url( https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

        date.innerHTML=getFormattedDateFromUnix(data.dt)
       


        const weatherDataUrl = `${WEATHER_DATA_ENDPOINT}&lat=${data.coord.lat}&lon=${data.coord.lon}`;
        fetch(weatherDataUrl)
                .then((res) => res.json())
                .then((detailedData) => {
                    console.log("Detailed Weather Data:", detailedData);

                    // ------------ displaying the data that we get from 2nd api call --------------------

                    temperature.innerHTML=`${detailedData.main.temp}`;
                    feelslike.innerHTML=`Feels Like &nbsp ${detailedData.main.feels_like}`;
                    description.innerHTML=`<i class=" fa-brands fa-cloudversify"> </i> &nbsp ${detailedData.weather[0].description}`;

                    HValue.innerHTML=Math.round(detailedData.main.humidity)+"<span> %</span>";
                    WValue.innerHTML=Math.round(detailedData.wind.speed)+"<span> m/s</span>";

                    
                    SRValue.innerHTML=convertUnixToTime(detailedData.sys.sunrise)
                    SSValue.innerHTML=convertUnixToTime(detailedData.sys.sunset)

                    CValue.innerHTML=detailedData.clouds.all+"<span> %</span>";
                    UVValue.innerHTML=detailedData.main.uvi;
                    PValue.innerHTML=detailedData.main.pressure+"<span>Hpa</span>";

                })
                .catch((err) => console.error("Error in second fetch:", err));
    }))
    .catch((err) => console.error("Error in first fetch:", err));
}


// ------------------ to convert an calculate sunrise and sunset time ------------------------------


function convertUnixToTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}




// ----------------------------- to calculate the current day -date- time--------------------------------------

function getFormattedDateFromUnix(timestamp) {
    // Create a new Date object using the Unix timestamp (multiply by 1000 to convert from seconds to milliseconds)
    const date = new Date(timestamp * 1000);

    // Array of month names
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Get the current day of the week
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    // Get the day of the month and month name
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const month = monthsOfYear[date.getMonth()];

    // Get the time (HH:MM format)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Combine into the desired format: "DayOfWeek DayOfMonth Month At HH:MM"
    const formattedDateTime = `${dayOfWeek} ${dayOfMonth} ${month} at ${hours}:${minutes}`;

    return formattedDateTime;
}

// Example usage
const unixTimestamp = 1699441800; // Replace with your Unix timestamp
console.log(getFormattedDateFromUnix(unixTimestamp));



fetch(`http://api.weatherapi.com/v1/forecast.json?key=552fcd97b3254a8c9d282304241811&q=kolhapur&days=365`)
.then((resp)=> resp.json()
.then((data)=> {
    console.log(data)
})
)
.catch((err)=>console.log(err))