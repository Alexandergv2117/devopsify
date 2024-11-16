"use client";

import { formatDistanceToNow, format } from "date-fns";
import { enUS } from "date-fns/locale";

export default function RelativeDate ({ timestamp = 0, threshold = 7 }) {
  if (!timestamp) return null;

  const date = new Date(timestamp * 1000);
  const now = new Date();

  const differenceInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  if (differenceInDays < threshold) {
    const relativeTime = formatDistanceToNow(date, {
      addSuffix: true,
      locale: enUS,
    });
    return <span>{relativeTime}</span>;
  }

  const formattedDate = format(date, "dd '/' MMMM '/' yyyy, HH:mm", { locale: enUS });

  return <span>{formattedDate}</span>;
};
