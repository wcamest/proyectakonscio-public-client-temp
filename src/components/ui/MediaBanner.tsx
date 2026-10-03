import React from "react";

type Props = {
  media?: React.ReactNode;
  label?: React.ReactNode;
  labelVisible?: boolean;
};

const MediaBanner = (props: Props) => {
  const { media, label, labelVisible = true } = props;

  return (
    <div className="relative w-full aspect-video bg-neutral-500 flex justify-center items-center">
      <div className="absolute w-full h-full left-0 top-0">{media}</div>
      {labelVisible && (
        <div className="pointer-events-none z-20 w-full max-w-xs md:max-w-lg lg:max-w-3xl text-center">
          {label}
        </div>
      )}
    </div>
  );
};

export default MediaBanner;
