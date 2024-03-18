import Draw from '..';

interface ArcProps {
  color: string;
  stroke: boolean;
  strokeColor: string;
  strokeWeight: number;
  fill: boolean;
}

function Arc({
  color,
  stroke,
  strokeColor,
  strokeWeight,
  fill,
}: ArcProps): JSX.Element {
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
        const x = centerWidth + Math.sin(angle) * 100;
        const y = centerHeight + Math.cos(angle) * 100;
        const endAngle = angle % (Math.PI * 2);
        dc.arc(x, y, 100, 0, endAngle);
        dc.fill('white');
        dc.text(`frameRate: ${dc.frameRate}`, 10, 20, 20, 'monospace');
      }}
    />
  );
}

export default Arc;
