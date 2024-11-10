import clsx from "clsx";
import { VideoMeta } from "./types";
import { useCallback, useEffect, useState } from "react";
import { playRequest } from "./play_request";

type Props = {
  videoMeta: VideoMeta;
  focus: () => Promise<void>;
};

type Stat = "done" | "inProgress" | "failed" | "succeed";

export default function Video({ videoMeta, focus }: Props) {
  const [stat, setStat] = useState<Stat>("done");

  const play = useCallback(async () => {
    setStat("inProgress");
    const res = await playRequest(videoMeta.videoID);
    if (res) {
      setStat("succeed");
    } else {
      setStat("failed");
    }
    setTimeout(() => setStat("done"), 800);
  }, [videoMeta]);

  return (
    <div className={clsx("flex", "items-center", "gap-1", "cursor-pointer")}>
      <h2
        className={clsx(
          "overflow-hidden",
          "text-ellipsis",
          "whitespace-nowrap"
        )}
        onClick={focus}
      >
        {videoMeta.title}
      </h2>
      <button
        className={clsx(
          "cursor-pointer",
          "bg-gray-200",
          "disabled:bg-gray-600",
          {
            "bg-red-500": stat === "failed",
            "bg-green-500": stat === "succeed",
          },
          "text-xs",
          "py-1",
          "px-2",
          "rounded-sm"
        )}
        disabled={stat === "inProgress"}
        onClick={play}
      >
        Queue
      </button>
    </div>
  );
}
