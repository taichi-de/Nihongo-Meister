import Link from "next/link";
import { MdAdsClick } from "react-icons/md";

export default function PostNotFound() {
  return (
    <div className="flex-col align-middle justify-center h-[100vh] text-center p-[10%] text-white/80">
      <h1 className="mb-8 text-xl">404 | Page not found.</h1>
      <Link
        href="/"
        className="flex justify-center mx-auto text-third hover:text-sub text-md"
      >
        Back to Home <MdAdsClick className="my-auto ml-2" />
      </Link>
    </div>
  );
}
