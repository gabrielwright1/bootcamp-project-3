// components
import Header from "./Header";
import Main from "./Main";

const ContentWrapper = ({
	burgers,
	total,
	burgerProducts,
	addListItems,
	handleRemove,
	handleCheckout,
	handleModalOpen,
}) => {
	return (
		<div className="bg-img-container wrapper">
			<Header
				burgers={burgers}
				total={total}
				handleRemove={handleRemove}
				handleCheckout={handleCheckout}
			/>
			<Main
				burgerProducts={burgerProducts}
				addListItems={addListItems}
				handleModalOpen={handleModalOpen}
			/>
		</div>
	);
};
export default ContentWrapper;
