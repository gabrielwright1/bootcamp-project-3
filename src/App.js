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
	const [burgerProducts, setBurgerProducts] = useState([]);
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
			setBurgerProducts(burgerProductArr);
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

		// grab total
		// update local state to the total stored in database
		get(totalRef).then((snapshot) => {
			setTotal(snapshot.val().cartTotal);
		});
	}, []);

	// ensure that total doesn't go negative
	useEffect(() => {
		if (total < 0) {
			setTotal(0);
		}

		// update total in database
		const updateTotalInDb = (totalObj) => {
			const database = getDatabase(firebase);
			const totalRef = ref(database, `/total/-N0yHl4A1PhHDEClucsy`);
			return update(totalRef, totalObj);
		};

		// only update database if the local state total isn't its on-mount value (0)
		if (total !== 0) {
			updateTotalInDb({ cartTotal: total });
		}
	}, [total]);

	// this pushes an object to database incase I accidentally delete my total
	// useEffect(() => {
	// 	const database = getDatabase(firebase);
	// 	const totalRef = ref(database, `/total/-N0yHl4A1PhHDEClucsy`);
	// 	update(totalRef, { cartTotal: total });
	// }, []);

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
			<div className="bg-img-container wrapper">
				<header>
					<div className="header-container wrapper">
						<div className="title-container">
							<h1>Mel's drive-in</h1>
						</div>
						<div className="header-inner-container">
							<div className="img-container">
								<img
									src="https://images.unsplash.com/photo-1513918573039-35f42ae13895?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
									alt="an old 50s car in front of a diner"
								/>
							</div>
							<div className="shopping-container">
								<h2>Shopping Cart</h2>
								{burgers.length === 0 ? (
									<h3>Your cart is empty.</h3>
								) : (
									<h3>Items selected:</h3>
								)}
								<ul>
									{burgers.map((burger) => {
										const { key, name, subtotal, counter } =
											burger;
										return (
											<li key={key}>
												<p>
													{counter} x {name} = ${" "}
													{subtotal}
												</p>
												<button
													className="sm-button"
													onClick={() => {
														handleRemove(
															key,
															subtotal
														);
													}}
												>
													Remove
												</button>
											</li>
										);
									})}
								</ul>
								<h3>Total: $ {total}</h3>
								{burgers.length === 0 ? (
									""
								) : (
									<button className="sm-button" type="submit">
										Checkout
									</button>
								)}
							</div>
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
			</div>
			<footer></footer>
		</div>
	);
}

export default App;
