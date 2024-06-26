import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [location, setLocation] = useState("");

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

          const { longitude, latitudecountry_code, timezone, name } =
            geoData.results[0];
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
        <h2>Weather Placename</h2>
        <ul className="weather">
          <li className="day">
            <span>☁️</span>
            <p>Today</p>
            <p>
              27-<strong>31</strong>
            </p>
          </li>
          <li className="day">
            <span>☁️</span>
            <p>Today</p>
            <p>
              27-<strong>31</strong>
            </p>
          </li>
          <li className="day">
            <span>☁️</span>
            <p>Today</p>
            <p>
              27-<strong>31</strong>
            </p>
          </li>
          <li className="day">
            <span>☁️</span>
            <p>Today</p>
            <p>
              27-<strong>31</strong>
            </p>
          </li>
          <li className="day">
            <span>☁️</span>
            <p>Today</p>
            <p>
              27-<strong>31</strong>
            </p>
          </li>
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
