/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Container, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { Quiz } from "@/types/database.types";
import { MdNavigateNext } from "react-icons/md";
import QuizComponent from "@/components/Quiz/QuizComponent";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  async function fetchQuizzes() {
    const res = await fetch("http://localhost:3000/api/quiz", {
      cache: "no-store",
    });
    const data = await res.json();
    return data.quizzes;
  }

  useEffect(() => {
    async function fetchData() {
      const quizRes = await fetchQuizzes();
      setQuizzes(quizRes);
      setLoading(false);
    }
    fetchData();
  }, []);

  function handleQuizSelection(quizId: number) {
    setSelectedQuizId(quizId);
  }

  return (
    <Container className="text-center h-full pt-5">
      {selectedQuizId ? (
        <QuizComponent quizId={Number(selectedQuizId)} />
      ) : (
        <>
          <h2>Quiz auswählen und starten!</h2>
          <table className="mt-5 mx-auto w-[70%]">
            <thead>
              <tr className="border-b border-dashed text-left">
                <th className="p-2">Quiz</th>
                <th className="p-2">Niveau</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="border-b border-dashed">
                  <td className="py-2 px-4 text-left">{quiz.id} :</td>
                  <td className="p-2">
                    <Button
                      onClick={() => handleQuizSelection(quiz.id)}
                      className="flex items-center justify-between hover:cursor-pointer text-sub p-0"
                    >
                      {quiz.level}
                      <span className="ml-4 text-xl">
                        <MdNavigateNext />
                      </span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
            <div className="w-full">
              <Loader
                color="gray"
                size="lg"
                className="mx-auto text-center mt-10"
              />
            </div>
          )}
        </>
      )}
    </Container>
  );
}
