import Draw from '..';

function Ellipse() {
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
        dc.stroke('black');
        dc.strokeWeight(5);
        dc.ellipse(dc.windowWidth / 2, dc.windowHeight / 2, 100, 200);
      }}
    />
  );
}

export default Ellipse;
