"use client";

import WordCard from "@/components/WordCard";
import { Container, Text, Button, Progress } from "@mantine/core";
import { IoMdClose } from "react-icons/io";

export default function quiz() {
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
      <WordCard />
    </Container>
  );
}
