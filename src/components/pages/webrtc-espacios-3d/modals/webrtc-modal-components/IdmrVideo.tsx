import VideoPlayer from "@/components/ui/VideoPlayer";
import React from "react";

const ImdrVideo = () => {
  return (
    <VideoPlayer autoPlay muted className="size-full">
      <source src="/videos/idmr.mp4" type="video/mp4" />
    </VideoPlayer>
  );
};

export default ImdrVideo;
