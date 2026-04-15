// this is the weather function that gets the user's geolocation from the browser api and then
// gets the local weather from those coordinates and puts them into OpenWeatherMap

import {useState, useEffect} from 'react';

function Weather(){
	const [weather, setWeather] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {

		navigator.geolocation.getCurrentPosition(
			(position) => {
				// store coordinates from browser geolocation api
				const { latitude, longitude} = position.coords;
				// plug the coordinates into the weather function
				getWeather(latitude,longitude);
			},
			(err) => {
				setError("location access denied. no weather");
			}
		);
	}, []);

	const getWeather = async (latitude, longitude) => {
		const weather_api_key = import.meta.env.VITE_WEATHER_API_KEY;
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_api_key}&units=imperial`;

		//console.log("weather api key: ", weather_api_key);

		try{
			const response = await fetch(url);
			
			if (!response.ok) {
			throw new Error("Invalid API Key or Server Error");
			}
			
			const data = await response.json();
			setWeather(data);

		}	catch (err) {
			setError("error: failed to get weather data");
		}
	};
	if (error) return <div className="text-red">{error}</div>;
	if (!weather) return <div className="p-4 text"> Loading the weather </div>;

	return (
		<div className="text-center p-2">
			<h2 className="text font-bold">Local Weather: </h2>
			<p className="text font-bold">{weather.name}</p>
			<h4 className="text-3xl">{weather.main.temp} F and {weather.weather[0].description}</h4>


			</div>
	);
}

export default Weather;