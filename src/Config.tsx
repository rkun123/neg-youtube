import { useState, useEffect } from "react";
import clsx from "clsx";
import { CONFIG_DISCORD_NAME_KEY } from "./const";

function Config() {
  const [discordName, setDiscordName] = useState("unknown");

  useEffect(() => {
    (async () => {
      const initValue = (await chrome.storage.local.get())[
        CONFIG_DISCORD_NAME_KEY
      ];
      setDiscordName(initValue);
      chrome.storage.local.onChanged.addListener((changes) => {
        console.debug(changes);
        setDiscordName(changes[CONFIG_DISCORD_NAME_KEY].newValue);
      });
    })();
  }, []);

  function updateDiscordName(name: string) {
    chrome.storage.local.set({
      [CONFIG_DISCORD_NAME_KEY]: name,
    });
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
      <div className={clsx("flex flex-col")}>
        <div className={clsx("flex items-center flex-row gap-2")}>
          <div className={clsx("basis-1/3", "font-bold")}>Name</div>
          <input
            type="text"
            className="basis-2/3 bg-gray-50 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 p-1 w-full"
            placeholder="rkun"
            value={discordName}
            onChange={(e) => updateDiscordName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Config;
