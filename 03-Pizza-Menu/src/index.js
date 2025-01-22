import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
	{
		name: 'Focaccia',
		ingredients: 'Bread with italian olive oil and rosemary',
		price: 6,
		photoName: 'pizzas/focaccia.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Margherita',
		ingredients: 'Tomato and mozarella',
		price: 10,
		photoName: 'pizzas/margherita.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Spinaci',
		ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
		price: 12,
		photoName: 'pizzas/spinaci.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Funghi',
		ingredients: 'Tomato, mozarella, mushrooms, and onion',
		price: 12,
		photoName: 'pizzas/funghi.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Salamino',
		ingredients: 'Tomato, mozarella, and pepperoni',
		price: 15,
		photoName: 'pizzas/salamino.jpg',
		soldOut: true,
	},
	{
		name: 'Pizza Prosciutto',
		ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
		price: 18,
		photoName: 'pizzas/prosciutto.jpg',
		soldOut: false,
	},
];

function App() {
	const style = { color: 'red', fontSize: '48px', textTransform: 'uppercase' };
	const pizzas = pizzaData;
	const numPizzas = pizzas.length;
	return (
		<div className='container'>
			<header className='header'>
				<h1 style={style}>Fast React Pizza Co.</h1>
			</header>

			<main className='menu'>
				<h2>Our menu</h2>

				{numPizzas > 0 ? (
					<>
						<p>
							Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all
							delicious
						</p>
						.
						<ul className='pizzas'>
							{pizzas.map((pizza) => (
								<li>
									<img src={pizza.photoName} alt={pizza.name} />
									<div>
										<h3>{pizza.name}</h3>
										<p>{pizza.ingredients}</p>
										<span>{pizza.soldOut ? 'SOLD OUT' : pizza.price}</span>
									</div>
								</li>
							))}
						</ul>
					</>
				) : (
					<p>We're still working on our menu. Please come back later 🙂</p>
				)}
			</main>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
