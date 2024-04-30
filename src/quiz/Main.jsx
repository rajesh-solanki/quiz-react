import React, { useState, useEffect } from 'react';
import "./style.css"
const questions = [
  {
    question: "Which monuments is this?",
    options: ["Lal-kila", "Alberthall", "JantarMantar", "AmberFort"],
    answer: "Lal-kila",
    image: "https://th.bing.com/th/id/OIP.BBqMJ6EQsz1yJ-2JKCXNawHaEU?w=1200&h=700&rs=1&pid=ImgDetMain" // URL of the image for the first question
  },
  {
    question: "Capital of France",
    options: ["Paris", "Marseille", "Lyon", "Toulouse",],
    answer: "Paris",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiVoQJvfQufxs_MaY172KyVWtUFs4gbOZmezY0S_hclQ&s" // URL of the image for the second question
  },
  {
    question: "3+3+3",
    options: [0, 333, 6, 9],
    answer: 9,
    
  },
  {
    question: "4*4/4",
    options: [4, 0, 8, 16],
    answer: 4,
   
  },
  {
          question: "What is the capital of India?",
          options: ["Delhi", "Mumbai", "Berlin", "Madrid"],
          answer: "Delhi",
          image: "https://th.bing.com/th/id/OIP.F4H8zeHW5ca9fWte1GVxqAHaF0?rs=1&pid=ImgDetMain" // Add image URL for the first question
        },
];

const Main = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5); // Initial timer value set to 5 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          handleNextQuestion();
          return 5; 
        } else {
          return prevTimer - 1; 
        }
      });
    }, 1000); // Update timer every second

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [currentQuestion]); // Run effect whenever currentQuestion changes

  const handleOptionSelect = option => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    setTimer(5); // Reset timer to 5 seconds for the next question
  };

  return (
    <div className="wrapper">
    <div className='quiz'>
      <h3>Quiz Application</h3>
      {currentQuestion < questions.length ? (
        <div>
          <h4>Time remaining: {timer} seconds</h4>
          {questions[currentQuestion].image && (
            <img src={questions[currentQuestion].image} alt="Question" style={{ maxWidth: '20%' }} />
          )}
          <h3>{questions[currentQuestion].question}</h3>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>Your score is: {score} out of {questions.length}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Main;