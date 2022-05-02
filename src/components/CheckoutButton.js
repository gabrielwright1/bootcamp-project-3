const CheckoutButton = ({ burgers, total }) => {
	return (
		<>
			<h3>Total: $ {total}</h3>
			{burgers.length === 0 ? null : (
				<button className="sm-button" type="submit">
					Checkout
				</button>
			)}
		</>
	);
};

export default CheckoutButton;
