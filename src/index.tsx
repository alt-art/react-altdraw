import { useEffect, useRef } from 'react';
import DrawContext2D, { Vector } from './DrawContext';
import Load from './Load';

interface DrawProps {
  setup: (canvas: HTMLCanvasElement) => void;
  draw: (dc: DrawContext2D) => void;
  onResize?: (canvas: HTMLCanvasElement) => void;
  load?: () => Promise<void>;
}

function Draw({ setup, draw, onResize, load }: DrawProps) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      setup(canvas.current);
      const drawContext = new DrawContext2D(canvas.current);
      addEventListener('resize', () => {
        if (canvas.current) {
          if (onResize) {
            onResize(canvas.current);
          }
          drawContext.resize(canvas.current.width, canvas.current.height);
        }
      });
      let animationFrameId: number;
      let oldTime = 0;
      function render(timestamp: number = 0) {
        if (ctx) {
          const dt = timestamp - oldTime;
          drawContext.frameRate = 1000 / dt;
          oldTime = timestamp;
          drawContext.updateFrame();
          draw(drawContext);
          animationFrameId = requestAnimationFrame(render);
        }
      }
      if (load) {
        load()
          .finally(() => {
            animationFrameId = requestAnimationFrame(render);
          })
          .catch((error) => {
            throw error;
          });
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [draw, onResize, setup, load]);

  return <canvas ref={canvas} />;
}

export default Draw;

export { DrawContext2D, Load };
export type { Vector };
