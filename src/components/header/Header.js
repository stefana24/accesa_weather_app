import SearchByCity from "./SearchByCity";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import LocationContext from "../context/location/LocationContext";
import Switch from "react-switch";
import ThemeContext from "../context/theme/ThemeContext";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
const Header = () => {
  const locationContext = useContext(LocationContext);
  const themeContext = useContext(ThemeContext);
  function handleChange() {
    if (themeContext.theme === "light") themeContext.setTheme("dark");
    else themeContext.setTheme("light");
  }
  useEffect(() => {
    document
      .querySelector("main")
      .setAttribute("data-theme", themeContext.theme);
  }, [themeContext.theme]);
  return (
    <div className={styles.container}>
      <header className={styles.header_app}>
        <Link to="/" className={styles.header_app__title}>
          <div className={styles.header_app__title__container}>
            <div className={styles.header_icon}>
              <IoPartlySunnyOutline />
            </div>
            <h1>Weather app</h1>
          </div>
        </Link>
        <SearchByCity getInput={locationContext.setCityName} />
        <Link to="/favorites" className={styles.favorites}>
          Favorites
        </Link>
        <div className={styles.switch}>
          <label>
            {themeContext.theme === "light" ? (
              <IoSunnyOutline style={{ fontSize: "25px" }} />
            ) : (
              <IoMoon style={{ fontSize: "25px" }} />
            )}
          </label>
          <Switch
            onChange={handleChange}
            checked={themeContext.theme === "light"}
          />
        </div>
      </header>

      <div className={styles.sub_nav}>
        <div className={styles.sub_nav_container}>
          <div>
            <Link to="/hourly" className={styles.forecast_links}>
              Hourly
            </Link>
          </div>
          <div>
            <Link to={"/daily"} className={styles.forecast_links}>
              Daily
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
