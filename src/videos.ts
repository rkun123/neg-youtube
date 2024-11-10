import { useEffect, useState } from "react";
import { VideoMeta } from "./types";

const regExp =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:(?:watch\?v=)|(?:embed\/)|(?:v\/))|youtu\.be\/)([^"\s?<>]+)/i;

export function useVideos() {
  const [videos, setVideos] = useState<VideoMeta[]>([]);

  useEffect(() => {
    const refreshVideos = async () => {
      const tabs = await chrome.tabs.query({});
      setVideos(
        tabs
          .map<VideoMeta | null>((t) => {
            if (t.url === undefined) return null;
            const m = t.url.match(regExp);
            if (m === null) return null;
            const id = m[1];
            return {
              tabID: t.id,
              videoID: id,
              title: t.title || "",
              thumbnailURL: "",
            };
          })
          .filter((v) => v !== null)
      );
    };
    chrome.tabs.onUpdated.addListener(refreshVideos);
    refreshVideos();

    return () => {
      // Unregister
      chrome.tabs.onUpdated.removeListener(refreshVideos);
    };
  });

  async function focus(v: VideoMeta) {
    if (v.tabID !== undefined) {
      console.log("focus", v.tabID);
      await chrome.tabs.update(v.tabID, {
        active: true,
      });
    }
  }

  return {
    videos,
    focus,
  };
}
