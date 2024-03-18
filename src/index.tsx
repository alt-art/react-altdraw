import { useEffect, useRef } from 'react';
import DrawContext2D from './drawContext';

interface DrawProps {
  setup: (canvas: HTMLCanvasElement) => void;
  draw: (dc: DrawContext2D) => void;
  onResize: (canvas: HTMLCanvasElement) => void;
}

function Draw({ setup, draw, onResize }: DrawProps) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      setup(canvas.current);
      const drawContext = new DrawContext2D(canvas.current);
      addEventListener('resize', () => {
        if (canvas.current) {
          onResize(canvas.current);
          drawContext.resize(canvas.current.width, canvas.current.height);
        }
      });
      let animationFrameId: number;
      const times: number[] = [];
      function render(timestamp: number = 0) {
        if (ctx) {
          while (times.length > 0 && times[0] <= timestamp - 1000) {
            times.shift();
            drawContext.frameRate = times.length;
          }
          times.push(timestamp);
          drawContext.updateFrame();
          draw(drawContext);
          animationFrameId = requestAnimationFrame(render);
        }
      }
      animationFrameId = requestAnimationFrame(render);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [draw, onResize, setup]);

  return <canvas ref={canvas} />;
}

export default Draw;
