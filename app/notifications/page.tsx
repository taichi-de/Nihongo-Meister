"use client";

import { useState, useEffect } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Notification } from "../../types/database.types";
import dayjs from "dayjs";

export default function Notifications() {
  const [news, setNews] = useState<Notification[]>([]);

  async function fetchNews() {
    const res = await fetch("http://localhost:3000/api/notifications", {
      cache: "no-store",
    });
    const data = await res.json();
    return data.notifications;
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetchNews();
      setNews(result);
    }
    fetchData();
  }, []);

  return (
    <div className="px-[5%]">
      {news.map((notification) => (
        <div
          className="bg-white/50 text-main mb-3 p-4 rounded-md"
          key={notification.id}
        >
          <div className="flex text-main">
            <HiOutlineLightBulb className="w-5 h-5 mr-1 text-main/50" />
            <p>{notification.title}</p>
          </div>
          <p className="text-sm my-1 ml-5">{notification.content}</p>
          <time
            dateTime={dayjs(notification.publishedAt).toISOString()}
            className="ml-5 text-xs text-main/70"
          >
            {dayjs(notification.publishedAt).format("DD.MM.YYYY")}
          </time>
        </div>
      ))}
    </div>
  );
}
