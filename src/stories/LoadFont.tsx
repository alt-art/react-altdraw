import Draw from '..';
import Load from '../Load';

interface LoadFontProps {
  color: string;
}

function LoadFont({ color }: LoadFontProps) {
  let font: string;
  return (
    <Draw
      load={async () => {
        font = await Load.loadFont(
          'https://fonts.gstatic.com/s/geostarfill/v26/AMOWz4SWuWiXFfjEohxQ9osEVFi3.woff2'
        );
      }}
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
        const text = 'Geostar Fill';
        const fontSize = 30;
        const x = dc.windowWidth / 2 - dc.textWidth(text, fontSize) / 2;
        const y = dc.windowHeight / 2;
        dc.text(text, x, y, fontSize, font);
      }}
    />
  );
}

export default LoadFont;
