function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  // Extracted function for class logic
  const getOptionClass = (index) => {
    if (index === answer) return 'answer';
    if (hasAnswered) {
      return index === question.correctOption ? 'correct' : 'wrong';
    }
    return '';
  };

  return (
    <div className='options'>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${getOptionClass(index)}`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;