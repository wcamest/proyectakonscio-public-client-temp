"use client";

import Button from "@/components/ui/Button";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { VideoPlaylistCategoryData } from "@/types/videoPlayer";
import React, { useState } from "react";
import VideoPlaylistCategory from "./VideoPlaylistCategory";

type Props = {
  data: VideoPlaylistCategoryData[];
};

const VideoPlaylist = (props: Props) => {
  const { data } = props;
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | undefined>(
    data[0]?.videos[0]?.url,
  );
  const [playlistVisible, setPlaylistVisible] = useState(false);

  const selectVideoUrl = (url: string, playlistVisible: boolean = false) => {
    setSelectedVideoUrl(url);
    setPlaylistVisible(playlistVisible);
  };

  const Renderer = {
    Categories() {
      return data.map((data: VideoPlaylistCategoryData, key: number) => {
        if (selectedVideoUrl)
          return (
            <VideoPlaylistCategory
              key={key}
              data={data}
              selectedVideoUrl={selectedVideoUrl}
              selectVideoUrl={selectVideoUrl}
            />
          );

        return undefined;
      });
    },
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col lg:flex-row">
      <div className="flex lg:hidden p-2">
        <Button
          color="blue"
          className="w-full"
          onClick={() => {
            setPlaylistVisible(!playlistVisible);
          }}
        >
          {playlistVisible ? "Ocultar" : "Mostrar"} Lista
        </Button>
      </div>
      <div className="relative size-full overflow-hidden flex flex-col lg:flex-row">
        <div
          className={`${
            playlistVisible ? "flex" : "hidden"
          } absolute lg:flex lg:static w-full h-full lg:w-auto lg:h-auto z-50 bg-white`}
        >
          <div className="w-full lg:w-80 h-full overflow-auto">
            <div className="min-w-full w-fit p-3 flex flex-col gap-3">
              {Renderer.Categories()}
            </div>
          </div>
        </div>
        <div className="w-full h-full overflow-hidden relative">
          <div className="w-full h-full overflow-hidden flex justify-center items-center">
            {selectedVideoUrl && (
              <VideoPlayer
                key={selectedVideoUrl}
                autoPlay={true}
                muted={false}
                className="size-full"
              >
                <source type="video/mp4" src={selectedVideoUrl} />
              </VideoPlayer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlaylist;
