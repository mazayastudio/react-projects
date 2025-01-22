import { useState } from 'react';

const messages = ['Learn React ⚛️', 'Apply for jobs 💼', 'Invest your new income 🤑'];

function App() {
	return <Steps />;
}

function Steps() {
	const [step, setStep] = useState(1);

	function handlePrevious() {
		setStep((currStep) => (currStep > 1 ? currStep - 1 : currStep));
	}

	function handleNext() {
		setStep((currStep) => (currStep <= 3 ? currStep + 1 : currStep));
	}
	return (
		<div>
			<button className='close'>&times;</button>

			<div className='steps'>
				<div className='numbers'>
					<div className={step >= 1 ? 'active' : ''}>1</div>
					<div className={step >= 2 ? 'active' : ''}>2</div>
					<div className={step >= 3 ? 'active' : ''}>3</div>
				</div>

				<div className='message'>
					<h3>Step: {step}</h3>
					<p>{messages[step - 1]}</p>
				</div>

				<div className='buttons'>
					<button style={{ backgroundColor: '#7950f2', textColor: '#fff' }} onClick={handlePrevious}>
						<span>👈</span> Previous
					</button>
					<button style={{ backgroundColor: '#7950f2', textColor: '#fff' }} onClick={handleNext}>
						Next <span>👉</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
