"use client";

import { usePathname } from "next/navigation";
import {
  MdOutlineQuiz,
  MdSearch,
  MdNotifications,
  MdAccountCircle,
} from "react-icons/md";
import { BsFillBookmarksFill } from "react-icons/bs";
import Link from "next/link";

const navItems = [
  {
    icon: MdOutlineQuiz,
    label: "Quiz",
    link: "/quiz",
  },
  {
    icon: BsFillBookmarksFill,
    label: "Liste",
    link: "/bookmarks",
  },
  {
    icon: MdSearch,
    label: "Suchen",
    link: "/dictionary",
  },
  {
    icon: MdNotifications,
    label: "Neu",
    link: "/notifications",
  },
  {
    icon: MdAccountCircle,
    label: "Konto",
    link: "/account",
  },
];

export default function Navbar() {
  const router = usePathname();

  return (
    <div className="fixed bottom-0 bg-sub text-main/75 rounded-t-md w-[375px] h-14 flex justify-between items-center mx-auto px-6 py-2">
      {navItems.map((item, i) => {
        const isActive = item.link === router;
        return (
          <Link
            href={item.link}
            key={i}
            className={`flex flex-col items-center ${
              isActive && "text-third bg-activeBg"
            }`}
          >
            <item.icon className="w-7 h-7 mx-auto" />
            <p className="text-xs">{item.label}</p>
          </Link>
        );
      })}
    </div>
  );
}
