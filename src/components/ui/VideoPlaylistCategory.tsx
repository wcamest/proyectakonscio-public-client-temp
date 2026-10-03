import React from "react";
import Image from "next/image";
import { VideoPlaylistCategoryData, VideoPlaylistItemData } from "@/types/videoPlayer";
import VideoPlaylistItem from "./VideoPlaylistItem";

type Props = {
  data: VideoPlaylistCategoryData;
  selectedVideoUrl: string;
  selectVideoUrl: (url: string, playlistVisible?: boolean) => void;
};

const VideoPlaylistCategory = (props: Props) => {
  const { data, selectVideoUrl, selectedVideoUrl } = props;

  const Functions = {
    SelectedCategory() {
      const selectedCategory = data.videos.some(
        (videoData: VideoPlaylistItemData) => videoData.url === selectedVideoUrl
      );
      return selectedCategory;
    },
    HeaderClassName() {
      if (Functions.SelectedCategory())
        return "min-w-full flex items-center gap-3 select-none shadow rounded p-2 bg-neutral-600 text-neutral-50 cursor-pointer";

      return "min-w-full flex items-center gap-3 select-none shadow rounded p-2 bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-900 active:text-neutral-50 cursor-pointer";
    },
  };

  const Renderer = {
    Videos() {
      return data.videos.map((videoData: VideoPlaylistItemData, key: number) => (
        <VideoPlaylistItem
          key={key}
          data={videoData}
          selectVideoUrl={selectVideoUrl}
          selectedVideoUrl={selectedVideoUrl}
        />
      ));
    },
  };

  return (
    <div className="flex flex-col gap-3 select-none">
      <div
        className={Functions.HeaderClassName()}
        onClick={() => {
          selectVideoUrl(data.videos[0].url, true);
        }}
      >
        <div>
          <div className="w-20 aspect-video overflow-hidden relative border border-solid border-neutral-300">
            <Image
              src={data.videos[0].thumbnail}
              fill
              alt={data.name}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-nowrap">
            <strong>{`${data.name}`}</strong>
          </h2>
          <span className="text-xs">{`${data.videos.length} Videos`}</span>
          <span className="text-xs">TROM</span>
        </div>
      </div>
      {Functions.SelectedCategory() && (
        <div className="flex flex-col gap-2 pl-10">{Renderer.Videos()}</div>
      )}
    </div>
  );
};

export default VideoPlaylistCategory;
