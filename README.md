Simple react component library to draw some basic shapes using canvas. inspired by [p5.js](https://p5js.org/) and [react-p5](https://www.npmjs.com/package/react-p5)

> :warning: **This is a work in progress**: This library is not ready for production use yet.

## Implemented shapes and features

| Feature                 | Description                                            | Status |
| ----------------------- | ------------------------------------------------------ | ------ |
| `background`            | Set the background color                               | ✅     |
| `fill`                  | Set the fill color                                     | ✅     |
| `stroke`                | Set the stroke color                                   | ✅     |
| `strokeWeight`          | Set the stroke weight                                  | ✅     |
| `noFill`                | Disable fill                                           | ✅     |
| `noStroke`              | Disable stroke                                         | ✅     |
| `arc`                   | Draw an arc                                            | ❌     |
| `ellipse`               | Draw an ellipse                                        | ✅     |
| `circle`                | Draw a circle                                          | ✅     |
| `line`                  | Draw a line                                            | ✅     |
| `rect`                  | Draw a rectangle                                       | ✅     |
| `triangle`              | Draw a triangle                                        | ❌     |
| `quad`                  | Draw a quadrilateral, a four sided polygon             | ❌     |
| Curves and bezier       | Draw curves and bezier curves                          | ❌     |
| Typography              | Draw text on the canvas                                | ❌     |
| `map`                   | Re-maps a number from one range to another             | ❌     |
| `dist`                  | Calculate the distance between two points              | ✅     |
| `noise`                 | Generate a value between 0 and 1                       | ✅     |
| Vector manipulation     | Add, subtract, multiply, divide, and more              | ❌     |
| `context`               | draw on 2d context it manually                         | ✅     |
| `width` and `height`    | The width and height of the canvas                     | ✅     |
| `mouseX` and `mouseY`   | Horizontal and vertical position of the mouse          | ✅     |
| `pmouseX` and `pmouseY` | Previous horizontal and vertical position of the mouse | ❌     |
| `mouseIsPressed`        | True if the mouse is pressed                           | ❌     |
| `mouseButton`           | The current state of the mouse button                  | ❌     |
| `mouseWheel`            | The amount the mouse wheel has moved                   | ❌     |
| `key`                   | The value of the most recent key pressed               | ❌     |
| `keyCode`               | The value of the most recent key pressed               | ❌     |
| `keyIsPressed`          | True if a key is pressed                               | ❌     |
| `frameCount`            | The number of frames displayed                         | ✅     |
| `frameRate`             | The number of frames displayed per second              | ✅     |
| `save`                  | Save the canvas as an image                            | ❌     |
| `fullscreen`            | Set the canvas to fullscreen                           | ❌     |
| Transformations         | Translate, rotate, scale, and more                     | ❌     |
| Image manipulation      | Load, display, and manipulate images                   | ❌     |

## Notes

- This library is not intended to replace p5.js, it's just a simple alternative for react developers who want to draw shapes using canvas.

- This library will not support webgl, sound, or any other feature that is not related to drawing shapes on a canvas or user interaction. This is a design decision to keep the library simple and focused.

- This library is not intended to be a 1:1 copy of p5.js, some features may be missing or implemented differently.

- This library is not intended to be a general purpose canvas library, it's just for drawing shapes and user interaction.
