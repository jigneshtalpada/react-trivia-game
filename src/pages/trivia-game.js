// TriviaGame.js
import React, { useState, useEffect } from 'react';
import Result from './results';
import Question from './questions';

const TriviaGame = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [gameFinished, setGameFinished] = useState(false);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10');
            const data = await response.json();
            setQuestions(data?.results);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };


    const handleAnswerSubmit = () => {
        const isCorrect = selectedAnswer === questions[currentIndex].correct_answer;
        if (isCorrect) {
            setScore(score + 1);
        }
        setCorrectAnswer(questions[currentIndex].correct_answer);
        setShowResult(true);
    };

    const handleNextQuestion = () => {
        setShowResult(false);
        setSelectedAnswer('');
        setCorrectAnswer('');
        if (currentIndex === questions.length - 1) {
            setGameFinished(true);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };


    useEffect(() => {

        fetchQuestions();
    }, []);

    return (
        <div className="app-container">
            <h1 className="title">Trivia Game</h1>
            {questions.length === 0 ? (
                <p>Loading questions...</p>
            ) : (
                !gameFinished ? (
                    !showResult ? (
                        <Question
                            question={questions[currentIndex]}
                            selectedAnswer={selectedAnswer}
                            setSelectedAnswer={setSelectedAnswer}
                            onSubmit={handleAnswerSubmit}
                        />
                    ) : (
                        <div className="result-box">
                            {selectedAnswer === correctAnswer ? (
                                <p className="correct-answer">🎉 Correct!</p>
                            ) : (
                                <>
                                    <p className="wrong-answer">❌ Wrong!</p>
                                    <p className="correct-info">The correct answer is: <strong>{correctAnswer}</strong></p>
                                </>
                            )}
                            <button className="next-btn" onClick={handleNextQuestion}>
                                {currentIndex === questions.length - 1 ? 'See Results' : 'Next Question'}
                            </button>
                        </div>
                    )
                ) : (
                    <Result totalQuestions={questions.length} correctAnswers={score} />
                )
            )}
        </div>
    );
};

export default TriviaGame;
