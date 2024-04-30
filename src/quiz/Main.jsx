import React, { useEffect, useState } from "react";
import { data } from "./data";
import "./style.css";

function Main() {
  const [showScore, setShowScore] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(20);

  function calculateScore() {
    let score = 0;
    for (let i = 0; i < data.length; i++) {
      if (userAnswers[i] === data[i].answer.toString()) {
        score++;
      }
    }
    return score;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0 || questionNumber === data.length - 1) {
        clearInterval(interval);
        setShowScore(true);
      } else {
        setTimer(timer - 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [timer, questionNumber]);

  useEffect(() => {
    setUserAnswers([...userAnswers, selectedOption]);
  }, [selectedOption]);

  const handleNextQuestion = () => {
    if (questionNumber < data.length - 1) {
      setQuestionNumber(questionNumber + 1);
      setTimer(20); // Reset timer for the next question
    } else {
      setShowScore(true);
    }
  };

  return (
    <>
      {showScore ? (
        <div id="score">
          <h3>
            Tumhara score hai {calculateScore()} out of {data.length}
          </h3>
        </div>
      ) : (
        <div id="quiz">
          <h3>{data[questionNumber]?.question}</h3> 
          <div className="options">
            {data[questionNumber]?.options.map((option, index) => ( 
              <label key={index}>
                <input
                  type="radio"
                  name="opt"
                  value={option}
                  onClick={() => setSelectedOption(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <div>
            <p>Time left: {timer} seconds</p>
            <button onClick={handleNextQuestion}>Next</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
