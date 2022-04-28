import Card from "./Card";

const CardContainer = ({ burgerImages }) => {
	return (
		<div>
			{burgerImages.map((burgerImage) => {
				return <Card key={burgerImage.id} burgerImage={burgerImage} />;
			})}
		</div>
	);
};
export default CardContainer;
