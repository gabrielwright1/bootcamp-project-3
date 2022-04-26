// styling
import "./App.css";

// modules
import { useEffect, useState } from "react";
import axios from "axios";

// components
import SearchBar from "./components/SearchBar";
import DisplayRestaurants from "./components/DisplayRestaurants";

function App() {
	// tom tom map api
	const APIKey = "IKJxHeZrfHyYd1rtxoXprdgZUj45VIlO";

	// state
	const [filteredRestaurants, setFilteredRestaurants] = useState([]);
	const [searchTerm, setSearchTerm] = useState("pizza");

	// API call - when user submits form
	useEffect(() => {
		// tom tom api call - category search - "pizza" centered on my lat/lon location
		let query = searchTerm;

		axios({
			url: `https://api.tomtom.com/search/2/categorySearch/${query}.json`,
			method: "GET",
			dataResponse: "json",
			params: {
				lat: "43.655630",
				lon: "-79.385080",
				key: APIKey,
			},
		}).then((response) => {
			// console.log(response.data.results[0].poi.name);
			const restaurantsArr = response.data.results;
			// console.log(restaurantsArr);
			setFilteredRestaurants(restaurantsArr);
		});
	}, [searchTerm]);

	const getRestaurants = (e, userChoice) => {
		e.preventDefault();
		setSearchTerm(userChoice);
	};

	return (
		<div className="App">
			<h1>This is an app</h1>
			<SearchBar getRestaurants={getRestaurants} />
			<DisplayRestaurants restaurants={filteredRestaurants} />
		</div>
	);
}

export default App;
