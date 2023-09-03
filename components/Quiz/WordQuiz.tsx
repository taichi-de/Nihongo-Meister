import { Question } from "@/types/database.types";
import { useState, useEffect } from "react";

type Props = {
  question: Question;
  onNext: (selectedAnswer: string, isCorrect: boolean) => void;
};

const WordQuiz = ({ question, onNext }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setTimeout(() => onNext(answer, correct), 1500);
  };

  return (
    <>
      <div className="my-5 text-center">
        <h2 className="font-bold text-xl my-10">
          Was heißt: &quot;{question.question}&quot; ?
        </h2>
        <div className="grid grid-cols-2 gap-2 my-5">
          {question.answerOptions.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className={`bg-white/50 h-20 rounded-md p-4 ${
                selectedAnswer === option
                  ? isCorrect
                    ? "focus:bg-third/70"
                    : "focus:bg-red/70"
                  : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedAnswer && (
          <p
            className={`mt-5 ${
              isCorrect === true ? "text-green" : "text-orange"
            }`}
          >
            {isCorrect ? "Exakt!" : "Falsch!"}
          </p>
        )}
      </div>
    </>
  );
};

export default WordQuiz;
