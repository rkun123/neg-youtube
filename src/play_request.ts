import { CHROME_NOTIFICATION_KEY, CONFIG_DISCORD_NAME_KEY } from "./const";

export async function playRequest(location: Location): Promise<boolean> {
  const url = new URL(location.href);
  const videoID = url.searchParams.get("v");

  if (videoID === null) return false;

  const userName = (await chrome.storage.local.get())[CONFIG_DISCORD_NAME_KEY];
  console.debug("userName", userName);

  const body = JSON.stringify({
    url: `https://www.youtube.com/watch?v=${videoID}`,
    userName,
  });

  const res = await fetch(
    `https://${import.meta.env.VITE_SERVER_HOST}/v1/play`,
    {
      method: "post",
      body,
    }
  );

  console.debug(`neg: ${await res.json()}`);
  if (!res.ok) {
    return false;
  }

  // 再生を止める
  pauseVideo();

  return true;
}

function pauseVideo() {
  const target = document.querySelector(
    "video.video-stream"
  ) as HTMLVideoElement;
  if (target && target.played) target.pause();
}
