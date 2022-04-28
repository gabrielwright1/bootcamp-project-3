// modules
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";

// config
import firebase from "../firebase";

const Card = ({ addSubtotals, burgerImage }) => {
	// state
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

	// On mount - randomize prices for each burger
	useEffect(() => {
		const randomPrice = Math.floor(Math.random() * 10 + 1);
		setPrice(randomPrice);
	}, []);

	// When counter is changed - update subtotal
	useEffect(() => {
		setSubtotal(price * counter);
	}, [counter]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// update total with subtotals
		addSubtotals(subtotal);
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
				<li className="burgerName">Name: Burger</li>
				<li className="burgerPrice">Price: $ {price}</li>
				<li className="burgerCount">Count: {counter}</li>
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
