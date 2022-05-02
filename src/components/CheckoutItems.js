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
					const { key, name, subtotal, counter } = burger;
					return (
						<li key={key}>
							<p>
								{counter} x {name} = $ {subtotal}
							</p>
							<button
								className="sm-button"
								onClick={() => {
									handleRemove(key, subtotal);
								}}
							>
								Remove
							</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default CheckoutItems;
