/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Bookmarks, Vocabulary } from "@/types/database.types";
import { Loader } from "@mantine/core";
import { IoMdClose } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { Text, Popover, Collapse } from "@mantine/core";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Bookmarks() {
  const [bookmarksWithWords, setBookmarksWithWords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [opened, setOpened] = useState<boolean[]>([]);

  async function fetchBookmarks() {
    const res = await fetch("http://localhost:3000/api/bookmarks", {
      cache: "no-store",
    });
    const data = await res.json();
    return data.bookmarks;
  }

  async function fetchVocabulary() {
    const response = await fetch("http://localhost:3000/api/vocabulary", {
      cache: "no-store",
    });
    const data = await response.json();
    return data.vocabs || [];
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const bookmarks = await fetchBookmarks();
        const vocabulary = await fetchVocabulary();

        const combinedData = bookmarks.map((bookmark: Bookmarks) => {
          const vocabItem =
            vocabulary &&
            vocabulary.find(
              (vocab: Vocabulary) => vocab.id === bookmark.vocabId
            );
          return {
            ...bookmark,
            word: vocabItem.word,
            partOfSpeech: vocabItem.partOfSpeech,
            translation: vocabItem.translation,
            inJapanese: vocabItem.inJapanese,
            sentence: vocabItem.sentence,
            sentenceTranslation: vocabItem.sentenceTranslation,
            level: vocabItem.level,
          };
        });
        setBookmarksWithWords(combinedData);
        console.log(combinedData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleRemoveBookmark = async (bookmarkId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/bookmarks?id=${bookmarkId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setBookmarksWithWords((prevBookmarks) =>
          prevBookmarks.filter((b) => b.id !== bookmarkId)
        );
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  const toggleCollapse = (index: number) => {
    setOpened((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <>
      <h2 className="text-center text-white/80 text-semibold" text-xl>
        Deine Lesezeichen
      </h2>
      {bookmarksWithWords ? (
        bookmarksWithWords.map(
          (bookmarksWithWord: Vocabulary, index: number) => {
            const sentenceWords = bookmarksWithWord.sentence?.split(", ");
            const sentenceTranslationWords =
              bookmarksWithWord.sentenceTranslation?.split(", ");
            return (
              <div
                key={bookmarksWithWord.id}
                className="flex flex-col text-main bg-white/50 w-[85%] my-4 mx-auto py-2 px-4 rounded-md"
              >
                <div className="flex items-center justify-between w-full overflow-auto">
                  <BsBookmark
                    onClick={() => handleRemoveBookmark(bookmarksWithWord.id)}
                  />
                  <p className="font-semibold">{bookmarksWithWord.word}</p>
                  <p>({bookmarksWithWord.partOfSpeech.slice(0, 3)}.)</p>
                  <p>{bookmarksWithWord.translation}</p>
                  <p>{bookmarksWithWord.inJapanese}</p>
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
          }
        )
      ) : (
        <p className="mt-10 text-center text-white/80">
          Du hast noch kein Wort gespeichert.
        </p>
      )}
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
  );
}
