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
				<form action="submit">
					<h2>{modalBurger}</h2>

					{/* Size */}
					<p>Choose a size</p>
					<input
						type="radio"
						id="burger-size-1"
						name="burger-size"
						value="Single"
					/>
					<label htmlFor="burger-size-1">Single Patty</label>
					<input
						type="radio"
						id="burger-size-2"
						name="burger-size"
						value="Double"
					/>
					<label htmlFor="burger-size-2">Double Patties</label>
					{/* Condiments */}
					<p>Customize Your Burger</p>
					<input
						type="checkbox"
						id="burger-option-1"
						name="burger-option-1"
						value="Bacon"
					/>
					<label htmlFor="burger-option-1">Add Bacon</label>

					<input
						type="checkbox"
						id="burger-option-2"
						name="burger-option-2"
						value="Lettuce"
					/>
					<label htmlFor="burger-option-2">Add Lettuce</label>

					<input
						type="checkbox"
						id="burger-option-3"
						name="burger-option-3"
						value="Caramelized Onions"
					/>
					<label htmlFor="burger-option-3">
						Add Caramelized Onions
					</label>

					<input
						type="checkbox"
						id="burger-option-4"
						name="burger-option-4"
						value="Extra Cheese"
					/>
					<label htmlFor="burger-option-4">Add Extra Cheese</label>

					<input
						type="checkbox"
						id="burger-option-5"
						name="burger-option-5"
						value="No Cheese"
					/>
					<label htmlFor="burger-option-5">No Cheese</label>

					<input
						type="checkbox"
						id="burger-option-6"
						name="burger-option-6"
						value="No Onions"
					/>
					<label htmlFor="burger-option-6">No Onions</label>
					{/* Special Instructions */}
					<p>Special Instructions</p>
					<input type="text" name="instructions" id="instructions" />
					{/* Add to order */}
					<input type="submit" value="Add to order" />
				</form>
			</div>
		</div>
	);
};
export default Modal;
