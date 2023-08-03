import { Container, Stack, Paper, Text, Popover } from "@mantine/core";
import Image from "next/image";
import { BsBookmark, BsVolumeUpFill } from "react-icons/bs";
import { GrNext } from "react-icons/gr";

export default function WordCard() {
  const text = "Watashi ha Nihongo wo hanasemasu.";
  const translation = ["Ich", "kann", "Japanisch", "sprechen"];
  return (
    <Container className="pt-40 px-[10%] text-center text-gray-200">
      <Stack>
        <Image
          src="/nihongo.png"
          alt=""
          width="200"
          height="0"
          className="bg-orange-200 mx-auto"
        />
        <h1 className="font-bold">Nihongo</h1>
        <h2 className="">[日本語] [Nihon-go]</h2>
        <p>
          <span className="opacity-70 text-sm mr-2">Bedeutung:</span>
          Japanisch
        </p>
        <Paper className="p-4 bg-blue-900/70 rounded-md text-gray-200 text-left">
          <Text>
            Z.B.) <br />
            {/* {text.split(" ").map((word, i) => (
              <Tooltip label="Ich" key={i}>
                <span className="underline decoration-dashed">{word} </span>
              </Tooltip>
            ))} */}
            <Popover position="top" withArrow shadow="md">
              <Popover.Target>
                <span className="underline decoration-dashed">Watashi </span>
              </Popover.Target>
              <Popover.Dropdown className="py-1">
                <Text size="sm" color="black">
                  Ich
                </Text>
              </Popover.Dropdown>
            </Popover>
            <span className="underline decoration-dashed">
              ha Nihongo wo hanasemasu.
            </span>
          </Text>
          <Text className="opacity-70">Ich kann Japanisch sprechen.</Text>
        </Paper>
        <div className="flex justify-between">
          <div className="bg-blue-900/70 rounded-full p-1 text-white">
            <BsBookmark />
            <BsVolumeUpFill />
            <GrNext />
          </div>
        </div>
      </Stack>
    </Container>
  );
}
