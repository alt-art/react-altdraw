const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;
const scaled_cosine = (i: number) => 0.5 * (1.0 - Math.cos(i * Math.PI));

export type Vector = {
  x: number;
  y: number;
  z: number;
};

export enum MouseButtons {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
  BACK = 3,
  FORWARD = 4,
}

class DrawContext2D {
  private perlin: number[] | null = null;
  private perlin_octaves = 4;
  private perlin_amp_falloff = 0.5;
  private doStroke = false;
  private doFill = true;
  private textFont = 'sans-serif';
  private textSize = 16;

  /**
   * The canvas rendering context
   * @returns The canvas rendering context
   */
  public context: CanvasRenderingContext2D | null = null;

  /**
   * The width of the canvas
   * @returns The width of the canvas
   */
  public windowWidth: number;

  /**
   * The height of the canvas
   * @returns The height of the canvas
   */
  public windowHeight: number;

  /**
   * The frame count of the canvas
   * @returns The frame count of the canvas
   */
  public frameCount = 0;

  /**
   * The frame rate of the canvas in seconds
   * @returns The frame rate of the canvas
   */
  public frameRate = 0;

  /**
   * Mouse x-coordinate
   * @returns The x-coordinate of the mouse
   */
  public mouseX = 0;

  /**
   * Mouse y-coordinate
   * @returns The y-coordinate of the mouse
   */
  public mouseY = 0;

  /**
   * Previous mouse x-coordinate
   * @returns The previous x-coordinate of the mouse
   */
  public pmouseX = 0;

  /**
   * Previous mouse y-coordinate
   * @returns The previous y-coordinate of the mouse
   */
  public pmouseY = 0;

  /**
   * Mouse is pressed
   * @returns Whether the mouse is pressed
   * @example
   * if (drawContext.mouseIsPressed) {
   *  drawContext.circle(drawContext.mouseX, drawContext.mouseY, 50);
   * }
   */
  public mouseIsPressed = false;

  /**
   * Mouse button
   * @returns The mouse button that is pressed
   * @example
   * if (drawContext.mouseButton === MouseButtons.LEFT) {
   *  drawContext.circle(drawContext.mouseX, drawContext.mouseY, 50);
   * }
   */
  public mouseButton: MouseButtons | null = null;

  /**
   * Key
   * @returns The key that is pressed
   * @example
   * if (drawContext.key === 'a') {
   * drawContext.circle(100, 100, 50);
   * }
   */
  public key: string | null = null;

  /**
   * Key code
   * @returns The key code that is pressed
   * @example
   * if (drawContext.keyCode === 'KeyA') {
   * drawContext.circle(100, 100, 50);
   * }
   */
  public keyCode: string | null = null;

  /**
   * Key is pressed
   * @returns Whether the key is pressed
   * @example
   * if (drawContext.keyIsPressed) {
   * drawContext.circle(100, 100, 50);
   * }
   */
  public keyIsPressed = false;

  public constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
    this.windowWidth = canvas.width;
    this.windowHeight = canvas.height;
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.pmouseX = this.mouseX;
      this.pmouseY = this.mouseY;
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
    window.addEventListener('mousedown', (e) => {
      this.mouseIsPressed = true;
      this.mouseButton = e.button;
    });
    window.addEventListener('mouseup', () => {
      this.mouseButton = null;
      this.mouseIsPressed = false;
    });
    window.addEventListener('keydown', (e) => {
      this.key = e.key;
      this.keyCode = e.code;
      this.keyIsPressed = true;
    });
    window.addEventListener('keyup', () => {
      this.key = null;
      this.keyCode = null;
      this.keyIsPressed = false;
    });
  }

  /**
   * Resize the canvas
   *
   * @param width - The new width of the canvas
   * @param height - The new height of the canvas
   *
   * @example
   * drawContext.resize(500, 500);
   */
  public resize(width: number, height: number): void {
    this.windowWidth = width;
    this.windowHeight = height;
  }

  /**
   * Update the frame
   * @example
   * drawContext.updateFrame();
   */
  public updateFrame(): void {
    this.context?.clearRect(0, 0, this.windowWidth, this.windowHeight);
    this.frameCount++;
  }

  /**
   * Set the color of the shape's fill
   * @param color - The color of the fill
   * @example
   * drawContext.fill('red');
   * drawContext.circle(100, 100, 50);
   * drawContext.fill('#00FF00');
   * drawContext.circle(200, 200, 50);
   * drawContext.fill('rgb(0, 0, 255)');
   * drawContext.circle(300, 300, 50);
   */
  public fill(color: string): void {
    if (this.context) {
      this.context.fillStyle = color;
      this.doFill = true;
    }
  }

  /**
   * Disable the fill of the shape
   * @example
   * drawContext.noFill();
   * drawContext.circle(100, 100, 50);
   */
  public noFill(): void {
    this.doFill = false;
  }

  /**
   * Set the background color
   * @param color - The color of the background
   * @example
   * drawContext.background('gray');
   */
  public background(color: string): void {
    if (this.context) {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.windowWidth, this.windowHeight);
    }
  }

  /**
   * Disable the stroke of the shape
   * @example
   * drawContext.noStroke();
   * drawContext.circle(100, 100, 50);
   */
  public noStroke(): void {
    this.doStroke = false;
  }

  /**
   * Set the color of the shape's stroke
   * @param color - The color of the stroke
   * @example
   * drawContext.stroke('red');
   * drawContext.circle(100, 100, 50);
   * drawContext.stroke('#00FF00');
   * drawContext.circle(200, 200, 50);
   * drawContext.stroke('rgb(0, 0, 255)');
   * drawContext.circle(300, 300, 50);
   */
  public stroke(color: string): void {
    if (this.context) {
      this.context.strokeStyle = color;
      this.doStroke = true;
    }
  }

  /**
   * Set the weight of the stroke
   * @param weight - The weight of the stroke
   * @example
   * drawContext.strokeWeight(2);
   * drawContext.circle(100, 100, 50);
   */
  public strokeWeight(weight: number): void {
    if (this.context) {
      this.context.lineWidth = weight;
    }
  }

  /**
   * Draw a line
   * @param x1 - The x-coordinate of the first point
   * @param y1 - The y-coordinate of the first point
   * @param x2 - The x-coordinate of the second point
   * @param y2 - The y-coordinate of the second point
   * @example
   * drawContext.line(0, 0, 100, 100);
   */
  public line(x1: number, y1: number, x2: number, y2: number): void {
    if (this.context) {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.closePath();
      this.context.stroke();
    }
  }

  /**
   * Draw a arc
   * @param x - The x-coordinate of the center of the arc
   * @param y - The y-coordinate of the center of the arc
   * @param radius - The radius of the arc
   * @param start - The start angle of the arc
   * @param stop - The stop angle of the arc
   * @example
   * drawContext.arc(100, 100, 50, 0, Math.PI);
   */
  public arc(
    x: number,
    y: number,
    radius: number,
    start: number,
    stop: number
  ): void {
    if (this.context && (this.doFill || this.doStroke)) {
      this.context.beginPath();
      this.context.arc(x, y, radius, start, stop);
      if (this.doFill) {
        this.context.fill();
      }
      this.context.closePath();
      if (this.doStroke) {
        this.context.stroke();
      }
    }
  }

  /**
   * Draw a circle
   * @param x - The x-coordinate of the center of the circle
   * @param y - The y-coordinate of the center of the circle
   * @param radius - The radius of the circle
   * @example
   * drawContext.circle(100, 100, 50);
   */
  public circle(x: number, y: number, radius: number): void {
    if (this.context && (this.doFill || this.doStroke)) {
      this.context.beginPath();
      this.context.arc(x, y, Math.abs(radius), 0, Math.PI * 2);
      if (this.doFill) {
        this.context.fill();
      }
      this.context.closePath();
      if (this.doStroke) {
        this.context.stroke();
      }
    }
  }

  /**
   * Draw a ellipse
   * @param x - The x-coordinate of the center of the ellipse
   * @param y - The y-coordinate of the center of the ellipse
   * @param width - The width of the ellipse
   * @param height - The height of the ellipse
   * @example
   * drawContext.ellipse(100, 100, 50, 100);
   */
  public ellipse(x: number, y: number, width: number, height: number): void {
    if (this.context && (this.doFill || this.doStroke)) {
      this.context.beginPath();
      this.context.ellipse(
        x,
        y,
        Math.abs(width),
        Math.abs(height),
        0,
        0,
        Math.PI * 2
      );
      this.context.closePath();
      if (this.doFill) {
        this.context.fill();
      }
      if (this.doStroke) {
        this.context.stroke();
      }
    }
  }

  /**
   * Draw a rectangle
   * @param x - The x-coordinate of the upper-left corner of the rectangle
   * @param y - The y-coordinate of the upper-left corner of the rectangle
   * @param width - The width of the rectangle
   * @param height - The height of the rectangle
   * @example
   * drawContext.rect(100, 100, 50, 100);
   */
  public rect(x: number, y: number, width: number, height: number): void {
    if (this.context && (this.doFill || this.doStroke)) {
      if (this.doFill) {
        this.context.fillRect(x, y, width, height);
      }
      if (this.doStroke) {
        this.context.strokeRect(x, y, width, height);
      }
    }
  }

  /**
   * Draw a triangle
   * @param x1 - The x-coordinate of the first point
   * @param y1 - The y-coordinate of the first point
   * @param x2 - The x-coordinate of the second point
   * @param y2 - The y-coordinate of the second point
   * @param x3 - The x-coordinate of the third point
   * @param y3 - The y-coordinate of the third point
   * @example
   * drawContext.triangle(100, 100, 200, 200, 300, 300);
   */
  public triangle(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ): void {
    if (this.context && (this.doFill || this.doStroke)) {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.lineTo(x3, y3);
      this.context.closePath();
      if (this.doFill) {
        this.context.fill();
      }
      if (this.doStroke) {
        this.context.stroke();
      }
    }
  }

  /**
   * Draw a quad (four-sided polygon)
   * @param x1 - The x-coordinate of the first point
   * @param y1 - The y-coordinate of the first point
   * @param x2 - The x-coordinate of the second point
   * @param y2 - The y-coordinate of the second point
   * @param x3 - The x-coordinate of the third point
   * @param y3 - The y-coordinate of the third point
   * @param x4 - The x-coordinate of the fourth point
   * @param y4 - The y-coordinate of the fourth point
   * @example
   * drawContext.quad(100, 100, 200, 200, 300, 300, 400, 400);
   */
  public quad(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ): void {
    if (this.context && (this.doFill || this.doStroke)) {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.lineTo(x3, y3);
      this.context.lineTo(x4, y4);
      this.context.closePath();
      if (this.doFill) {
        this.context.fill();
      }
      if (this.doStroke) {
        this.context.stroke();
      }
    }
  }

  /**
   * Draw text
   * @param text - The text to draw
   * @param x - The x-coordinate of the text
   * @param y - The y-coordinate of the text
   * @param size - The size of the text
   * @param font - The font of the text
   * @example
   * drawContext.text('Hello, World!', 100, 100);
   * drawContext.text('Hello, World!', 100, 100, 20);
   * drawContext.text('Hello, World!', 100, 100, 20, 'monospace');
   */
  public text(
    text: string,
    x: number,
    y: number,
    size?: number,
    font?: string
  ): void {
    if (size) {
      this.textSize = size;
    }
    if (font) {
      this.textFont = font;
    }
    if (this.context) {
      this.context.font = `${this.textSize}px ${this.textFont}`;
      this.context.fillText(text, x, y);
    }
  }

  /**
   * Get the width of the text
   * @param text - The text to measure
   * @param size - The size of the text
   * @param font - The font of the text
   * @example
   * const width = drawContext.textWidth('Hello, World!');
   * const width = drawContext.textWidth('Hello, World!', 20);
   * const width = drawContext.textWidth('Hello, World!', 20, 'monospace');
   * console.log(width);
   * @returns The width of the text
   */
  public textWidth(text: string, size?: number, font?: string): number {
    if (size) {
      this.textSize = size;
    }
    if (font) {
      this.textFont = font;
    }
    if (this.context) {
      this.context.font = `${this.textSize}px ${this.textFont}`;
      return this.context.measureText(text).width;
    }
    return 0;
  }

  /**
   * Map a value from one range to another
   * @param value - The value to map
   * @param start1 - The start of the first range
   * @param stop1 - The stop of the first range
   * @param start2 - The start of the second range
   * @param stop2 - The stop of the second range
   * @example
   * const mappedValue = drawContext.map(50, 0, 100, 0, 1);
   * console.log(mappedValue);
   * @returns The mapped value
   */
  public map(
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ): number {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  /**
   * Perlin noise generator 3D
   * @param x - The x-coordinate
   * @param y - The y-coordinate
   * @param z - The z-coordinate
   * @example
   * const noiseValue = drawContext.noise(0.5, 0.5, 0.5);
   * console.log(noiseValue);
   * @returns The noise value
   */
  // Implementation of perlin noise generator from p5.js library
  // Link: https://github.com/processing/p5.js/blob/main/src/math/noise.js
  public noise(x: number, y = 0, z = 0): number {
    if (this.perlin == null) {
      this.perlin = new Array(PERLIN_SIZE + 1);
      for (let i = 0; i < PERLIN_SIZE + 1; i++) {
        this.perlin[i] = Math.random();
      }
    }

    if (x < 0) {
      x = -x;
    }
    if (y < 0) {
      y = -y;
    }
    if (z < 0) {
      z = -z;
    }

    let xi = Math.floor(x),
      yi = Math.floor(y),
      zi = Math.floor(z);
    let xf = x - xi;
    let yf = y - yi;
    let zf = z - zi;
    let rxf, ryf;

    let r = 0;
    let ampl = 0.5;

    let n1, n2, n3;

    for (let o = 0; o < this.perlin_octaves; o++) {
      let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

      rxf = scaled_cosine(xf);
      ryf = scaled_cosine(yf);

      n1 = this.perlin[of & PERLIN_SIZE];
      n1 += rxf * (this.perlin[(of + 1) & PERLIN_SIZE] - n1);
      n2 = this.perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
      n2 += rxf * (this.perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
      n1 += ryf * (n2 - n1);

      of += PERLIN_ZWRAP;
      n2 = this.perlin[of & PERLIN_SIZE];
      n2 += rxf * (this.perlin[(of + 1) & PERLIN_SIZE] - n2);
      n3 = this.perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
      n3 += rxf * (this.perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
      n2 += ryf * (n3 - n2);

      n1 += scaled_cosine(zf) * (n2 - n1);

      r += n1 * ampl;
      ampl *= this.perlin_amp_falloff;
      xi <<= 1;
      xf *= 2;
      yi <<= 1;
      yf *= 2;
      zi <<= 1;
      zf *= 2;

      if (xf >= 1.0) {
        xi++;
        xf--;
      }
      if (yf >= 1.0) {
        yi++;
        yf--;
      }
      if (zf >= 1.0) {
        zi++;
        zf--;
      }
    }
    return r;
  }

  /**
   * Create a 3D vector
   * @param x - The x-coordinate
   * @param y - The y-coordinate
   * @param z - The z-coordinate
   * @example
   * const vector = drawContext.createVector(1, 2, 3);
   * console.log(vector);
   * @returns The 3D vector
   */
  public createVector(x: number, y: number, z: number): Vector {
    return { x, y, z };
  }

  /**
   * Distance between two points
   * @param x1 - The x-coordinate of the first point
   * @param y1 - The y-coordinate of the first point
   * @param x2 - The x-coordinate of the second point
   * @param y2 - The y-coordinate of the second point
   * @example
   * const distance = drawContext.dist(0, 0, 100, 100);
   * console.log(distance);
   * @returns The distance between the two points
   */
  dist(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
}

export default DrawContext2D;
