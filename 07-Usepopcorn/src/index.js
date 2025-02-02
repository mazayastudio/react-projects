import React from 'react';
import ReactDOM from 'react-dom/client';
import StarRating from './StarRating';
// import './index.css';
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <StarRating
      maxRating={5}
      messages={['Terrible', 'Bad', 'Ok', 'Good', 'Great']}
    />
    <StarRating
      maxRating={5}
      color="red"
      size={20}
      defaultRating={3}
      messages={['Terrible', 'Bad', 'Ok', 'Good', 'Great']}
    />
  </React.StrictMode>,
);

