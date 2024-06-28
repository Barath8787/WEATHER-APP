import { useEffect, useState } from 'react'
import './App.css'
/*images */
import searchIcon from './assets/search.png';
import clearIcon from './assets/clear.png';
import cloudIcon from './assets/cloud.png';
import drizzleIcon from './assets/drizzle.png';
import humidityIcon from  './assets/humidity.png';
import rainIcon from './assets/rain.png';
import snowIcon  from './assets/snow.png';
import windIcon from './assets/wind.png';
const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{       
  return(
  <>
    <div className="image">
        <img src={icon} alt="image" />
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
      </div>
        <div>
         <span className='log'>Longitude</span>
         <span>{log}</span>
        </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={humidityIcon} alt="humidity" className='icon'/>
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>

      <div className="element">
        <img src={windIcon} alt="Wind"  className='icon'/>
        <div className="data">
          <div className="Wind-percent">{wind}KM/H</div>
          <div className="text">Wind speed</div>
        </div>
      </div>
    </div>
  </>
  );
}

function App() {
  let api_key="16524860666a47389bf86cc895fcf1b4";

const [text,settext]=useState("Chennai");
  const [icon,setIcon]=useState(snowIcon);
  const [temp,setTemp]=useState(0);
 const [city,Setcity]=useState("");
 const [country,Setcountry]=useState("");
 const [lat,Setlat]=useState(0);
 const [log,Setlog]=useState(0);
 const[humidity,Sethumidity]=useState(85);
 const[wind,Setwind]=useState(5);

 const [cityNotfound,setcityNotfound]=useState(false);
 const[loading,setloading]=useState(false)
 const[error,seterror]=useState(null)


const weatherIconMap ={
  "01d":clearIcon,
  "01n":clearIcon,
  "02d":cloudIcon,
  "02n":cloudIcon,
  "03d":drizzleIcon,
  "03n":drizzleIcon,
  "04d":drizzleIcon,
  "04n":drizzleIcon,
  "09d":rainIcon,
  "09n":rainIcon,
  "10d":rainIcon,
  "10n":rainIcon,
  "13d":snowIcon,
  "13n":snowIcon,
};
 const Search = async()=>{
  setloading(true);
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  try{
    let res= await fetch(url)
    let data= await res.json();
    //console.log(data);
    if(data.cod==='404'){
      console.log("City Not Found");
      setcityNotfound(true);
      setloading(true);
      return;
    }

    Sethumidity(data.main.humidity);
    Setwind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    Setcity(data.name);
    Setlog(data.coord.lon);
    Setlat(data.coord.lat);
    Setcountry(data.sys.country);
    const weatherIconCode = data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode] || clearIcon);
    setcityNotfound(false);


  }
  catch(error){
    seterror("Error occur while fetching the data");
  }
  finally{setloading(false);}
}
 const handlecity=(e)=>{
  settext(e.target.value);
 };
 const handlekeyDown=(e)=>{
  if(e.key==="Enter"){
    Search();
  }

 }
 useEffect(function () {
  Search();
},[]);//dependency array

  return (
    <>
      <div className="container">
         <div className="input-container">
           <input type="text" 
            className='cityinput' 
            placeholder='search city' 
            onChange={handlecity}
            value={text}
            onKeyDown={handlekeyDown}/>

          <div className="search-icon" onClick={()=>Search()}>
            <img src={searchIcon} alt="search" />
         </div>
         </div>
       {loading && <div className="Loading-message">Loading...</div>}; 
       {error && <div className="error-message">{error}</div>};
         {cityNotfound && <div className="city-Not-found">City not found</div>};

         {!loading && !cityNotfound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>};

      </div>
    </>
  )
}

export default App
