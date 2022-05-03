const Modal = ({ modalBurger }) => {
	// close the modal when the user clicks on the X
	const handleModalClose = () => {
		const modalElem = document.querySelector("#modal");
		modalElem.style.display = "none";
	};

	// close the modal if the user clicks outside of modal
	window.onclick = (event) => {
		const modalElem = document.querySelector("#modal");
		if (event.target == modalElem) {
			modalElem.style.display = "none";
		}
	};

	// reset modal form (modal is purely aesthetic)
	const handleModalSubmit = (event) => {
		event.preventDefault();

		// reset form controls
		const formElem = document.querySelector("#modal-form");
		formElem.reset();

		handleModalClose();
	};

	return (
		<div id="modal" className="modal">
			<div className="modal-content">
				<span
					onClick={handleModalClose}
					className="close-modal"
					id="close-modal"
				>
					&times;
				</span>
				<form
					id="modal-form"
					action="submit"
					onSubmit={(event) => {
						handleModalSubmit(event);
					}}
				>
					<h2>{modalBurger}</h2>
					{/* Size */}
					<h3>Choose a size</h3>
					<div className="input-container">
						<input
							type="radio"
							id="burger-size-1"
							name="burger-size"
							value="Single"
						/>
						<label htmlFor="burger-size-1">Single Patty</label>
					</div>
					<div className="input-container">
						<input
							type="radio"
							id="burger-size-2"
							name="burger-size"
							value="Double"
						/>
						<label htmlFor="burger-size-2">Double Patties</label>
					</div>
					{/* Condiments */}
					<h3>Customize Your Burger</h3>
					<div className="input-container">
						<input
							type="checkbox"
							id="burger-topping-1"
							name="burger-topping-1"
							value="Bacon"
						/>
						<label htmlFor="burger-topping-1">Add Bacon</label>
					</div>
					<div className="input-container">
						<input
							type="checkbox"
							id="burger-topping-2"
							name="burger-topping-2"
							value="Lettuce"
						/>
						<label htmlFor="burger-topping-2">Add Lettuce</label>
					</div>
					<div className="input-container">
						<input
							type="checkbox"
							id="burger-topping-3"
							name="burger-topping-3"
							value="Caramelized Onions"
						/>
						<label htmlFor="burger-topping-3">
							Add Caramelized Onions
						</label>
					</div>
					<div className="input-container">
						<input
							type="checkbox"
							id="burger-topping-4"
							name="burger-topping-4"
							value="Extra Cheese"
						/>
						<label htmlFor="burger-topping-4">
							Add Extra Cheese
						</label>
					</div>
					<div className="input-container">
						<input
							type="checkbox"
							id="burger-topping-5"
							name="burger-topping-5"
							value="No Cheese"
						/>
						<label htmlFor="burger-topping-5">No Cheese</label>
					</div>
					<div className="input-container">
						<input
							type="checkbox"
							id="burger-topping-6"
							name="burger-topping-6"
							value="No Onions"
						/>
						<label htmlFor="burger-topping-6">No Onions</label>
					</div>
					{/* Special Instructions */}
					<h3>Special Instructions</h3>
					<div className="input-container">
						<label htmlFor="instructions" className="sr-only">
							Add a note
						</label>
						<input
							type="text"
							name="instructions"
							id="instructions"
							placeholder="Add a note"
						/>
					</div>
					{/* Add to order */}
					<input
						className="sm-button"
						type="submit"
						value="Update Preferences"
					/>
				</form>
			</div>
		</div>
	);
};
export default Modal;
