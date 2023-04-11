import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./components/header/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DailyForecast from "./components/forecast/DailyForecast";
import HourlyForecast from "./components/forecast/HourlyForecast";
import Favorites from "./components/header/Favorites";
import LocationProvider from "./components/context/location/LocationProvider";
import ThemeProvider from "./components/context/theme/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <LocationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="daily" element={<DailyForecast />} />
            <Route path="hourly" element={<HourlyForecast />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocationProvider>
  </ThemeProvider>
);
