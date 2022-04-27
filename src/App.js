// styling
import "./App.css";

// modules
import { useEffect, useState } from "react";
import axios from "axios";

// components
import SearchBar from "./components/SearchBar";
import DisplayRestaurants from "./components/DisplayRestaurants";
import DisplayFood from "./components/DisplayFood";

function App() {
	// tom tom map api
	const TomTomAPIKey = "IKJxHeZrfHyYd1rtxoXprdgZUj45VIlO";
	const unsplashAPIKey = "JaPZndHAm8KHEUlIjQI_4rMZsNeO5zBNLdTkqb6XVh0";

	// state
	const [filteredRestaurants, setFilteredRestaurants] = useState([]);
	const [query, setQuery] = useState("fastfood");
	const [foodImages, setFoodImages] = useState([]);

	// API call for restaurants - when user submits form
	useEffect(() => {
		// tom tom api call - fuzzy search
		axios({
			url: `https://api.tomtom.com/search/2/search/${query}.json?`,
			method: "GET",
			dataResponse: "json",
			params: {
				lat: "43.655630",
				lon: "-79.385080",
				key: TomTomAPIKey,
			},
		}).then((response) => {
			// console.log(response.data.results[0].poi.name);
			const restaurantsArr = response.data.results;
			setFilteredRestaurants(restaurantsArr);
		});
	}, [query]);

	// API call for food images
	useEffect(() => {
		axios({
			url: `https://api.unsplash.com/search/photos`,
			method: "GET",
			dataResponse: "json",
			params: {
				client_id: unsplashAPIKey,
				query: query,
				orientation: "landscape",
			},
		}).then((response) => {
			const foodImageArr = response.data.results;
			setFoodImages(foodImageArr);
		});
	}, [query]);

	const getRestaurants = (e, userChoice) => {
		e.preventDefault();
		setQuery(userChoice);
	};

	return (
		<div className="App">
			<h1>This is an app</h1>
			<SearchBar getRestaurants={getRestaurants} />
			<DisplayRestaurants restaurants={filteredRestaurants} />
			<DisplayFood foodImages={foodImages} />
		</div>
	);
}

export default App;
