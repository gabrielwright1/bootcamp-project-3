// components
import CheckoutItem from "./CheckoutItem";

// modules
import { useState, useEffect } from "react";

const CheckoutList = ({ burgers, handleRemove }) => {
	const [isVisible, setIsVisible] = useState(true);

	const handleHideCheckout = () => {
		console.log("x");
	};
	return (
		<>
			<h2>Shopping Cart</h2>
			{burgers.length === 0 ? (
				<div className="text-container">
					<h3>Your cart is empty.</h3>
				</div>
			) : (
				<div className="text-container">
					<button
						className="hide-button sm-button"
						type="button"
						onClick={handleHideCheckout}
					>
						Hide
					</button>
					<h3>Items selected:</h3>
				</div>
			)}
			<ul>
				{burgers.map((burger) => {
					return (
						<CheckoutItem
							key={burger.key}
							burger={burger}
							handleRemove={handleRemove}
						/>
					);
				})}
			</ul>
		</>
	);
};

export default CheckoutList;
