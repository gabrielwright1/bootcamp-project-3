// components
import CheckoutButton from "./CheckoutButton";
import CheckoutItems from "./CheckoutItems";

const ShoppingCart = ({ burgers, total, handleRemove, handleCheckout }) => {
	return (
		<form
			action="submit"
			onSubmit={(event) => handleCheckout(event)}
			className="shopping-container"
		>
			<CheckoutItems burgers={burgers} handleRemove={handleRemove} />
			<CheckoutButton burgers={burgers} total={total} />
		</form>
	);
};

export default ShoppingCart;
