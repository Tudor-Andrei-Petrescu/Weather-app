## Weather-app

Below you can find details on how to get the app running on your system, as well as a description and some of its features.

## Prerequisites

In order to run the app, Node.js is required. Download it from the [official website](https://nodejs.org/en/download/). 

Run the installer. 

Follow the installer steps, agree the license agreement and click the next button. 

Restart your system/machine. 

Open a terminal, and run the following commands : 

```

  node -v
  
```
```

  npm -v
  
```
This should display information about the versions of both. Next, run the following command :

```

  npm i react
  
```
This will install react on your machine. 

## Deployment

To run the app in your browser, run the command npm start in the weather-app folder : 

```

  \Weather-app\weather-app> npm start
  
```


## Project Description
<img src=/weather-app/src/assets/screenshots/main.PNG width="1500" height="500">

This project has been created using React and Node.js . The icons have been taken from [ICONFINDER](https://www.iconfinder.com/search?q=&price=free&category=weather) and the backgrounds are from [Unsplash](https://unsplash.com/).The app uses the [Open Weather Api](https://openweathermap.org/current) to fetch the current weather information for a given city using the searchLocation function. The URL is built using the location given as input in the search bar and the API generated key: 

```javascript
  const [location, setLocation] = useState('');
  const weatherURL=  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c84660ba35fa7381c7cd2d4251ed65e8`;
  
```
```javascript
 const searchLocation = (event) =>{
    if(event.key === 'Enter'){
      
      axios.get(weatherURL).then(response => {
        /*Fetch is successful*/
```
## Successful fetch

If the fetch is successful, searchLocation proceeds to calculate the current local time, sunrise and sunset in the given city. Then the setDynamicData function changes the background and adds the appropiate weather icon based on the weather type. The search bar also gets resized.

<img src=/weather-app/src/assets/screenshots/clear.png width="1500" height="500">

<img src=/weather-app/src/assets/screenshots/clouds.png width="1500" height="500">

<img src=/weather-app/src/assets/screenshots/rain.jpg width="1500" height="500">

## Unsuccessful fetch

If the fetch is unsuccessful, searchLocation check the location string. If it is empty, the page is reloaded and the user is taken back to the main page. If the location is not empty, the user is alerted that the city the user was looking for cannot be found. 

<img src=/weather-app/src/assets/screenshots/alert.PNG width="1500" height="500">
