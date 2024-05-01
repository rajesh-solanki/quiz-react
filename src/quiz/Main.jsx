
import React, { useState, useEffect } from 'react';
import "./style.css";

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
  {
    question: "Which monument is this?",
    answer: "Kedarnath",
    isImageAnswer: true,
    options: [
      { text: "Kedarnath", image: "https://imgs.search.brave.com/QhiSDj-lbDDnKvtnpUo7xtUnURL4t4TVedw1uAIG0RY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9ibG9n/Z2VyLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9pbWcvYi9SMjl2/WjJ4bC9BVnZYc0Vn/elZ2ZEQ2ZDNVUHNo/Rkl5SmpwdXJySnRN/S2JCMW1SVFVmOXE5/R1JPRWl1SGR0MnB6/eXRFVXkzNWNYZzhQ/U2FUX053UTRjWFNa/V0tjVnNHcWdSNlRf/OVRFa3BDRExHTGNU/SmQ3ekdxN1piRnZf/TjhVdzhRNG9lRFRq/QVI4bmtkcVdXdS1V/RDRncXV6SFA0dk1j/VVRnT1pkY3FSR0h3/R2RIREZQQjRzYXZo/RmFYUHgtZWF2aGo1/RjRRLWEvdzQwMC1o/MzQ0L0Jlc3Qta2Vk/YXJuYXRoLWltYWdl/czEuanBn" },
      { text: "Badrinath", image: "https://imgs.search.brave.com/btOf2cQske-VMuPNOlCgIebbCAVCgiJrzk_KLBBAaKg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2hhcmRoYW0tcGls/Z3JpbWFnZS10b3Vy/LmNvbS9hc3NldHMv/aW1hZ2VzL2NoYW5k/aWdhcmgtY2hhcmRo/YW0ud2VicA" },
      { text: "Dwarka", image: "https://imgs.search.brave.com/FyzUTZbKA2ikZiCmr_Bbp7h1UjTgcefEl-y6fhsgfWI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTY2/MTU5Nzc1NS9waG90/by9ldmVuaW5nLWlt/YWdlLW9mLWEtbGln/aHQtaG91c2Utb24t/c2VhLXNob3JlLXdp/dGgtbmljZS1ibHVl/LXNreS1iYWNrZ3Jv/dW5kLWluLWR3YXJr/YS1ndWpyYXQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXp2/N0UtWU9hY0FqSFJy/UlJvaWlib2pvbmFM/dEltSEgtWmZhd1RY/eG44d1k9" },
      { text: "Rameswaram", image: "https://imgs.search.brave.com/eoDDSXUGAW_tD64cpg7qDy3qiq6DjCeVpCT-KqWaW9E/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ1/NzM3MzAxMi9waG90/by9pbWFnZS1vZi1p/bmRpYW4tdGVtcGxl/LWluLXJhbWVzaHdh/cmFtLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1oWTJoQzZZ/c1B5MXRyVmd5a3FN/c2tuMkdGTGEzTzln/dlBzNVJvSUJ1cGpv/PQ" },
    ],
  },
];

const Main = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (currentQuestion !== null && currentQuestion < questions.length) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            handleNextQuestion();
            return 5;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    } else if (currentQuestion === questions.length) {
      setIsQuizCompleted(true);
    }
  }, [currentQuestion]);

  const handleStartQuiz = () => {
    if (userName === "") {
      alert("Please enter your name")
    } else {
      setCurrentQuestion(0);
      setIsQuizStarted(true);
    }
  };

  const handleOptionSelect = option => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    setTimer(5);
  };

  return (
    <div className="quiz">
      <h1>Quiz Application</h1>
      {!isQuizStarted && !isQuizCompleted && (
        <div>
          <input type="text" placeholder="Enter your name" value={userName} onChange={(e) => setUserName(e.target.value)} className='names' />
          <button onClick={handleStartQuiz} className='start'>Start Quiz</button>
        </div>
      )}
      {isQuizStarted && currentQuestion !== null && currentQuestion < questions.length ? (
        <div>
          <h4>Time remaining: {timer} seconds</h4>
          <img src={questions[currentQuestion].image} alt="Question" style={{ maxWidth: '20%' }} />
          <h3>{questions[currentQuestion].question}</h3>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionSelect(option.text || option)}
                  disabled={selectedOption !== null}
                >
                  {option.image ? <img src={option.image} alt={option.text} style={{ width: '100px', height: '100px' }} /> : option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : isQuizCompleted && (
        <div className='inpmain'>
          <h2>Quiz completed!</h2>
          <p>Hi {userName}! Your score: {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Main;