import Card from "./Card";

const CardContainer = ({ addListItems, burgerImages }) => {
	return (
		<div>
			{burgerImages.map((burgerImage) => {
				return (
					<Card
						key={burgerImage.id}
						addListItems={addListItems}
						burgerImage={burgerImage}
					/>
				);
			})}
		</div>
	);
};
export default CardContainer;
