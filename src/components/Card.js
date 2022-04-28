import { useState, useEffect } from "react";

const Card = ({ burgerImage, randomPrice }) => {
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

	return (
		<div className="burgerCard">
			<div className="img-container">
				<img
					src={burgerImage.urls.small}
					alt={burgerImage.alt_description}
				/>
			</div>
			<p className="burgerName">Name: {burgerImage.alt_description}</p>
			<p className="burgerPrice">Price: $ {price}</p>
			<p className="burgerSubtotal">Subtotal: $ {subtotal}</p>

			<button onClick={handleAdd}>+</button>
			<button onClick={handleSubtract}>-</button>
		</div>
	);
};
export default Card;
