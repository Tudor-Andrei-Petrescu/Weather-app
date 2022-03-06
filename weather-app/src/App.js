import React,{useState} from 'react'
import axios from 'axios'

function App() {

  const weatherURL=  'https://api.openweathermap.org/data/2.5/weather?q=London&appid=c84660ba35fa7381c7cd2d4251ed65e8'
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
            <p>8°C</p>
            </div>
          </div>

        </div>
    </div>
  );
}

export default App;
