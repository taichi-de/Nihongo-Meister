import Provider from "./Provider";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Nihongo Meister",
  description: "Japanese Learning App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <Provider>
        <body>
          <main className="max-w-[375px] h-screen mx-auto bg-gradient-to-b from-main via-secondary to-main text-sub">
            <Header />
            <div className="my-4 px-[5%]">{children}</div>
            <Navbar />
          </main>
        </body>
      </Provider>
    </html>
  );
}
