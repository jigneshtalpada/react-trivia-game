import React from 'react';

const Question = ({ question, selectedAnswer, setSelectedAnswer, onSubmit }) => {
  const shuffledAnswers = [...question.incorrect_answers, question.correct_answer].sort();

  return (
    <div className="question-container">
    <h2 dangerouslySetInnerHTML={{ __html: question.question }} className="question" />
    <div className="answers">
      {shuffledAnswers.map((answer, index) => (
        <label key={index} className="answer-option">
          <input
            type="radio"
            name="answer"
            value={answer}
            checked={selectedAnswer === answer}
            onChange={() => setSelectedAnswer(answer)}
          />
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </label>
      ))}
    </div>
    <button disabled={!selectedAnswer} onClick={onSubmit} className="submit-btn">
      Submit
    </button>
  </div>
  );
};

export default Question;
