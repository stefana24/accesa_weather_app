import CurrentLocation from "../currentLocation/CurrentLocation";
import styles from "./Home.module.css";
import { useContext } from "react";
import LocationContext from "../context/location/LocationContext";
const Home = () => {
  const locationContext = useContext(LocationContext);
  return (
    <div className={styles.card}>
      <CurrentLocation
        cityName={locationContext.cityName}
        getLatitude={locationContext.latitude}
        getLongitude={locationContext.longitude}
      />
    </div>
  );
};

export default Home;
