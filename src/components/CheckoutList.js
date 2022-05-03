// components
import CheckoutItem from "./CheckoutItem";

// modules
import { useState } from "react";

const CheckoutList = ({ burgers, handleRemove }) => {
	// state
	const [isHidden, setIsHidden] = useState(false);

	// toggle checkout visibility
	const toggleCheckoutVisibility = (e) => {
		isHidden ? setIsHidden(false) : setIsHidden(true);
		handleUnclick(e);
	};

	const handleUnclick = (e) => {
		e.target.blur();
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
					{isHidden ? (
						<button
							className="show-button sm-button"
							type="button"
							onClick={(e) => {
								toggleCheckoutVisibility(e);
							}}
						>
							Show
						</button>
					) : (
						<button
							className="hide-button sm-button"
							type="button"
							onClick={(e) => {
								toggleCheckoutVisibility(e);
							}}
						>
							Hide
						</button>
					)}

					<h3 className="items-selected-container">
						Items selected:
					</h3>
				</div>
			)}
			<ul>
				{isHidden
					? null
					: burgers.map((burger) => {
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
