"use client";

import WordQuiz from "@/components/Quiz/WordQuiz";
import {
  Container,
  Text,
  Button,
  Progress,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Question } from "@/types/database.types";

type Props = {
  quizId: number;
};

export default function QuizComponent({ quizId }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [hasQuizEnded, setHasQuizEnded] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  async function fetchQuestions() {
    const res = await fetch(
      `http://localhost:3000/api/question?quizId=${quizId}`
    );
    const data = await res.json();
    return data.questions.filter(
      (question: Question) => question.quizId === quizId
    );
  }

  useEffect(() => {
    async function fetchData() {
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
    <Container className="text-center h-full overflow-y-scroll">
      {hasQuizEnded ? (
        <>
          <p className="mt-4 mb-10 text-xl tracking-wider leading-relaxed">
            Fertig! 🥳
            <br />
            <span className="font-bold underline decoration-dashed p-2">
              {correctAnswersCount} / {questions.length}
            </span>
            waren Korrekt!
          </p>

          <table className="mx-auto border-t border-dashed text-left">
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

          <Button
            onClick={() => window.location.reload()}
            className="bg-secondary/90 my-7"
          >
            Zurück zum Quiz
          </Button>
        </>
      ) : (
        questions[currentQuestionIndex] && (
          <>
            <div className="flex items-center justify-between pl-[10%]">
              <Progress
                color="yellow"
                value={progressValue}
                className="flex-grow mr-2 my-auto"
              />
              <Text className="text-xs opacity-70 my-auto mr-3">
                {currentQuestionIndex + 1} / {questions.length}
              </Text>
              <Button className="rounded-full p-2" onClick={open}>
                <IoMdClose className="w-6 h-6 text-gray" />
              </Button>
              <Modal
                opened={opened}
                onClose={close}
                title="Möchtest du wirklich aufhören?"
                overlayProps={{
                  color: theme.colors.dark[6],
                  opacity: 0.55,
                  blur: 3,
                }}
                size="xs"
                centered
                className="text-center"
              >
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-red/90"
                >
                  aufhören
                </Button>
              </Modal>
            </div>
            <WordQuiz
              question={questions[currentQuestionIndex]}
              onNext={handleNextQuestion}
            />
          </>
        )
      )}
    </Container>
  );
}
