"use client";

import { Text } from "@mantine/core";
import { LuSettings } from "react-icons/lu";
import { BsFire } from "react-icons/bs";

export default function Topbar() {
  return (
    <nav className="flex align-middle justify-between bg-main py-2 px-[10%]">
      <Text className="text-gray/80 text-lg font-bold">
        <span className="text-sm">Fr.04.08</span>
        <br />
        Heute
      </Text>
      <div className="flex">
        <div className="my-auto mr-4 text-center text-gray/80">
          <BsFire className="text-red-500 text-2xl" />
          <Text className="text-xs">14</Text>
        </div>
        <LuSettings className="text-gray/80 text-2xl my-auto" />
      </div>
    </nav>
  );
}
