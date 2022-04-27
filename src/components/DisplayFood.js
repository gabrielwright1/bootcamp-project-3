const DisplayFood = ({ foodImages }) => {
	return (
		<div>
			<h2>Food Images</h2>
			<ul>
				{foodImages.map((foodImage) => {
					// console.log(foodImage);
					return (
						<li key={foodImage.id}>
							<img
								src={foodImage.urls.small}
								alt={foodImage.alt_description}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default DisplayFood;
