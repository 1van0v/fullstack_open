import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherReport({ city }) {
  const [weather, setWeather] = useState(null);
  let weatherToRender = <></>;

  if (weather) {
    const { temperature, weather_icons, wind_speed, wind_dir, weather_descriptions } = weather;
    weatherToRender = (
      <>
        <h3>Weather in {city}</h3>
        <div>temperature: {temperature} Celsius</div>
        <img alt={weather_descriptions[0]} src={weather_icons[0]} />
        <div>
          wind: {wind_speed} Kilometers/Hour direction {wind_dir}
        </div>
      </>
    );
  }

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${city}&units=m`
      )
      .then(({ data }) => setWeather(data.current));
  }, []);

  return weatherToRender;
}
