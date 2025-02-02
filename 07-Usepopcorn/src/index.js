import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import StarRating from './StarRating';
// import './index.css';
// import App from './App';

const Test = () => {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating
        color="blue"
        maxRating={10}
        onSetRating={setMovieRating}
      />
      <p>This moves was rated {movieRating} stars</p>
    </div>
  );
};

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

    <Test />
  </React.StrictMode>,
);

