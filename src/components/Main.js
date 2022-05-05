// components
import Card from "./Card";

const Main = ({ burgerProducts, addListItems, handleModalOpen }) => {
	return (
		<main>
			<section className="menu wrapper">
				<h2>Menu</h2>
				<div className="card-container">
					{burgerProducts.map((burgerProduct) => {
						return (
							<Card
								key={burgerProduct.key}
								addListItems={addListItems}
								burgerProduct={burgerProduct}
								handleModalOpen={handleModalOpen}
							/>
						);
					})}
				</div>
			</section>
		</main>
	);
};
export default Main;
