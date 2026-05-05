import { useState, useEffect, useRef, useCallback } from "react";
import { fetchAndParse } from "../utils/parseCsv";

const INTERVAL_MS = Number(import.meta.env.VITE_REFRESH_INTERVAL_MS) || 30000;

function tagChanges(prev, next) {
  const prevByName = Object.fromEntries(prev.map((r) => [r.name, r.value]));
  return next.map((row) => ({
    ...row,
    changed: prevByName[row.name] !== undefined && prevByName[row.name] !== row.value,
  }));
}

export function useLeaderboard(csvUrl, nameCol, valueCol) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const prevRef = useRef([]);
  const timerRef = useRef(null);

  const poll = useCallback(async () => {
    if (!csvUrl) return;
    try {
      const next = await fetchAndParse(csvUrl, nameCol, valueCol);
      const tagged = tagChanges(prevRef.current, next);
      prevRef.current = next;
      setRows(tagged);
      setLastUpdated(Date.now());
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [csvUrl, nameCol, valueCol]);

  useEffect(() => {
    poll();

    function schedule() {
      timerRef.current = setInterval(() => {
        if (!document.hidden) poll();
      }, INTERVAL_MS);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        clearInterval(timerRef.current);
      } else {
        poll();
        schedule();
      }
    }

    schedule();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [poll]);

  return { rows, error, lastUpdated };
}
