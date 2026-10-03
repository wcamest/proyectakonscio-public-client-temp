import Image from "next/image";
import React from "react";

const Slide2 = () => {
  const renderImages = () => {
    const images: React.ReactNode[] = [];

    for (let it = 0; it < 13; it++) {
      images.push(
        <div key={it} className="relative overflow-hidden">
          <Image  src={`/images/${it}.avif`} alt={`image-${it}`} fill className="object-contain object-center" />
        </div>
      );
    }

    return images;
  };

  return (
    <div
      className="size-full relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/periodismo-digno-img2.avif')",
      }}
    >
      <div className="size-full p-5 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5">{renderImages()}</div>
    </div>
  );
};

export default Slide2;
