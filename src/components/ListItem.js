const ListItem = ({ shoppingListItem }) => {
	return (
		<li>
			<p>
				{shoppingListItem.counter} x {shoppingListItem.name} = $
				{shoppingListItem.subtotal}
			</p>
			<button>Add</button>
			<button>Remove</button>
		</li>
	);
};

export default ListItem;
