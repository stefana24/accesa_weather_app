import { useState } from "react";
import LocationContext from "./LocationContext";

const LocationProvider = ({ children }) => {
  const [cityName, setCityName] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const location = {
    cityName,
    latitude,
    longitude,
    setCityName: (name) => {
      console.log(name);
      setCityName(name);
    },
    setLatitude,
    setLongitude,
  };
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
