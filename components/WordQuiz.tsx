import { Question } from "@/types/database.types";
import { useState } from "react";

type Props = {
  question: Question;
};

const WordQuiz = ({ question }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === question.correctAnswer);
  };

  return (
    <>
      {/* {questions.map((question: Question) => ( */}
      <div className="my-4 text-center">
        <h2 className="font-bold">{question.question}</h2>
        <div className="grid grid-cols-2 gap-2 my-2">
          {question.answerOptions.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className={`bg-white/50 rounded-md p-4 ${
                isCorrect ? "focus:bg-third/70" : "focus:bg-orange/50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedAnswer && (
          <p className={`${isCorrect ? "text-green" : "text-orange"}`}>
            {isCorrect ? "Exakt!" : "Falsch, Versuch noch Mal!"}
          </p>
        )}
      </div>
    </>
  );
};

export default WordQuiz;
