/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useDisclosure } from "@mantine/hooks";
import { Paper, Text, Popover, Collapse, Tooltip } from "@mantine/core";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { Database } from "../../types/database.types";

async function fetchVocabs() {
  const res = await fetch("http://localhost:3000/api/vocabulary", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log("Fetched Data:", data);
  return data.vocabs;
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
};

const dictionary = async () => {
  const [vocabs, setVocabs] = useState<Database[]>([]);
  console.log(vocabs);
  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchVocabs();
      setVocabs(result);
    };
    fetchData();
  }, []);

  return (
    <div className="px-[5%]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between"
      >
        <input
          placeholder="Z. B. Neko"
          type="text"
          className="bg-white/80 text-gray rounded-md w-auto p-2"
        />
        <button className="font-semibold m-0 py-2 px-4 shadow-xl bg-secondary/80 rounded-lg hover:opacity-70">
          Suchen
        </button>
      </form>
      {vocabs &&
        vocabs.map((vocab: any) => {
          const sentenceWords = vocab.sentence.split(" ");
          const sentenceTranslationWords = vocab.sentenceTranslation.split(" ");
          console.log(sentenceWords);
          console.log(sentenceTranslationWords);
          return (
            <div
              key={vocab.id}
              className="flex flex-col text-main bg-white/50 mt-4 rounded-md"
            >
              <div className="flex items-center justify-between w-full overflow-auto py-2 px-4">
                <p className="font-semibold">{vocab.word}</p>
                <p>({vocab.partOfSpeech.slice(0, 3)}.)</p>
                <p>{vocab.level}</p>
                <p>{vocab.inJapanese}</p>
                {opened ? (
                  <IoIosArrowUp onClick={toggle} />
                ) : (
                  <IoIosArrowDown onClick={toggle} />
                )}
              </div>
              <div>
                {/* {opened && ( */}
                <Collapse in={opened} transitionDuration={700}>
                  <Paper className="py-2 px-4 w-full text-main" unstyled>
                    <Text>
                      Z.B.)
                      {sentenceWords.map(({ sentenceWord, i }: any) => (
                        <Popover position="top" withArrow shadow="md" key={i}>
                          <Popover.Target>
                            <Text className="underline decoration-dashed px-1">
                              {sentenceWord}
                            </Text>
                          </Popover.Target>
                          <Popover.Dropdown className="py-1 bg-gray">
                            <Text size="sm">{sentenceTranslationWords[i]}</Text>
                          </Popover.Dropdown>
                        </Popover>
                      ))}
                    </Text>
                  </Paper>
                </Collapse>
                {/* )} */}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default dictionary;
