// modules
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";

// config
import firebase from "../firebase";

const Card = ({ addListItems, burgerProduct }) => {
	const { name, imgUrl, price } = burgerProduct;
	// state
	const [counter, setCounter] = useState(0);
	const [subtotal, setSubtotal] = useState(0);

	// When counter is changed - update subtotal
	useEffect(() => {
		setSubtotal(price * counter);
	}, [counter]);

	const handleAdd = () => {
		setCounter(counter + 1);
	};

	const handleSubtract = () => {
		if (counter > 0) {
			setCounter(counter - 1);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		// check to see if user selected counter
		if (counter > 0) {
			const burgerObj = {
				name: name,
				price: price,
				counter: counter,
				subtotal: subtotal,
			};
			addListItems(burgerObj);
		} else {
			alert("Please enter an amount");
		}
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
				<img src={imgUrl} alt={name} />
			</div>
			<ul className="burgerDetails">
				<li className="burgerName">Name: {name}</li>
				<li className="burgerPrice">Price: $ {price}</li>
				<li className="burgerCount">Counter: {counter}</li>
				<li className="burgerSubtotal">Subtotal: $ {subtotal}</li>
			</ul>
			<div className="card-buttons">
				<button className="sm-button" type="button" onClick={handleAdd}>
					Add
				</button>
				<button
					className="sm-button"
					type="button"
					onClick={handleSubtract}
				>
					Remove
				</button>
				<button className="sm-button" type="submit">
					Add to cart
				</button>
			</div>
		</form>
	);
};
export default Card;
