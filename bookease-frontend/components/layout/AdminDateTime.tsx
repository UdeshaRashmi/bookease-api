"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-LK", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: true,
  }).format(date);
}

export function AdminDateTime() {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(formatDateTime(new Date()));
    };

    updateDateTime();

    const intervalId = window.setInterval(updateDateTime, 30000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="inline-flex h-10 w-full min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm sm:w-auto sm:px-4">
      <Clock3 className="size-4 text-teal-600" aria-hidden="true" />
      <span className="truncate">{currentDateTime || "Loading time..."}</span>
    </div>
  );
}
