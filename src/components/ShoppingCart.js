// components
import CheckoutItems from "./CheckoutItems";

const ShoppingCart = ({ burgers, total, handleRemove, handleCheckout }) => {
	return (
		<div className="shopping-container">
			<CheckoutItems burgers={burgers} handleRemove={handleRemove} />
			<h3>Total: $ {total}</h3>
			{burgers.length === 0 ? null : (
				<form
					className="checkout-form"
					onSubmit={(event) => handleCheckout(event)}
					action="submit"
				>
					<button className="sm-button" type="submit">
						Checkout
					</button>
				</form>
			)}
		</div>
	);
};

export default ShoppingCart;
