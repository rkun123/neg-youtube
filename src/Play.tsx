import { playRequest } from "./play_request";

function Play() {
  const play = async () => {
    await playRequest(document.location);
  };
  return (
    <a className="neg-play-button" onClick={play}>
      &nbsp;ねぐ子で再生する
    </a>
  );
}

export default Play;
