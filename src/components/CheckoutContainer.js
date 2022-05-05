const CheckoutContainer = ({ burgers, total }) => {
	return (
		<div className="checkout-container">
			<h3>Total: $ {total}</h3>
			{burgers.length === 0 ? null : (
				<button className="sm-button" type="submit">
					Checkout
				</button>
			)}
		</div>
	);
};

export default CheckoutContainer;
