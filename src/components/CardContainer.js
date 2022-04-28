import Card from "./Card";

const CardContainer = ({ addSubtotals, burgerImages }) => {
	return (
		<div>
			{burgerImages.map((burgerImage) => {
				return (
					<Card
						key={burgerImage.id}
						addSubtotals={addSubtotals}
						burgerImage={burgerImage}
					/>
				);
			})}
		</div>
	);
};
export default CardContainer;
