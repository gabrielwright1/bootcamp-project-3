const DisplayRestaurants = ({ restaurants }) => {
	return (
		<div>
			<h2>Restaurants</h2>
			{restaurants.map((restaurant) => {
				return <p key={restaurant.id}>{restaurant.poi.name}</p>;
			})}
		</div>
	);
};
export default DisplayRestaurants;
