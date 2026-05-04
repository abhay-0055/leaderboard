import { useState, useEffect, useRef, useCallback } from "react";
import { fetchAndParse } from "../utils/parseCsv";

const CSV_URL = "/api/csv";
const INTERVAL_MS = Number(import.meta.env.VITE_REFRESH_INTERVAL_MS) || 30000;

function tagChanges(prev, next) {
  const prevByName = Object.fromEntries(prev.map((r) => [r.name, r.score]));
  return next.map((row) => ({
    ...row,
    changed: prevByName[row.name] !== undefined && prevByName[row.name] !== row.score,
  }));
}

export function useLeaderboard() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const prevRef = useRef([]);
  const timerRef = useRef(null);

  const poll = useCallback(async () => {
    try {
      const next = await fetchAndParse(CSV_URL);
      const tagged = tagChanges(prevRef.current, next);
      prevRef.current = next;
      setRows(tagged);
      setLastUpdated(Date.now());
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

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
