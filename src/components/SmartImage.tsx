"use client";

import { useState, useEffect } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  aspect?: string; // default 16/9
  bgColor?: string; // Tailwind color class
};

export default function SmartImage({
  src,
  alt,
  aspect = "aspect-[16/9]",
  bgColor = "bg-gray-100",
}: SmartImageProps) {
  const [isSquare, setIsSquare] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsSquare(img.width === img.height);
    };
    img.src = src;
  }, [src]);

  return (
    <div className={`w-full ${aspect} ${bgColor} flex items-center justify-center`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${
          isSquare
            ? "object-contain max-w-full max-h-full"
            : "object-cover"
        }`}
      />
    </div>
  );
}