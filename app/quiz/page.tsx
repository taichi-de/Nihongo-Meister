"use client";

import WordCard from "@/components/WordCard";
import WordQuiz from "@/components/WordQuiz";
import { Container, Text, Button, Progress } from "@mantine/core";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Quiz, Question } from "@/types/database.types";

export default function Quiz() {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

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
      console.log("questions: " + questions);
    }

    fetchData();
  }, []);

  return (
    <Container className="pb-15 text-center overflow-scroll">
      <div className="flex items-center justify-between pl-[10%] mb-2">
        <Progress
          color="yellow"
          value={40}
          className="flex-grow mr-2 my-auto"
        />
        <Text className="text-xs opacity-70 my-auto mr-3">4 / 10</Text>
        <Button className="rounded-full p-2">
          {/* TODO: add onClick() */}
          <IoMdClose className="w-6 h-6 text-gray" />
        </Button>
      </div>
      {/* <WordCard /> */}
      {/* {questions ? ( */}

      {questions.map((question: Question) => (
        <WordQuiz question={question} key={question.id} />
      ))}

      {/* ) : (
        <p className="mt-16">Loading...</p>
      )} */}
    </Container>
  );
}
