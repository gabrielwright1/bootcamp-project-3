// styling
import "./App.css";

// modules
import { useEffect, useState } from "react";
import axios from "axios";
import {
	getDatabase,
	ref,
	onValue,
	set,
	push,
	remove,
	get,
	update,
} from "firebase/database";

// config
import firebase from "./firebase";

// components
import Card from "./components/Card";

function App() {
	// tom tom map api
	const unsplashAPIKey = "JaPZndHAm8KHEUlIjQI_4rMZsNeO5zBNLdTkqb6XVh0";

	// state
	const [burgerImages, setBurgerImages] = useState([]);
	const [total, setTotal] = useState(0);
	const [burgers, setBurgers] = useState([]);

	// On Load - Get burger images from unsplash
	useEffect(() => {
		axios({
			url: `https://api.unsplash.com/search/photos`,
			method: "GET",
			dataResponse: "json",
			params: {
				client_id: unsplashAPIKey,
				query: "cheeseburger",
				orientation: "landscape",
			},
		}).then((response) => {
			const burgerImageArr = response.data.results;
			setBurgerImages(burgerImageArr);
		});
	}, []);

	// On load - grab the firebase data and update local state
	useEffect(() => {
		const database = getDatabase(firebase);
		const dbRef = ref(database);

		onValue(dbRef, (response) => {
			const newArr = [];
			const data = response.val();
			for (let key in data) {
				// push the data as well as the key into the new array
				newArr.push({ ...data[key], key: key });
			}
			// update state
			setBurgers(newArr);
		});
	}, []);

	const addListItems = (burgerObj) => {
		// update total in shopping cart
		const { subtotal, imageId } = burgerObj;
		setTotal(total + subtotal);

		// add burger object to database
		const database = getDatabase(firebase);
		const dbRef = ref(database);

		push(dbRef, burgerObj);
	};

	const handleRemove = (burgerId) => {
		const database = getDatabase(firebase);
		const dbRef = ref(database, `/${burgerId}`);
		remove(dbRef);
	};
	// console.log(burgers);
	// console.log(dbKey);

	return (
		<div className="App">
			<h1>Burgers</h1>
			{/* Shopping Cart */}
			<h2>Shopping Cart</h2>
			<ul>
				{burgers.map((burger) => {
					const { key, name, subtotal, counter } = burger;
					return (
						<li key={key}>
							<p>
								{counter} x {name} = $ {subtotal}
							</p>
							<button
								onClick={() => {
									handleRemove(key);
								}}
							>
								Remove
							</button>
						</li>
					);
				})}
			</ul>

			<div className="cardContainer">
				{burgerImages.map((burgerImage) => {
					return (
						<Card
							key={burgerImage.id}
							imageId={burgerImage.id}
							addListItems={addListItems}
							burgerImage={burgerImage}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
