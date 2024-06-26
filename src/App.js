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
    [location, setWeather]
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
      {weather.weathercode && (
        <Weather displayLocation={displayLocation} weather={weather} />
      )}
    </div>
  );
}

function Weather({ displayLocation, weather }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  return (
    <div className="output">
      <h2>Weather {displayLocation}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max[i]}
            min={min[i]}
            code={codes[i]}
            isToday={i === 0}
            key={date}
          />
        ))}
      </ul>
    </div>
  );
}

function Day({ date, max, min, code, isToday }) {
  return (
    <li className="day">
      <span>☁️</span>
      <p>{isToday ? "Today" : date}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
}
