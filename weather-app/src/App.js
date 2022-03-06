import React,{useState} from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('') 
  const weatherURL=  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c84660ba35fa7381c7cd2d4251ed65e8`
  return (
    <div className='App'>
      <div className='container'>
        <div className='top'>

          <div className='location'>
            <p>London</p>
            </div>

            <div className='temp'>
              <h1>10°C</h1>
              </div>

              <div className='description'>
                <p>Cloudy</p>
                </div>
          </div>
        <div className='bottom'>

          <div className='feels like'>
            <p className='bold'>8°C</p>
            <p>Feels like</p>
            </div>

            <div className='humidity'>
              <p className='bold'>50%</p>
              <p>Humidity</p>
              </div>

              <div className='wind'>
                <p className='bold'>5KMPH</p>
                <p>Wind speed</p>
                </div>

          </div>

        </div>
    </div>
  );
}

export default App;
