import Draw from '..';

interface CircleProps {
  color: string;
  radius: number;
  stroke: boolean;
  strokeColor: string;
  strokeWeight: number;
}

function Circle({
  color,
  radius,
  stroke,
  strokeColor,
  strokeWeight,
}: CircleProps) {
  return (
    <Draw
      setup={(canvas) => {
        canvas.width = window.innerWidth - 30;
        canvas.height = window.innerHeight - 38;
      }}
      onResize={(canvas) => {
        canvas.width = window.innerWidth - 30;
        canvas.height = window.innerHeight - 38;
      }}
      draw={(dc) => {
        dc.background('gray');
        dc.fill(color);
        if (stroke) {
          dc.stroke(strokeColor);
          dc.strokeWeight(strokeWeight);
        }
        const x = dc.windowWidth / 2 + Math.cos(dc.frameCount / 100) * radius;
        const y = dc.windowHeight / 2 + Math.sin(dc.frameCount / 100) * radius;
        const r = Math.abs(Math.sin(dc.frameCount / 100)) * radius + radius / 2;
        dc.circle(x, y, r);
      }}
    />
  );
}

export default Circle;
