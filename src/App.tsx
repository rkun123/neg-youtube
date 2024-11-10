import clsx from "clsx";
import "./App.css";
import Videos from "./Videos";

function App() {
  return (
    <div
      className={clsx(
        "App",
        "text-sm",
        "text-slate-800",
        "m-4",
        "font-sans",
        "min-w-64"
      )}
    >
      <Videos></Videos>
    </div>
  );
}

export default App;
