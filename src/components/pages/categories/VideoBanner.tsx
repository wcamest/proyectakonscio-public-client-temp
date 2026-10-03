"use client";

import MediaBanner from "@/components/ui/MediaBanner";
import { labelColorClasses, type ThemeColor } from "@/types/themeColor";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { useState } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  color?: ThemeColor;
};

function getVideoMimeType(url: string): string | undefined {
  const cleanUrl = url.split("?")[0]?.split("#")[0] ?? "";

  if (cleanUrl.endsWith(".mp4") || cleanUrl.endsWith(".m4v")) {
    return "video/mp4";
  }

  if (cleanUrl.endsWith(".webm")) {
    return "video/webm";
  }

  if (cleanUrl.endsWith(".ogv") || cleanUrl.endsWith(".ogg")) {
    return "video/ogg";
  }

  return undefined;
}

const VideoBanner = (props: Props) => {
  const [isPaused, setIsPaused] = useState(false);
  const { title, subtitle, videoUrl, color = "blue" } = props;
  const colorClasses = labelColorClasses[color];
  const sourceType = videoUrl ? getVideoMimeType(videoUrl) : undefined;
  const media = videoUrl ? (
    <VideoPlayer
      className="h-full w-full"
      videoClassName="h-full w-full object-cover"
      autoPlay
      pauseOnHide
      muted
      loop
      controls={true}
      playsInline
      onPause={() => setIsPaused(true)}
      onPlay={() => setIsPaused(false)}
    >
      <source src={videoUrl} type={sourceType} />
    </VideoPlayer>
  ) : undefined;

  return (
    <MediaBanner
      media={media}
      labelVisible={isPaused}
      label={
        <div
          className={`${colorClasses.background} pointer-events-none flex flex-col gap-1 lg:gap-2 justify-center items-center p-5 lg:p-10`}
        >
          <h1
            className={`${colorClasses.text} text-3xl md:text-5xl lg:text-7xl font-bold`}
          >
            {title}
          </h1>
          <span
            className={`${colorClasses.text} text-base md:text-lg lg:text-3xl font-bold`}
          >
            {subtitle}
          </span>
        </div>
      }
    />
  );
};

export default VideoBanner;
