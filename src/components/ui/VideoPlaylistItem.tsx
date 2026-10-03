import { VideoPlaylistItemData } from "@/types/videoPlayer";
import Image from "next/image";
import React from "react";

type Props = {
  data: VideoPlaylistItemData;
  selectVideoUrl: (url: string) => void;
  selectedVideoUrl: string;
};

const VideoPlaylistItem = (props: Props) => {
  const { data, selectVideoUrl, selectedVideoUrl } = props;

  const Functions = {
    SelectedVideo() {
      return data.url === selectedVideoUrl;
    },
    ClassName() {
      if (Functions.SelectedVideo())
        return "min-w-full flex items-center gap-3 select-none shadow rounded p-2 bg-neutral-900 text-neutral-50 cursor-pointer";

      return "min-w-full flex items-center gap-3 select-none shadow rounded p-2 bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-900 active:text-neutral-50 cursor-pointer";
    },
  };

  console.log(
    data.thumbnail,
    encodeURIComponent(data.thumbnail)
      .replaceAll("%2F", "/")
      .replaceAll("%20", " ")
  );

  return (
    <div
      className={Functions.ClassName()}
      onClick={() => {
        selectVideoUrl(data.url);
      }}
    >
      <div>
        <div className="w-20 aspect-video overflow-hidden relative border border-solid border-neutral-300">
          <Image
            src={encodeURIComponent(data.thumbnail)
              .replaceAll("%2F", "/")
              .replaceAll("%20", " ")}
            fill
            alt={data.name}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-nowrap font-bold">{data.name}</h2>
        <span className="">TROM</span>
      </div>
    </div>
  );
};

export default VideoPlaylistItem;
