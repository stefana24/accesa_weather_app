import { createContext } from "react";

const LocationContext = createContext({
  cityName: "",
  latitude: 0,
  longitude: 0,
  setCityName: (name) => {},
  setLatitude: (lat) => {},
  setLongitude: (long) => {},
});
export default LocationContext;
