import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Card } from "antd";
import { v4 } from "uuid";
import { submitSurvey } from "../../Redux/Actions/index";
import { surveySample } from "./SurveySample";

const quiz = surveySample.questions;

function Survey() {
  const dispatch = useDispatch();
  const [cooldown, setCooldown] = useState(false);
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
      <Card>
        <div className="juego-terminado">
          <span>
            <p>These are your answers for the survey:</p>
            {quiz.map((question, index) => (
              <div key={index}>
                <p>{question.text} : </p>
                <p>{userAnswers[index]}</p>
              </div>
            ))}
          </span>
          <Button
            onClick={() => {
              handleSubmitSurvey(userAnswers);
            }}
          >
            Finish Quiz!
          </Button>
        </div>
      </Card>
    );

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          src={quiz[actualQuestion].image}
          alt={quiz[actualQuestion].text}
          key={v4()}
        />
      }
    >
      <div className="lado-izquierdo">
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
