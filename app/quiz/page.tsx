"use client";

import WordCard from "@/components/Quiz/WordCard";
import WordQuiz from "@/components/Quiz/WordQuiz";
import { Container, Text, Button, Progress } from "@mantine/core";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Quiz, Question } from "@/types/database.types";

export default function QuizPage() {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [hasQuizEnded, setHasQuizEnded] = useState(false);

  async function fetchQuestions() {
    const res = await fetch("http://localhost:3000/api/question", {
      cache: "no-store",
    });
    const data = await res.json();
    return data.questions;
  }

  useEffect(() => {
    async function fetchData() {
      // const quizRes = await fetch("http://localhost:3000/api/quiz", {
      //   cache: "no-store",
      // });
      // const quizData = await quizRes.json();
      // setQuiz(quizData);

      const questionRes = await fetchQuestions();
      setQuestions(questionRes);
    }
    fetchData();
  }, []);

  const progressValue =
    ((currentQuestionIndex + 1) / (questions.length || 1)) * 100;

  const handleNextQuestion = (
    selectedAnswer: string,
    isAnswerCorrect: boolean
  ) => {
    if (isAnswerCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setHasQuizEnded(true);
    }
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  };

  return (
    <Container className="pb-15 text-center overflow-scroll">
      <div className="flex items-center justify-between pl-[10%] mb-2">
        <Progress
          color="yellow"
          value={progressValue}
          className="flex-grow mr-2 my-auto"
        />
        <Text className="text-xs opacity-70 my-auto mr-3">
          {currentQuestionIndex + 1} / {questions.length}
        </Text>
        <Button className="rounded-full p-2">
          {/* TODO: add onClick() */}
          <IoMdClose className="w-6 h-6 text-gray" />
        </Button>
      </div>
      {/* <WordCard /> */}
      {hasQuizEnded ? (
        <>
          <p className="my-10 text-xl tracking-wider leading-relaxed">
            Fertig! 🥳
            <br /> Du hast{" "}
            <span className="font-bold underline decoration-dashed p-2">
              {correctAnswersCount} / {questions.length}
            </span>
            <br />
            richtig geantwortet!
          </p>

          <table className="mx-auto w-[80%] border-t border-dashed text-left">
            <tbody>
              {questions.map((question, index) => (
                <tr key={question.id} className="border-b border-dashed">
                  <td className="p-2">{question.question} :</td>
                  <td
                    className={`border-sub p-2 ${
                      question.correctAnswer === userAnswers[index]
                        ? "text-green"
                        : "text-red/90"
                    }`}
                  >
                    {userAnswers[index]}
                  </td>
                  <td className="p-2">{question.correctAnswer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        questions[currentQuestionIndex] && (
          <WordQuiz
            question={questions[currentQuestionIndex]}
            onNext={handleNextQuestion}
          />
        )
      )}
    </Container>
  );
}
