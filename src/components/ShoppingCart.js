// components
import CheckoutButton from "./CheckoutButton";
import CheckoutList from "./CheckoutList";

const ShoppingCart = ({ burgers, total, handleRemove, handleCheckout }) => {
	return (
		<form
			action="submit"
			onSubmit={(event) => handleCheckout(event)}
			className="shopping-container"
		>
			<CheckoutList burgers={burgers} handleRemove={handleRemove} />
			<CheckoutButton burgers={burgers} total={total} />
		</form>
	);
};

export default ShoppingCart;
