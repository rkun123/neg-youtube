import { useCallback, useState } from "react";
import { playRequest } from "./play_request";
import { SUCCEED_MESSAGE, SUCCEED_MESSAGE_TIMEOUT } from "./const";

function Play() {
  const [hasSucceed, setHasSucceed] = useState(false);
  const play = async () => {
    const succeed = await playRequest(document.location);
    setHasSucceed(succeed);
    setTimeout(() => setHasSucceed(false), SUCCEED_MESSAGE_TIMEOUT);
  };
  return (
    <div className="neg-play-button-container">
      {hasSucceed ? (
        <p className="neg-play-button-succeed">{SUCCEED_MESSAGE}</p>
      ) : (
        <a className="neg-play-button" onClick={play}>
          ねぐ子で再生する
        </a>
      )}
    </div>
  );
}

export default Play;
