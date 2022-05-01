// styling
import "./styles/sass/App.scss";

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
	// state
	const [burgerProducts, setburgerProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [burgers, setBurgers] = useState([]);

	// query firebase and get the burger products
	useEffect(() => {
		const totalId = "-N0yHl4A1PhHDEClucsy";

		const database = getDatabase(firebase);
		const productRef = ref(database, `/products/`);
		const cartRef = ref(database, `/cart/`);
		const totalRef = ref(database, `/total/${totalId}`);

		// grab the product list
		onValue(productRef, (response) => {
			const burgerProductArr = [];
			const data = response.val();
			for (let key in data) {
				// push the data as well as the key into the new array
				burgerProductArr.push({ ...data[key], key: key });
			}
			// update state
			setburgerProducts(burgerProductArr);
		});

		// grab the cart list
		onValue(cartRef, (response) => {
			const burgerCartArr = [];
			const data = response.val();
			for (let key in data) {
				// push the data as well as the key into the new array
				burgerCartArr.push({ ...data[key], key: key });
			}
			// update state
			setBurgers(burgerCartArr);
		});
	}, []);

	useEffect(() => {
		// update database with new total
		const database = getDatabase(firebase);
		const totalId = "-N0yHl4A1PhHDEClucsy";
		const totalRef = ref(database, `/total/${totalId}`);
		update(totalRef, { total: total });
	}, [total]);

	const addListItems = (burgerObj) => {
		// update total in shopping cart
		const { subtotal } = burgerObj;
		setTotal(total + subtotal);

		// add burger object to database
		const database = getDatabase(firebase);
		const cartRef = ref(database, `/cart/`);

		// add items to cart in database
		push(cartRef, burgerObj);
	};

	const handleRemove = (burgerId, subtotal) => {
		const database = getDatabase(firebase);
		const cartRef = ref(database, `/cart/${burgerId}`);

		// update total in shopping cart
		setTotal(total - subtotal);

		// remove from database
		remove(cartRef);
	};

	return (
		<div className="App">
			<header>
				<div className="header-container wrapper">
					<div className="title-container">
						<h1>Burger Builder</h1>
					</div>
					<div className="shopping-container">
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
											className="sm-button"
											onClick={() => {
												handleRemove(key, subtotal);
											}}
										>
											Remove
										</button>
									</li>
								);
							})}
						</ul>
						<h3>Total: $ {total}</h3>
					</div>
				</div>
			</header>
			<main>
				<section className="menu wrapper">
					<h2>Menu</h2>
					<div className="card-container">
						{burgerProducts.map((burgerProduct) => {
							return (
								<Card
									key={burgerProduct.key}
									addListItems={addListItems}
									burgerProduct={burgerProduct}
								/>
							);
						})}
					</div>
				</section>
			</main>
			<footer></footer>
		</div>
	);
}

export default App;
