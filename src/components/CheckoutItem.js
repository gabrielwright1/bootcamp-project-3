const CheckoutItem = ({ burger, handleRemove }) => {
	const { key, name, subtotal, counter } = burger;
	return (
		<li key={key}>
			<p>
				{counter} x {name} = $ {subtotal}
			</p>
			<button
				className="remove-button sm-button"
				onClick={() => {
					handleRemove(key, subtotal);
				}}
			>
				Remove
			</button>
		</li>
	);
};

export default CheckoutItem;
