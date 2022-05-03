// styling
import "./styles/sass/App.scss";

// modules
import { useEffect, useState } from "react";
import {
	getDatabase,
	ref,
	onValue,
	push,
	remove,
	get,
	update,
} from "firebase/database";

// config
import firebase from "./firebase";

// components
import Card from "./components/Card";
import ShoppingCart from "./components/ShoppingCart";
import Modal from "./components/Modal";

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

	useEffect(() => {
		if (total !== 0) {
			// only update database if the local total isn't its on-mount value of 0
			updateTotalInDb({ cartTotal: total });
		}
	}, [total]);

	const updateTotalInDb = (totalObj) => {
		const database = getDatabase(firebase);
		const totalRef = ref(database, `/total/-N0yHl4A1PhHDEClucsy`);
		return update(totalRef, totalObj);
	};

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

		// if its the last item in the cart, then clear the database total
		if (burgers.length === 1) {
			updateTotalInDb({ cartTotal: 0 });
		}
	};

	const clearCartInDb = () => {
		// reset database cart
		const database = getDatabase(firebase);
		const cartRef = ref(database, `/cart/`);

		remove(cartRef);
	};

	const handleCheckout = (event) => {
		event.preventDefault();

		// confirmation message
		alert("Thank you for your purchase!");

		// reset local state
		setBurgers([]);
		setTotal(0);

		// reset database total
		updateTotalInDb({ cartTotal: 0 });

		// reset cart in database
		clearCartInDb();
	};

	return (
		<div className="App">
			<div className="bg-img-container wrapper">
				{/* Modal displays burger customization options */}
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
							<ShoppingCart
								burgers={burgers}
								total={total}
								handleRemove={handleRemove}
								handleCheckout={handleCheckout}
							/>
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
			<footer>Made at Juno College (2022) by Gabriel Wright</footer>
		</div>
	);
}

export default App;
