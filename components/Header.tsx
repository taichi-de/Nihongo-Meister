"use client";

import { Text } from "@mantine/core";
import { LuSettings } from "react-icons/lu";
import { BsFire } from "react-icons/bs";

const today = new Date();
type Option = {
  weekday: "long" | "short" | "narrow";
  month: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day: "numeric" | "2-digit";
};
const options: Option = {
  weekday: "short",
  month: "2-digit",
  day: "2-digit",
};
const dateString = today.toLocaleDateString("de-DE", options);

export default function Header() {
  return (
    <nav className="flex items-center justify-between py-2 px-[10%]">
      <Text className="text-gray/80 text-sm font-bold">
        <span className="">{dateString}</span>
        <br />
        Heute
      </Text>
      <div className="flex">
        <div className="my-auto mr-4 text-center text-gray/80">
          <BsFire className="text-orange/70 text-2xl" />
          <Text className="text-xs">14</Text>
        </div>
        <LuSettings className="text-gray/80 text-2xl my-auto" />
      </div>
    </nav>
  );
}
