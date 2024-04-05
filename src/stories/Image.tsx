import Draw, { Load } from '..';
let image: HTMLImageElement;
function Image() {
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
      load={async () => {
        // Load an image
        image = await Load.loadImage(
          'https://www.publicdomainpictures.net/pictures/590000/velka/teich-landschaft-fantasie-1709456472dGy.jpg'
        );
      }}
      draw={(dc) => {
        // Draw the image
        dc.image(
          image,
          Math.sin(dc.frameCount / 100) * 200 + dc.windowWidth / 2 - 100,
          10,
          200,
          200
        );
      }}
    />
  );
}

export default Image;
