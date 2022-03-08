import React,{useState} from 'react'
import axios from 'axios' 

import defaultImg from './assets/default.jpg'

import dayClear from './assets/day/clear.jpg'
import dayDrizzle from './assets/day/drizzle.jpg'
import dayCloudy from './assets/day/cloudy.jpg'
import dayRain from './assets/day/rain.jpg'
import daySnow from './assets/day/snow.jpg'
import dayThunder from './assets/day/thunderstorm.jpg'
import dayTornado from './assets/day/tornado.jpg'
import dayMist from './assets/day/mist.jpg'

import clearDayIcon from './assets/dayIcon/clearDayIcon.png'
import cloudDayIcon from './assets/dayIcon/cloudDayIcon.png'
import snowDayIcon from './assets/dayIcon/snowDayIcon.png'
import rainDayIcon from './assets/dayIcon/rainDayIcon.png'
import thunderIcon from './assets/dayIcon/thunderIcon.png'
import tornadoIcon from './assets/dayIcon/tornadoIcon.png'
import mistIcon from './assets/dayIcon/mistIcon.png'

import nightClear from './assets/night/clear.jpg'
import nightDrizzle from './assets/night/drizzle.jpg'
import nightCloudy from './assets/night/cloudy.jpg'
import nightRain from './assets/night/rain.jpg'
import nightSnow from './assets/night/snow.jpg'
import nightThunder from './assets/night/thunderstorm.jpg'
import nightTornado from './assets/night/tornado.jpg'
import nightMist from './assets/day/mist.jpg'

import clearNightIcon from './assets/nightIcon/clearNight.png'
import cloudNightIcon from './assets/nightIcon/cloudNightIcon.png'
import snowNightIcon from './assets/nightIcon/snowNightIcon.png'
import rainNightIcon from './assets/nightIcon/rainNightIcon.png'

function App() {
  const [data,setData] = useState({});
  const [location, setLocation] = useState('');
  const weatherURL=  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c84660ba35fa7381c7cd2d4251ed65e8`;
  const [localTimeZone,setLocalTimeZone] = useState('');
  const [localSunset, setLocalSunset] = useState(' ');
  const [localSunrise, setLocalSunrise] = useState(' ');
  var daylight = 1;
  var link =' ';
  const dayWall = [dayClear, dayDrizzle, dayCloudy, dayRain,  daySnow, dayThunder,dayTornado,dayMist]
  const nightWall = [nightClear, nightDrizzle, nightCloudy, nightRain,  nightSnow, nightThunder,nightTornado,nightMist]
  const dayIcon = [clearDayIcon,rainDayIcon,cloudDayIcon,rainDayIcon,snowDayIcon,thunderIcon,tornadoIcon,mistIcon]
  const nightIcon = [clearNightIcon,rainNightIcon,cloudNightIcon,rainNightIcon,snowNightIcon]
  const searchLocation = (event) =>{
    if(event.key === 'Enter'){
      
      axios.get(weatherURL).then(response => {
        /*After fetching the data, it then stores the object in data const, and then calls the get functions to retrieve
          the current time, sunset and sunrise in the given city*/
        setData(response.data);
        getLocalSunset(response);
        getLocalSunrise(response);
        getCurrentTime(response);
      }, reject =>{ 
                    if(location === ''){
                      window.location.reload(false);
                    }
                  else{
                    alert("Could not find requested city");
                  }
                
                } /*In case the fetch fails, the user is alerted that the requested city
                    couldn't be found if any input is given, otherwise the page is reloaded
                    and the user is taken back to the main page*/
                                                             
      )
  
      setLocation(''); /*Deletes the inserted city from the search bar*/  
    }

  }
  /*Calculates the local sunset*/
  const getLocalSunset = (response) =>{

    const sunsetTime = response.data.sys.sunset;
    const sunsetDate = new Date(sunsetTime* 1e3);
    var hours = sunsetDate.getHours() + response.data.timezone/3600;

    if(hours <=0){
      hours = 24 + hours;
    }

    if(hours >24){
      hours = hours - 24;
    }

    var minutes = "0" + sunsetDate.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    setLocalSunset(formattedTime);
  }
/*Calculates the local sunrise*/
  const getLocalSunrise = (response) =>{

    const sunriseTime = response.data.sys.sunrise;
    const sunriseDate = new Date(sunriseTime * 1e3);
    var hours = sunriseDate.getHours() + response.data.timezone/3600;

    if(hours <= 0){
      hours = 24+hours;
    }
    if(hours > 24){
      hours = hours -24;
    }
    var minutes = "0" + sunriseDate.getMinutes();
    var formattedTime = '0' + hours + ':' + minutes.substr(-2);
    setLocalSunrise(formattedTime);
  }

/*Calculates the local time*/
  const getCurrentTime = (response) => {

    const d = new Date();
    var hours = d.getUTCHours() + response.data.timezone/3600;

    if(hours <=0){
      hours = 24+hours;
    }

   if(hours >=24){
      hours = hours - 24;
    }

    if(hours <10){
      hours = '0' + hours;
    }
  
    var minutes = d.getUTCMinutes();

    if(minutes <10){
      minutes = '0'+minutes;
    }

    var formattedTime = hours + ':' + minutes;

    if(formattedTime>localSunset){
      daylight = 0;
    }
    
  setLocalTimeZone(formattedTime);
  }

  /*Dynamically changes the background and adds a weather icon based on the time of day and weather type*/
  /*Also changes the search bar size and position based on whether any queries have been made*/
  function setDynamicData(daylight, index) {
    if (daylight === 1){
      document.documentElement.style.setProperty('--background-image', `url(${dayWall[index]})`);
    }
    else{

      document.documentElement.style.setProperty('--background-image', `url(${nightWall[index]})`);
    }
    document.documentElement.style.setProperty('--font-size', `1.7rem`);
    document.documentElement.style.setProperty('--padding', `.7rem`);
  }
/*Helper function to decide which background to choose*/
function getIndex(){

  if(data.weather[0].main === "Clear"){
    return 0;
  }
  
  if(data.weather[0].main === "Drizzle"){
    return 1;
  }

  if(data.weather[0].main === "Clouds"){
    return 2;
  }

  if(data.weather[0].main === "Rain"){
    return 3;
  }

  if(data.weather[0].main === "Snow"){
    return 4;
  }

  if(data.weather[0].main === "Thunder"){
    return 5;
  }
  
  if(data.weather[0].main === "Tornado"){
    return 6;
  }

  if(data.weather[0].main === "Mist" || data.weather[0].main === "Smoke" ||
    data.weather[0].main === "Haze" ||  data.weather[0].main === "Fog"){
      return 7;
    }


  return -1;
} 
/*Checks whether a query has been successful, and based on that it then sets the according background and icon*/
  if(typeof data.name != "undefined"){

    if(localTimeZone>localSunset || localTimeZone < localSunrise){
      daylight=0;
    }
    let index = getIndex();
    if(index !== -1){
      
    setDynamicData(daylight,index);
    if(index >= 5){
      link = dayIcon[index];
    }
    else{
      if(daylight===1){
        link = dayIcon[index];

      }
      else link = nightIcon[index];
    }

    }
    else{
      document.documentElement.style.setProperty('--background-image', `url(${defaultImg})`);
    }
  }
  return (
    <div  className= 'App'> 
      <div className='search'>
        <input
        value = {location} 
        onKeyPress ={searchLocation}
        onChange ={event => setLocation(event.target.value)}
        placeholder = ' Enter a location'
        type="text"></input>
        </div>
      <div className='container'>

        <div className='top'>

          <div className='location'>
            <p>{data.name}</p>
            {data.sys ? <p>{data.sys.country}</p> : null}
            {data.sys ? <img src={link}/> : null }
            </div>

            <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              </div>

              <div className='description'>
              {data.weather ? <h1  >{data.weather[0].main}</h1> : null}
                </div>
          </div>

          {data.name !== undefined &&   

          <div className='bottom'>

          <div className='feels like'>
          {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
            <p>Feels like</p>
            </div>

            <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
              </div>

              <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed}m/s</p> : null}
                <p>Wind speed</p>
                </div>

                <div className='GMT time'>
                   <p className='bold'>{localTimeZone}</p>
                   <p>Current Time</p>
                   </div>
                   
                   <div className='sunrise'>
               <p className='bold'>{localSunrise}</p>
                 <p>Sunrise</p>
                 </div>


               <div className='sunset'>
               <p className='bold'>{localSunset}</p>
                 <p>Sunset</p>
                 </div>

          </div> 
          
          }

        </div>
    </div>
  );
}

export default App;
