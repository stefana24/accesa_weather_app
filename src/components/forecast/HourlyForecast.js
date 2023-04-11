import { useState, useEffect, useContext } from "react";
import { API_KEY } from "../../constants";
import { fetchWeather } from "../../dataFetch/fetchData";
import style from "./Forecast.module.css";
import LocationContext from "../context/location/LocationContext";
import WeatherCard from "./WeatherCard";
const HourlyForecast = () => {
  const context = useContext(LocationContext);
  const [hourlyWeather, setHourlyWeather] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await fetchWeather(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${context.latitude}&lon=${context.longitude}&exclude=current,daily,minutely,alerts&units=metric&appid=${API_KEY}`
      );
      const hourly = result.hourly.slice(0, 24);
      setHourlyWeather(hourly);
    }
    fetchData();
  }, [context.latitude, context.longitude]);
  return (
    <div className={style.container}>
      <h1 className={style.title}>Hourly weather</h1>
      <div className={style.cards}>
        {hourlyWeather &&
          hourlyWeather.map((element, index) => {
            const date = new Date(element.dt * 1000);
            const enUSDate = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
            });
            return (
              <WeatherCard
                key={index}
                text={enUSDate}
                weatherIcon={element.weather[0].icon}
                temperature={element.temp}
              />
            );
          })}
      </div>
    </div>
  );
};

export default HourlyForecast;
