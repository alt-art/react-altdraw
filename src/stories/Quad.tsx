import Draw from '..';

interface QuadProps {
  color: string;
  stroke: boolean;
  strokeColor: string;
  strokeWeight: number;
  fill: boolean;
}

function Quad({
  color,
  stroke,
  strokeColor,
  strokeWeight,
  fill,
}: QuadProps): JSX.Element {
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
        if (fill) {
          dc.fill(color);
        } else {
          dc.noFill();
        }
        if (stroke) {
          dc.stroke(strokeColor);
          dc.strokeWeight(strokeWeight);
        } else {
          dc.noStroke();
        }
        const angle = dc.frameCount / 100;
        const centerWidth = dc.windowWidth / 2;
        const centerHeight = dc.windowHeight / 2;
        const x1 = centerWidth + Math.sin(angle) * 100;
        const y1 = centerHeight + Math.cos(angle) * 100;
        const x2 = centerWidth + Math.sin(angle + (Math.PI * 1) / 3) * 100;
        const y2 = centerHeight + Math.cos(angle + (Math.PI * 1) / 3) * 100;
        const x3 = centerWidth + Math.sin(angle + (Math.PI * 2) / 3) * 100;
        const y3 = centerHeight + Math.cos(angle + (Math.PI * 2) / 3) * 100;
        const x4 = centerWidth + Math.sin(angle + (Math.PI * 3) / 3) * 100;
        const y4 = centerHeight + Math.cos(angle + (Math.PI * 3) / 3) * 100;
        dc.quad(x1, y1, x2, y2, x3, y3, x4, y4);
        dc.fill('white');
        dc.text(`frameRate: ${dc.frameRate}`, 10, 20, 20, 'monospace');
      }}
    />
  );
}

export default Quad;
