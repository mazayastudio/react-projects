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
				<StepButton step={step} />

				<StepMessage step={step} />

				<StepNav handlePrevious={handlePrevious} handleNext={handleNext} />
			</div>
		</div>
	);
}

function StepButton({ step }) {
	return (
		<div className='numbers'>
			<div className={step >= 1 ? 'active' : ''}>1</div>
			<div className={step >= 2 ? 'active' : ''}>2</div>
			<div className={step >= 3 ? 'active' : ''}>3</div>
		</div>
	);
}

function StepMessage({ step }) {
	return (
		<div className='message'>
			<h3>Step: {step}</h3>
			<p>{messages[step - 1]}</p>
		</div>
	);
}

function StepNav({ handlePrevious, handleNext }) {
	return (
		<div className='buttons'>
			<ButtonNav style={{ backgroundColor: '#7950f2', textColor: '#fff' }} onClick={handlePrevious}>
				<span>👈</span> Previous
			</ButtonNav>
			<ButtonNav style={{ backgroundColor: '#7950f2', textColor: '#fff' }} onClick={handleNext}>
				Next <span>👉</span>
			</ButtonNav>
		</div>
	);
}
function ButtonNav({ onClick, children }) {
	return (
		<button style={{ backgroundColor: '#7950f2', textColor: '#fff' }} onClick={onClick}>
			{children}
		</button>
	);
}

export default App;
