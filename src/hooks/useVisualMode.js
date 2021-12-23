import { useState }  from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace) {
    const newHistory = [...history];
    if (replace) {
      newHistory.pop();
    }
    setHistory(prev => ([...prev, newMode]));
  }

  function back() {
    if(history.length < 2) {
      return
    }
    const newHistory = [...history]
    newHistory.pop();
    newHistory.pop();
    newHistory.pop();
    setHistory(newHistory)
  }

  const mode = history[history.length - 1]
  
  return { mode, transition, back };
}
