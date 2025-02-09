import { useState } from 'react';
import Logo from './Logo';
import Form from './Forms';

function App() {
	const [items, setItems] = useState([]);
	const [sortBy, setSortBy] = useState('input');

	function handleAddItems(newItem) {
		setItems((prevItems) => [...prevItems, newItem]);
	}

	let sortedItems;
	if (sortBy === 'input') {
		sortedItems = items;
	} else if (sortBy === 'description') {
		sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
	} else if (sortBy === 'packed') {
		sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));
	}

	const numItems = items.length;
	const numPacked = items.filter((item) => item.packed).length;
	const percentage = Math.round((numPacked / numItems) * 100);

	return (
		<div className='app'>
			<Logo />

			<Form onAddItems={handleAddItems} />

			

			<footer className='stats'>
				<em>
					{percentage === 100
						? 'You got everything! Ready to go ✈️'
						: ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
				</em>
			</footer>
		</div>
	);
}

export default App;
