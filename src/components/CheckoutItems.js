// components
import CheckoutItem from "./CheckoutItem";

const CheckoutItems = ({ burgers, handleRemove }) => {
	return (
		<>
			<h2>Shopping Cart</h2>
			{burgers.length === 0 ? (
				<h3>Your cart is empty.</h3>
			) : (
				<h3>Items selected:</h3>
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

export default CheckoutItems;
