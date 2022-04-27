const DisplayRestaurants = ({ restaurants }) => {
	return (
		<div>
			<h2>Restaurants:</h2>
			<ul>
				{restaurants.map((restaurant) => {
					return <li key={restaurant.id}>{restaurant.poi.name}</li>;
				})}
			</ul>
		</div>
	);
};
export default DisplayRestaurants;
