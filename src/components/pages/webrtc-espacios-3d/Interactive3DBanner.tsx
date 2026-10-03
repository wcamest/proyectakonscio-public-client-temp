"use client";

import MediaBanner from "@/components/ui/MediaBanner";
import React, { useState } from "react";
import InteractiveRoom from "./InteractiveRoom";

const Interactive3DBanner = () => {
  const [isLabelVisible, setIsLabelVisible] = useState(true);
  const hideLabel = () => setIsLabelVisible(false);
  const showLabel = () => setIsLabelVisible(true);

  return (
    <section>
      <MediaBanner
        label={
          <div className="bg-blue-500 flex flex-col gap-1 lg:gap-2 justify-center items-center p-5 lg:p-10 bg-opacity-60">
            <h1 className="text-blue-50 text-3xl md:text-5xl lg:text-7xl font-bold">
              Diseño WebRTC y Espacios 3D
            </h1>
          </div>
        }
        labelVisible={isLabelVisible}
        media={
          <InteractiveRoom
            onPointerDown={hideLabel}
            onPointerUp={showLabel}
            autoRotateSpeed={0.6}
          />
        }
      />
    </section>
  );
};

export default Interactive3DBanner;
