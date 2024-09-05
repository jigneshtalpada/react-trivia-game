import React from 'react';

const Result = ({ totalQuestions, correctAnswers }) => {
  return (
    <div className="result-container">
      <h2 className="result-title">Game Over!</h2>
      <p>Total Questions: <strong>{totalQuestions}</strong></p>
      <p>Correct Answers: <strong>{correctAnswers}</strong></p>
      <p>Incorrect Answers: <strong>{totalQuestions - correctAnswers}</strong></p>
      <button className="play-again-btn" onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
};

export default Result;
