import { useState, useEffect, useContext } from "react";
import { API_KEY } from "../../constants";
import { fetchWeather } from "../../dataFetch/fetchData";
import style from "./Forecast.module.css";
import LocationContext from "../context/location/LocationContext";
import WeatherCard from "./WeatherCard";
const DailyForecast = () => {
  const context = useContext(LocationContext);
  const [dailyWeather, setDailyWeather] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await fetchWeather(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${context.latitude}&lon=${context.longitude}&exclude=current,hourly,minutely,alerts&units=metric&appid=${API_KEY}`
      );
      const sevenDays = result.daily.slice(0, -1);
      setDailyWeather(sevenDays);
    }
    fetchData();
  }, [context.latitude, context.longitude]);
  return (
    <div className={style.container}>
      <h1 className={style.title}>Daily Forecast</h1>
      <div className={style.cards}>
        {dailyWeather &&
          dailyWeather.map((item, index) => {
            const dayName = new Date(item.dt * 1000).toLocaleDateString("en", {
              weekday: "long",
            });
            return (
              <WeatherCard
                key={index}
                text={dayName}
                weatherIcon={item.weather[0].icon}
                temperature={item.temp.day}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DailyForecast;
