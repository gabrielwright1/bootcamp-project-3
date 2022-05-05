// components
import ShoppingCart from "./ShoppingCart";

const Header = ({ burgers, total, handleRemove, handleCheckout }) => {
	return (
		<header>
			<div className="header-container wrapper">
				<div className="title-container">
					<h1>Mel's Drive-In</h1>
				</div>
				<div className="header-inner-container">
					<div className="img-container">
						<img
							src="https://images.unsplash.com/photo-1513918573039-35f42ae13895?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
							alt="an old 50s car in front of a diner"
						/>
					</div>
					<ShoppingCart
						burgers={burgers}
						total={total}
						handleRemove={handleRemove}
						handleCheckout={handleCheckout}
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
