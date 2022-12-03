import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { v4 } from "uuid";
import { submitSurvey } from "../../Redux/Actions/index";
import { surveySample } from "./SurveySample";

const quiz = surveySample.questions;

function Survey() {
  const [actualQuestion, setActualQuestion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    quiz[actualQuestion].lifetimeSeconds
  );
  const [areDisabled, setAreDisabled] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  function handleAnswerSubmit(answer: string) {
    setTimeout(() => {
      if (actualQuestion === quiz.length - 1) {
        setIsFinished(true);
      } else {
        setActualQuestion(actualQuestion + 1);
      }
    }, 200);
    setUserAnswers([...userAnswers, answer]);
    setTimeLeft(quiz[actualQuestion + 1].lifetimeSeconds);
  }

  function handleSubmitSurvey(userAnswers) {
    submitSurvey(userAnswers);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) setTimeLeft((prev) => prev - 1);
      if (timeLeft === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (isFinished)
    return (
      <Card style={{ width: 380 }}>
        <div className="game-over">
          <span>
            <h3>These were your answers:</h3>
            {quiz.map((question, index) => (
              <div key={index}>
                <p>
                  <b>{question.text}</b> :{" "}
                </p>
                <p>{userAnswers[index]}</p>
              </div>
            ))}
          </span>
          <Button
            onClick={() => {
              handleSubmitSurvey(userAnswers);
            }}
          >
            Submit Answers!
          </Button>
        </div>
      </Card>
    );

  return (
    <Card
      hoverable
      style={{ width: 380 }}
      cover={
        <img
          src={quiz[actualQuestion].image}
          alt={quiz[actualQuestion].text}
          key={v4()}
        />
      }
    >
      <div className="question-card">
        <p> Question {actualQuestion + 1} from</p> {quiz.length}
        <p>{quiz[actualQuestion].text}</p>
        <div>
          {!areDisabled ? (
            <span className="tiempo-restante">Time Left: {timeLeft} </span>
          ) : (
            <Button
              onClick={() => {
                setUserAnswers([...userAnswers, "Answer not given"]);
                setAreDisabled(false);
                setTimeLeft(quiz[actualQuestion + 1].lifetimeSeconds);
                setActualQuestion(actualQuestion + 1);
              }}
            >
              Next Question
            </Button>
          )}
        </div>
      </div>
      <div className="option-buttons">
        {quiz[actualQuestion].options.map((res) => (
          <Button
            disabled={areDisabled}
            key={res.text}
            onClick={() => handleAnswerSubmit(res.text)}
          >
            {res.text}
          </Button>
        ))}
      </div>
    </Card>
  );
}

export default Survey;
