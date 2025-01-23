import React from "react";
import { FaWind } from "react-icons/fa";

const Weather = ({ weatherData }) => {
  if (!weatherData.weather) {
    return null;
  }

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[40%] bg-white rounded-lg shadow-xl p-6 animate- ">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <p className="text-gray-500 capitalize">
          {weatherData.weather[0].description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mt-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-500">
            {weatherData.main.temp.toFixed()}°C
          </h1>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="Weather Icon"
          className="w-24 h-24"
        />
      </div>

      <div className="mt-6 space-y-4">
        
        <div className="flex justify-between border-collapse max-md:border-b-gray-600 max-md:shadow-md max-md:bg-slate-200 rounded-r-md border-spacing-5 p-2 ">
          <p className="text-gray-600">Feels Like</p>
          <p className="text-gray-900 font-bold">
            {weatherData.main.feels_like.toFixed()}°C
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Humidity</p>
          <p className="text-gray-900 font-bold">
            {weatherData.main.humidity}%
          </p>
        </div>
        <div className="flex justify-between">
         
          <p className="text-gray-600">Wind Speed</p>
          <p className="text-gray-900 font-bold">
            {weatherData.wind.speed.toFixed()} km/h
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Pressure</p>
          <p className="text-gray-900 font-bold">
            {weatherData.main.pressure} hPa
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
