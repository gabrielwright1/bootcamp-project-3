// modules
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";

// config
import firebase from "../firebase";

const Card = ({ addListItems, burgerImage }) => {
	// state
	const [name, setName] = useState("Burger");
	const [counter, setCounter] = useState(0);
	const [price, setPrice] = useState(0);
	const [subtotal, setSubtotal] = useState(0);

	// counters (add)
	const handleAdd = () => {
		setCounter(counter + 1);
	};

	// counters (subtract)
	const handleSubtract = () => {
		if (counter > 0) {
			setCounter(counter - 1);
		}
	};

	useEffect(() => {
		// On mount - randomize prices for each burger
		const randomPrice = Math.floor(Math.random() * 10 + 1);
		setPrice(randomPrice);
		// randomize the name of each whopper
		setName(`Burger #${randomPrice}`);
	}, []);

	// When counter is changed - update subtotal
	useEffect(() => {
		setSubtotal(price * counter);
	}, [counter]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// update shopping cart
		addListItems({
			name: name,
			price: price,
			counter: counter,
			subtotal: subtotal,
		});
	};

	return (
		<form
			onSubmit={(e) => {
				handleSubmit(e);
			}}
			action="submit"
			className="burgerCard"
		>
			<div className="img-container">
				<img
					src={burgerImage.urls.small}
					alt={burgerImage.alt_description}
				/>
			</div>
			<ul>
				<li className="burgerName">Name: {name}</li>
				<li className="burgerPrice">Price: $ {price}</li>
				<li className="burgerCount">Counter: {counter}</li>
				<li className="burgerSubtotal">Subtotal: $ {subtotal}</li>
			</ul>
			<button type="button" onClick={handleAdd}>
				Add
			</button>
			<button type="button" onClick={handleSubtract}>
				Remove
			</button>
			<button type="submit">Add to cart</button>
		</form>
	);
};
export default Card;
