import {
  MdOutlineQuiz,
  MdSearch,
  MdNotifications,
  MdAccountCircle,
} from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import Link from "next/link";

const navItems = [
  {
    icon: MdOutlineQuiz,
    label: "Quiz",
    link: "/quiz",
  },
  {
    icon: LuClipboardList,
    label: "Liste",
    link: "/bookmarks",
  },
  {
    icon: MdSearch,
    label: "Suchen",
    link: "/search",
  },
  {
    icon: MdNotifications,
    label: "Neu",
    link: "/notifications",
  },
  {
    icon: MdAccountCircle,
    label: "Konto",
    link: "/quiz",
  },
];

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 bg-sub text-main/75 rounded-t-md w-[375px] h-14 flex justify-between items-center mx-auto px-6 py-2">
      {navItems.map((item, i) => {
        return (
          <Link
            href={item.link}
            className={`${item.label == "Quiz" && "text-third"}`}
            key={i}
          >
            <item.icon className="w-7 h-7 mx-auto" />
            <p className="text-xs">{item.label}</p>
          </Link>
        );
      })}
    </div>
  );
}
