import React, { useEffect, useRef } from "react";
import "./App.css";
import backgroundPath from "./background.jpg";
import { draw, radian } from "./helpers";
import logoPath from "./logo.svg";

export const OptionTwo: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  // Creating an imgRef to create an `Image` to draw the logo svg to
  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  // Angle in radians
  const rotationRef = useRef(0);

  const animate = () => {
    // When the component is unmounted, we will lose the canvas.current ref, so exit early to clean up
    if (!canvas.current) {
      return;
    }
    const rotation = rotationRef.current;
    draw({ canvas, backgroundRef, logoRef, rotation });
    rotationRef.current = rotation + radian(1);

    requestAnimationFrame(animate);
  };

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
    // Start the animation function
    requestAnimationFrame(animate);
  }, []);

  return (
    <div>
      <canvas ref={canvas} width={960} height={640} />
    </div>
  );
};
