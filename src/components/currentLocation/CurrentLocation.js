import { useContext, useEffect } from "react";
import { API_KEY } from "../../constants";
import { fetchWeather } from "../../dataFetch/fetchData";
import { useState } from "react";
import styles from "./CurrentLocation.module.css";
import LocationContext from "../context/location/LocationContext";
const CurrentLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [status, setStatus] = useState(null);
  const [currentDataWeather, setCurrentDataWeather] = useState();
  const [currentTemp, setCurrentTemp] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [humidity, setHumidity] = useState();
  const [description, setDescription] = useState();
  const context = useContext(LocationContext);
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(2));
          setLongitude(position.coords.longitude.toFixed(2));
          setStatus("Ready");
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  useEffect(() => {
    getLocation();
    async function fetchData() {
      let url;
      if (!context.cityName) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b3b98986873d794a0caf8e8be4f03b4e&units=metric`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${context.cityName}&appid=${API_KEY}&units=metric`;
      }
      const result = await fetchWeather(url);
      console.log(result);
      setCurrentDataWeather(result);
      setCurrentTemp(result.main.temp);
      setFeelsLike(result.main.feels_like);
      setHumidity(result.main.humidity);
      setDescription(result.weather);
    }
    if (status === "Ready") {
      fetchData();
      context.setLatitude(latitude);
      context.setLongitude(longitude);
    }
  }, [latitude, longitude, context.cityName]);

  function addToFavoriteHandler() {
    if (localStorage.getItem("favoriteCities") === null) {
      const cityInfo = [
        {
          name: currentDataWeather.name,
          temperature: currentTemp.toFixed(0) + " \xB0" + "C",
          imageUrl: `https://openweathermap.org/img/wn/${description[0].icon}@2x.png`,
        },
      ];
      localStorage.setItem("favoriteCities", JSON.stringify(cityInfo));
      alert(`${currentDataWeather.name} added to favorites`);
    } else {
      const favorites = JSON.parse(localStorage.getItem("favoriteCities"));
      const findCity = favorites.find(
        (item) => item.name === currentDataWeather.name
      );
      if (!findCity) {
        favorites.push({
          name: currentDataWeather.name,
          temperature: currentTemp.toFixed(0) + " \xB0" + "C",
          imageUrl: `https://openweathermap.org/img/wn/${description[0].icon}@2x.png`,
        });
        localStorage.setItem("favoriteCities", JSON.stringify(favorites));
        alert(`${currentDataWeather.name} added to favorites`);
      } else {
        alert("City already added!");
      }
    }
  }

  return (
    currentDataWeather && (
      <div className={styles.currentContainer}>
        <h1>Current weather in {currentDataWeather.name}</h1>
        <div className={styles.temperatureContainer}>
          <img
            src={`https://openweathermap.org/img/wn/${description[0].icon}@2x.png`}
          />
          <p className={styles.temperature}>
            {currentTemp.toFixed(0) + " \xB0" + "C"}
          </p>
          <div className={styles.description}>
            <span>|</span>
            <span>{description[0].main}</span>
          </div>
        </div>
        <p>Feels Like: {feelsLike.toFixed(0) + " \xB0" + "C"}</p>
        <p>Humidity: {humidity}%</p>

        <div className={styles.addBtnContainer}>
          <button onClick={addToFavoriteHandler} className={styles.addBtn}>
            Add to favorites
          </button>
        </div>
      </div>
    )
  );
};

export default CurrentLocation;
