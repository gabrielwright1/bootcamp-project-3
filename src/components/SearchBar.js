import { useState } from "react";

const SearchBar = ({ getRestaurants }) => {
	// state
	const [userChoice, setUserChoice] = useState("");

	// handler
	const handleUserChoice = (e) => {
		setUserChoice(e.target.value);
	};

	return (
		<form onSubmit={(e) => getRestaurants(e, userChoice)}>
			<label htmlFor="search"></label>
			<input
				type="text"
				name="search"
				id="search"
				onChange={handleUserChoice}
				value={userChoice}
			/>
			<button type="submit">Search</button>
		</form>
	);
};
export default SearchBar;
