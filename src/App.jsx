import { useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import "./App.css";
import Weather from "./components/Weather";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1); // Track highlighted suggestion

  const API_KEY = "efb39d93b1a00f9f1163f8e27d898e0a";

  const fetchSuggestions = (query) => {
    if (query) {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`;
      axios
        .get(url)
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const searchLocation = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName || location}&lang=""${language}&units=metric&appid=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setError("");
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Location not found. Please try again.");
          setErrorImage("sorry.jpg");
        } else {
          setError("An error occurred while fetching data. Please try later.");
          setErrorImage("");
        }
      });
    setSuggestions([]);
    setLocation("");
  };

  const handleKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % suggestions.length); // Move to next suggestion
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length); // Move to previous suggestion
      } else if (e.key === "Enter" && activeIndex >= 0) {
        const selectedCity = suggestions[activeIndex];
        setLocation(selectedCity.name); // Update input field with selected city
        searchLocation(selectedCity.name); // Fetch weather data
        setActiveIndex(-1); // Reset active index
      }
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-200 to-blue-400 flex flex-col items-center justify-center gap-8">
      <div className="w-[80%] md:w-[50%] lg:w-[30%] relative">
        <input
          type="text"
          className="w-full bg-white border border-gray-300 rounded-lg shadow-lg px-6 py-4 text-lg font-sans placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter location"
          value={location}
          onChange={(e) => {
            const query = e.target.value;
            setLocation(query);
            fetchSuggestions(query);
          }}
          onKeyDown={handleKeyDown} // Handle arrow and Enter keys
        />
        <button
          onClick={() => searchLocation()}
          className="absolute right-3 top-[13px] text-blue-400 rounded-full px-3 py-2 focus:outline-none"
        >
          <FiSearch size={25} />
        </button>

        {suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {suggestions.map((city, index) => (
              <div
                key={index}
                className={`px-4 py-2 cursor-pointer ${
                  index === activeIndex ? "bg-blue-100" : ""
                }`}
                onClick={() => {
                  setLocation(city.name); // Update location
                  searchLocation(city.name); // Fetch weather data
                  setActiveIndex(-1); // Reset active index
                }}
              >
                {city.name}, {city.country}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
          {errorImage && (
            <img
              src={errorImage}
              alt="Error"
              className="w-[30%] h-auto mx-auto mt-4"
            />
          )}
        </div>
      )}

      <Weather weatherData={data} />
    </div>
  );
}

export default App;
