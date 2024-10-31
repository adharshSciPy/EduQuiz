import React from 'react';
import '../assets/css/instruction.css'
const Instructions = ({ onStartQuiz }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="w-75 p-4 bg-light border rounded shadow">
        <header className="mb-4 text-center">
          <h1 className="display-4">Quiz Instructions</h1>
        </header>

        <main>
          <p className="mb-4">
            Welcome to the edu app! Please read the instructions below carefully before starting the quiz.
          </p>
          <ul className="text-start"  style={{ listStyleType: 'circle' }}>
            <li className="mb-2 ">You will have 60 seconds to answer each question.</li>
            <li className="mb-2 ">Once the time runs out, you will automatically be moved to the next question.</li>
            <li className="mb-2 ">There are multiple choice questions, and only one answer is correct for each question.</li>
            <li className="mb-2 ">You can navigate between questions using the "Previous" and "Next" buttons.</li>
            <li className="mb-2 ">Make sure to select your answer before the time runs out!</li>
            <li className="mb-2 ">You cannot revisit a question once you have moved on to the next one.</li>
            <li className="mb-2 ">Attempt to answer all the questions; unanswered questions will be marked as incorrect.</li>
            <li className="mb-2 ">Once you complete the quiz, your score will be calculated based on the number of correct answers.</li>
            <li className="mb-2 ">Try to stay focused and avoid distractions, as there is no pause option.</li>
            <li className="mb-2 ">Do not refresh the page during the quiz, as it will reset your progress.</li>
          </ul>
          <h5>Good luck, and give your best effort!</h5>
          <div className="d-flex justify-content-center mt-4">
            <button onClick={onStartQuiz} className="btn btn-primary">
              Start Quiz
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Instructions;
