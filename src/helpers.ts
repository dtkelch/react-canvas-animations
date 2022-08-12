export const radian = (n: number) => n * (Math.PI / 180);

interface DrawProps {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>;
  logoRef: React.MutableRefObject<HTMLImageElement | null>;
  backgroundRef: React.MutableRefObject<HTMLImageElement | null>;
  rotation: number;
}
export const draw = (props: DrawProps) => {
  const { canvas, logoRef, backgroundRef, rotation } = props;
  const ctx = canvas?.current?.getContext("2d");
  const background = backgroundRef.current;
  const logo = logoRef.current;
  if (!ctx || !background || !logo) {
    return;
  }
  const canvasWidth = canvas.current!.width;
  const canvasHeight = canvas.current!.height;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.drawImage(background, 0, 0, background.width, background.height);

  // Code adapted from https://stackoverflow.com/a/3793474
  const x = canvasWidth / 2;
  const y = canvasHeight / 2;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  const { width, height } = logo;
  ctx.drawImage(logo, -width / 2, -height / 2, width, height);
  ctx.rotate(-rotation);
  ctx.translate(-x, -y);
};
