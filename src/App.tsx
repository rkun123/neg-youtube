import clsx from "clsx";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Config from "./Config";

function App() {
  function canUseStorage() {
    return chrome.storage !== undefined;
  }

  return (
    <div
      className={clsx(
        "App",
        "text-sm",
        "text-slate-800",
        "m-4",
        "font-sans",
        "min-w-32"
      )}
    >
      <header className="App-header mb-2">
        <div className={clsx("text-lg", "font-bold")}>ねぐ子 | 設定</div>
      </header>
      {canUseStorage() ? (
        <Config />
      ) : (
        <p
          className={clsx(
            "p-2",
            "bg-red-500",
            "font-bold",
            "text-red-50",
            "rounded"
          )}
        >
          please grant chrome.storage API
        </p>
      )}
    </div>
  );
}

export default App;
