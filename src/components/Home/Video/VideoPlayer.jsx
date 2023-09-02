import Youtube from "react-youtube";

const VideoPlayer = () => {
  const videoId = "6iOd2iDkdn4";

  const opts = {
    height: "420",
    width: "101%",
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: videoId,
    },
  };
  console.log(opts);

  return (
    <div>
      <Youtube videoId={videoId} opts={opts} />
    </div>
  );
};

export default VideoPlayer;
