// styling
import "./App.css";

// modules
import { useEffect, useState } from "react";
import axios from "axios";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";

// config
import firebase from "./firebase";

// components
import CardContainer from "./components/CardContainer";
import ShoppingCart from "./components/ShoppingCart";

function App() {
	// tom tom map api
	const unsplashAPIKey = "JaPZndHAm8KHEUlIjQI_4rMZsNeO5zBNLdTkqb6XVh0";

	// state
	const [query, setQuery] = useState("burgers");
	const [burgerImages, setBurgerImages] = useState([]);
	const [total, setTotal] = useState(0);

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
			const burgerImageArr = response.data.results;
			setBurgerImages(burgerImageArr);
		});
	}, [query]);

	const addSubtotals = (subtotal) => {
		setTotal(total + subtotal);
	};

	return (
		<div className="App">
			<h1>Burgers</h1>
			<ShoppingCart total={total} />
			<CardContainer
				addSubtotals={addSubtotals}
				burgerImages={burgerImages}
			/>
		</div>
	);
}

export default App;
