export async function playRequest(location: Location) {
  const url = new URL(location.href);
  const videoID = url.searchParams.get("v");

  const body = JSON.stringify({
    url: `https://www.youtube.com/watch?v=${videoID}`,
  });

  const res = await fetch(`https://${import.meta.env.VITE_SERVER_HOST}/v1/play`, {
    method: "post",
    body,
  });

  console.debug(`neg: ${await res.json()}`);
  if (!res.ok) return;

  // 再生を止める
  const player: HTMLVideoElement | null = document.querySelector("#movie_player > div.html5-video-container > video")
  console.debug('player: ', player)
  player !== null &&
    await player.pause();
}
