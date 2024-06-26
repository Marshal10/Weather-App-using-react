import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [displayLocation, setDisplayLocation] = useState("");

  useEffect(
    function () {
      async function getWeather(location) {
        try {
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
          );
          const geoData = await geoRes.json();
          console.log(geoData);

          if (!geoData.results) throw new Error("Location not found");

          const { longitude, latitude, country_code, timezone, name } =
            geoData.results[0];

          setDisplayLocation((l) => `${name}`);

          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );

          const weatherData = await weatherRes.json();
          setWeather((w) => weatherData.daily);
          console.log(weatherData);
        } catch (err) {
          console.error(err);
        }
      }

      if (location.length >= 2) {
        getWeather(location);
      }
    },
    [location]
  );

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <div>
        <input
          type="text"
          value={location}
          onChange={(e) => {
            setLocation((s) => e.target.value);
          }}
        ></input>
      </div>
      <div className="output">
        <h2>Weather {displayLocation}</h2>
        <ul className="weather">
          <li className="day">
            <span>☁️</span>
            <p>Today</p>
            <p>
              27-<strong>31</strong>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
