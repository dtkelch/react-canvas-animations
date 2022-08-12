import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import backgroundPath from "./background.jpg";
import { draw, radian } from "./helpers";
import logoPath from "./logo.svg";

export const OptionOne: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  // Creating an imgRef to create an `Image` to draw the logo svg to
  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  // Angle in radians
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Load the images when the page mounts. Because we're using a ref,
    // they don't need to be in the dependency array or trigger a re-render
    const background = new Image();
    background.src = backgroundPath;
    background.onload = () => {
      backgroundRef.current = background;
    };
    const logo = new Image();
    logo.src = logoPath;
    logo.onload = () => {
      logoRef.current = logo;
    };
    // Set up an interval to trigger every 20ms to increase the rotation by one degree
    const interval: NodeJS.Timeout = setInterval(() => {
      setRotation((r) => r + radian(1));
    }, 20);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    draw({ canvas, backgroundRef, logoRef, rotation });
  }, [rotation]);

  return (
    <div>
      <canvas ref={canvas} width={960} height={640} />
    </div>
  );
};
