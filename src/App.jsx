import { useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import "./App.css";
import Weather from "./components/Weather";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("en");
  const [suggestions, setSuggestions] = useState([]); // For city suggestions
  const [error, setError] = useState(""); // For error messages

  const API_KEY = "efb39d93b1a00f9f1163f8e27d898e0a";

  const fetchSuggestions = (query) => {
    if (query) {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`;
      axios
        .get(url)
        .then((response) => {
          setSuggestions(response.data); // Update suggestions with API response
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]); // Clear suggestions if query is empty
    }
  };

  const searchLocation = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName || location}&lang=${language}&units=metric&appid=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data); // Update weather data
        setError(""); // Clear any error
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Location not found. Please try again."); // City not found
        } else {
          setError("An error occurred while fetching data. Please try later.");
        }
      });
    setSuggestions([]); // Clear suggestions after search
    setLocation(""); // Clear input field
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-200 to-blue-400 flex flex-col items-center justify-center gap-8">
      {/* Input Field and Search Button */}
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
          onKeyDown={(e) => e.key === "Enter" && searchLocation()}
        />
        <button
          onClick={() => searchLocation()}
          className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 focus:outline-none"
        >
          <FiSearch size={20} />
        </button>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {suggestions.map((city, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  setLocation(city.name); // Update location with selected city
                  searchLocation(city.name); // Fetch weather data for the selected city
                }}
              >
                {city.name}, {city.country} {/* Display city and country */}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-lg font-semibold">{error}</div>}

      {/* Weather Component */}
      <Weather weatherData={data} />
    </div>
  );
}

export default App;
