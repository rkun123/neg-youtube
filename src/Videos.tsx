import { useVideos } from "./videos";
import Video from "./Video";
import clsx from "clsx";

function Videos() {
  const { videos, focus } = useVideos();

  return (
    <div className={clsx("flex", "flex-col", "gap-2")}>
      {videos !== undefined && videos.length > 0 ? (
        videos.map((v) => (
          <Video
            key={v.tabID}
            videoMeta={v}
            focus={async () => focus(v)}
          ></Video>
        ))
      ) : (
        <div>開いている動画がありません</div>
      )}
    </div>
  );
}

export default Videos;
