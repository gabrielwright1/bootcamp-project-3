// components
import ListItem from "./ListItem";

const ShoppingCart = ({ total, shoppingList }) => {
	return (
		<div>
			<p>Your total is: $ {total}</p>

			<ul>
				{shoppingList.map((shoppingListItem, index) => {
					return (
						<ListItem
							key={index}
							shoppingListItem={shoppingListItem}
						/>
					);
				})}
			</ul>
		</div>
	);
};
export default ShoppingCart;
