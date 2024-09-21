import React from "react";
import ReactDOM from "react-dom/client";
import Play from "./Play";
import "./content.css";

let interval = setInterval(() => {
  console.log("youtube element checking...");
  const target = document.querySelector(
    //"div#title.style-scope.ytd-watch-metadata",
    "div#info-container.style-scope.ytd-watch-info-text"
  );
  if (target === null) {
    return;
  }

  const root = document.createElement("div");
  target.append(root);
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <div className="neg-play-button-container">
        <Play />
      </div>
    </React.StrictMode>
  );

  clearInterval(interval);
}, 500);
