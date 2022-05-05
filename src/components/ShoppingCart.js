// components
import CheckoutContainer from "./CheckoutContainer";
import CheckoutList from "./CheckoutList";

const ShoppingCart = ({ burgers, total, handleRemove, handleCheckout }) => {
	return (
		<form
			action="submit"
			onSubmit={(event) => handleCheckout(event)}
			className="shopping-container"
		>
			<CheckoutList burgers={burgers} handleRemove={handleRemove} />
			<CheckoutContainer burgers={burgers} total={total} />
		</form>
	);
};

export default ShoppingCart;
