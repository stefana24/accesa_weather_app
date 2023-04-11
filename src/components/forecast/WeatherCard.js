import style from "./Forecast.module.css";
const WeatherCard = ({ text, weatherIcon, temperature }) => {
  return (
    <div className={style.card}>
      <p>{text}</p>
      <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} />
      <p> {temperature.toFixed(0) + " \xB0" + "C"}</p>
    </div>
  );
};
export default WeatherCard;
