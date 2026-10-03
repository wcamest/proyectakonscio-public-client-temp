import VideoPlayer from "@/components/ui/VideoPlayer";
import React from "react";

const SpatialVideo = () => {
  return (
    <VideoPlayer autoPlay muted className="size-full">
      <source src="/videos/spatial-course.mp4" type="video/mp4" />
    </VideoPlayer>
  );
};

export default SpatialVideo;
