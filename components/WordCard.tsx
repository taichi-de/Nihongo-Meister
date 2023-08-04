import {
  Container,
  Stack,
  Paper,
  Text,
  Popover,
  Button,
  Progress,
  Collapse,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { BsBookmark, BsBookmarkFill, BsVolumeUpFill } from "react-icons/bs";
import { RxTrackPrevious, RxTrackNext } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { useState } from "react";

export default function WordCard() {
  const [opened, { toggle }] = useDisclosure(false);
  const [save, setSave] = useState<boolean>(false);
  const text = ["Watashi", "ha", "Nihongo", "wo", "hanase", "masu"];
  const translation = ["Ich", "kann", "Japanisch", "sprechen"];

  return (
    <Container className="relative pt-5 pb-10 px-[10%] h-screen text-center text-sub bg-gradient-to-b from-main via-secondary to-main">
      <Button className="absolute top-5 right-5 rounded-full p-2">
        {/* TODO: add onClick() */}
        <IoMdClose className="w-6 h-6 text-gray" />
      </Button>
      <Stack>
        <div className="flex align-middle px-[10%] mb-2">
          <Progress
            color="yellow"
            value={40}
            className="flex-grow mr-2 my-auto"
          />
          <Text className="text-xs opacity-70 my-auto mr-3">4 / 10</Text>
        </div>
        <Image
          src="/nihongo.png"
          alt="image"
          width="200"
          height="0"
          className="bg-gray-200 mx-auto"
        />
        <h1 className="flex align-middle text-5xl my-2 mx-auto font-bold">
          Nihongo
          <span className="bg-secondary/70 rounded-full mt-2 ml-2 p-2 text-lg">
            {save ? (
              <BsBookmarkFill
                className="w-5 h-5"
                onClick={() => setSave(false)}
              />
            ) : (
              <BsBookmark className="w-5 h-5" onClick={() => setSave(true)} />
            )}
          </span>
        </h1>
        <h2>[日本語] [Nihon-go]</h2>
        <div className="flex align-middle justify-center w-[50%] mx-auto opacity-70 text-sm">
          <Text>Bedeutung:</Text>
          <div className="my-auto ml-2">
            {opened ? (
              <IoIosArrowUp onClick={toggle} />
            ) : (
              <IoIosArrowDown onClick={toggle} />
            )}
          </div>
        </div>
        {opened && (
          <Collapse in={opened} transitionDuration={700}>
            <p className="text-sub mb-4">Japanisch</p>
            <Paper className="p-6 bg-main/50 shadow-sm rounded-xl text-sub text-left">
              <Text>
                Z.B.) <br />
                {/* {text.split(" ").map((word, i) => (
              <Tooltip label="Ich" key={i}>
                <span className="underline decoration-dashed">{word} </span>
              </Tooltip>
            ))} */}
                <Popover position="top" withArrow shadow="md">
                  <Popover.Target>
                    <span className="underline decoration-dashed">
                      Watashi{" "}
                    </span>
                  </Popover.Target>
                  <Popover.Dropdown className="py-1 bg-gray-300">
                    <Text size="sm" color="black">
                      Ich
                    </Text>
                  </Popover.Dropdown>
                </Popover>
                <span className="underline decoration-dashed">
                  ha Nihongo wo hanasemasu.
                </span>
              </Text>
              <Text className="mt-4 opacity-70">
                Ich kann Japanisch sprechen.
              </Text>
            </Paper>
          </Collapse>
        )}
        <div className="flex justify-between w-[60%] mt-2 mx-auto text-white text-lg">
          <Button className="bg-third/70 rounded-full p-1 text-lg">
            <RxTrackPrevious className="w-6 h-6" />
          </Button>
          <Button className="bg-third/70 rounded-full p-1 text-lg">
            <BsVolumeUpFill className="w-6 h-6" />
          </Button>
          <Button className="bg-third/70 rounded-full p-1 text-lg">
            <RxTrackNext className="w-6 h-6" />
          </Button>
        </div>
      </Stack>
    </Container>
  );
}
