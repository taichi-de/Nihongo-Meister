"use client";

import Image from "next/image";
import { Text } from "@mantine/core";

export default function loading() {
  return (
    <div className="flex-col align-middle justify-center h-[100vh] text-center p-[10%] text-white/80">
      <Image
        src="/undraw_relaxing_at_home_re_mror.svg"
        alt="undraw_relaxing_at_home_re_mror"
        width={200}
        height={200}
        className="w-[200px] h-[200px] mx-auto"
      />
      <Text className="mt-4">loading...</Text>
    </div>
  );
}
