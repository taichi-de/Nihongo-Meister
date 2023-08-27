"use client";

import { IoMdClose } from "react-icons/io";

export default function notifications() {
  return (
    <div className="px-[5%]">
      <div className="bg-white/50 text-main mb-3 p-4 rounded-md">
        <div className="flex justify-between font-semibold items-center text-main">
          <p>Gute Nachricht!</p>
          <IoMdClose className="w-5 h-5 text-main/50" />
        </div>
        <p className="text-sm my-1">
          Juhu! 🎉 Wir haben erste 3 Nutzer erreicht!
        </p>
        <p className="text-xs text-main/50">26.08.2023</p>
      </div>

      <div className="bg-white/50 text-main p-4 rounded-md">
        <div className="flex justify-between font-semibold items-center text-main">
          <p>Alles gute zu deinem ersten Login!</p>
          <IoMdClose className="w-5 h-5 text-main/50" />
        </div>
        <p className="text-sm my-1">Schön dass du da bist!</p>
        <p className="text-xs text-main/50">25.08.2023</p>
      </div>
    </div>
  );
}
