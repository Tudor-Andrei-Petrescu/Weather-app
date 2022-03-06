import React,{useState} from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('') 
  const weatherURL=  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c84660ba35fa7381c7cd2d4251ed65e8`
  const [localTimeZone,setLocalTimeZone] = useState('')
  const [currentTime,setCurrentTime]  = useState({})
  const [localSunset, setLocalSunset] = useState(' ')
  const [localSunrise, setLocalSunrise] = useState(' ')
  const searchLocation = (event) =>{

    if(event.key == 'Enter'){

      axios.get(weatherURL).then(response => {
        setData(response.data)
        getLocalSunset(response)
        getLocalSunrise(response)
        getCurrentTime(response)
      })
      setLocation('')
    } 

  }

  const getLocalSunset = (response) =>{
    const sunsetTime = response.data.sys.sunset
    const sunsetDate = new Date(sunsetTime* 1e3)
    var hours = sunsetDate.getHours() + response.data.timezone/3600
    if(hours <=0){
      hours = 24+hours
    }
    if(hours >24){
      hours = hours -24
    }
    var minutes = "0" + sunsetDate.getMinutes()
    var formattedTime = hours + ':' + minutes.substr(-2);
    setLocalSunset(formattedTime)
  }

  const getLocalSunrise = (response) =>{
    const sunriseTime = response.data.sys.sunrise
    const sunriseDate = new Date(sunriseTime * 1e3)
    var hours = sunriseDate.getHours() + response.data.timezone/3600
    if(hours <=0){
      hours = 24+hours
    }
    if(hours >24){
      hours = hours -24
    }
    var minutes = "0" + sunriseDate.getMinutes()
    var formattedTime = hours + ':' + minutes.substr(-2);
    setLocalSunrise(formattedTime)
  }


  const getCurrentTime = (response) => {
    const d = new Date();
    var hours = d.getUTCHours() + response.data.timezone/3600;
    if(hours <=0){
      hours = 24+hours
    }
   if(hours >24){
      hours = hours - 24
    }
    var minutes = d.getUTCMinutes();
    var formattedTime = hours + ':' + minutes;
  setLocalTimeZone(formattedTime)
  }

 
  return (
    <div className='App'>
      <div className='search'>
        <input
        value = {location} 
        onKeyPress = {searchLocation}
        onChange ={event => setLocation(event.target.value)}
        placeholder = 'Enter a location'
        type="text"></input>
        </div>
      <div className='container'>
        <div className='top'>

          <div className='location'>
            <p>{data.name}</p>
            {data.sys ? <p>{data.sys.country}</p> : null}
            </div>

            <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              </div>

              <div className='description'>
              {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>
          </div>

          {data.name != undefined &&   

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
