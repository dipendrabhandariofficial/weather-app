import { useState } from "react";
import axios from "axios";
import "./App.css";
import Weather from "./components/Weather";


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [language,setLanguage]= useState("en");

  const searchLocation = (e) => {
    if (e.key === "Enter" && location) {
      const API_KEY = "efb39d93b1a00f9f1163f8e27d898e0a";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=${language}&units=metric&appid=${API_KEY}`;

      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data", error);
        });
      setLocation("");
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-200 to-blue-400 flex flex-col items-center justify-center gap-8">
      <div className="w-[80%] md:w-[50%] lg:w-[30%]">
        <input
          type="text"
          className="w-full bg-white border border-gray-300 rounded-lg shadow-lg px-6 py-4 text-lg font-sans placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDownCapture={searchLocation}
        />
      </div>

      {/* Weather component */}
      <Weather weatherData={data} />
    </div>
  );
}

export default App;
