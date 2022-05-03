// modules
import { useState, useEffect } from "react";
// components
import Modal from "../components/Modal";

const Card = ({ addListItems, burgerProduct }) => {
	// state
	const [counter, setCounter] = useState(0);
	const [subtotal, setSubtotal] = useState(0);

	// destructure burger
	const { name, imgUrl, price } = burgerProduct;

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

	const handleModalOpen = () => {
		// open the modal
		const modalElem = document.querySelector("#modal");
		modalElem.style.display = "block";
	};

	return (
		<>
			<Modal />
			<form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
				action="submit"
				className="burger-card"
			>
				<div className="img-container">
					<label htmlFor="open-modal" className="sr-only">
						Click to customize the burger
					</label>
					<button
						type="button"
						id="open-modal"
						className="open-modal"
						onClick={handleModalOpen}
					>
						i
					</button>
					<img src={imgUrl} alt={name} />
				</div>
				<ul className="burger-details">
					<li className="burger-name">{name}</li>
					<li className="burger-price">Price: $ {price}</li>
					<li className="burger-counter">Counter: {counter}</li>
					<li className="burger-subtotal">Subtotal: $ {subtotal}</li>
				</ul>

				<div className="card-buttons">
					<div className="counter-buttons">
						{/* Increase counter */}
						<label htmlFor="add-button" className="sr-only">
							Increase the counter
						</label>
						<button
							id="add-button"
							className="sm-button"
							type="button"
							onClick={handleAdd}
						>
							Add
						</button>
						{/* Decrease counter */}
						<label htmlFor="remove-button" className="sr-only">
							Decrease the counter
						</label>
						<button
							id="remove-button"
							className="sm-button"
							type="button"
							onClick={handleSubtract}
						>
							Remove
						</button>
					</div>
					{/* Add to Cart */}
					<label htmlFor="add-to-cart-button" className="sr-only">
						Add item(s) to cart
					</label>
					<button
						id="add-to-cart-button"
						className="sm-button"
						type="submit"
					>
						Add to cart
					</button>
				</div>
			</form>
		</>
	);
};
export default Card;
