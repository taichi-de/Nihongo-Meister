"use client";

import { useState, useEffect } from "react";
import { Text, Popover, Collapse } from "@mantine/core";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Vocabulary } from "../../types/database.types";

function Dictionary() {
  const [vocabs, setVocabs] = useState<Vocabulary[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [opened, setOpened] = useState<boolean[]>([]);

  async function fetchVocabs() {
    const res = await fetch("http://localhost:3000/api/vocabulary", {
      cache: "no-store",
    });
    const data = await res.json();
    // console.log("Fetched Data:", data);
    return data.vocabs;
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetchVocabs();
      setVocabs(result);
      setOpened(new Array(result.length).fill(false));
    }
    fetchData();
  }, []);

  const filteredVocabs = vocabs.filter((vocab) =>
    vocab.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const toggleCollapse = (index: number) => {
    setOpened((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="px-[5%]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between px-4"
      >
        <input
          placeholder="Z. B. Neko"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/80 text-main rounded-md w-auto mr-1 p-2"
        />
        <button className="font-semibold m-0 py-2 px-4 shadow-xl bg-secondary/80 rounded-lg hover:opacity-70">
          Suchen
        </button>
      </form>
      <div className="py-8 px-4">
        {filteredVocabs &&
          filteredVocabs.slice(0, 7).map((vocab: any, index: number) => {
            const sentenceWords = vocab.sentence?.split(", ");
            const sentenceTranslationWords =
              vocab.sentenceTranslation?.split(", ");
            return (
              <div
                key={vocab.id}
                className="flex flex-col text-main bg-white/50 mb-4  py-2 px-4 rounded-md"
              >
                <div className="flex items-center justify-between w-full overflow-auto">
                  <p className="font-semibold">{vocab.word}</p>
                  <p>({vocab.partOfSpeech.slice(0, 3)}.)</p>
                  <p>{vocab.translation}</p>
                  <p>{vocab.inJapanese}</p>
                  {opened[index] ? (
                    <IoIosArrowUp onClick={() => toggleCollapse(index)} />
                  ) : (
                    <IoIosArrowDown onClick={() => toggleCollapse(index)} />
                  )}
                </div>
                {opened[index] && (
                  <Collapse in={true} transitionDuration={700}>
                    <div className="flex flex-wrap mt-2">
                      <Text>Z.B.) </Text>
                      {sentenceWords?.map((sentenceWord: string, i: number) => (
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
                    </div>
                  </Collapse>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Dictionary;

// id,quizId,questionType,question,answerOptions,correctAnswer
// 2,1,Wort,Genki,"[""glücklich"", ""traurig"", ""müde"", ""wütend""]",glücklich
// 3,1,Wort,Ringo,"[""Apfel"", ""Banane"", ""Orange"", ""Erdbeere""]",Apfel
// 4,2,Wort,Biru,"[""Haus"", ""Baum"", ""Auto"", ""Gebäude""]",Gebäude
// 5,2,Wort,Takai,"[""hoch"", ""niedrig"", ""groß"", ""klein""]",hoch
// 6,2,Wort,Taberu,"[""essen"", ""trinken"", ""schlafen"", ""laufen""]",essen
// 7,3,Wort,Inu,"[""Hund"", ""Katze"", ""Maus"", ""Vogel""]",Hund
// 8,3,Wort,Tsuki,"[""Mond"", ""Sonne"", ""Stern"", ""Wolke""]",Mond
// 9,3,Wort,Ame,"[""Regen"", ""Schnee"", ""Wind"", ""Sonne""]",Regen
// 10,3,Wort,Natsu,"[""Sommer"", ""Herbst"", ""Winter"", ""Frühling""]",Sommer
