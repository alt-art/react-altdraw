import Draw from '..';

function Rectangle() {
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
        dc.fill('blue');
        dc.rect(50, 50, 100, 100);
        dc.fill('white');
        dc.text(`frameRate: ${dc.frameRate}`, 10, 20, 20, 'monospace');
      }}
    />
  );
}

export default Rectangle;
