class Load {
  private static fonts = new Set<string>();
  /**
   * Load a font from a URL or a local path
   * @param path - The URL or local path of the font
   * @returns The name of the font
   * @example
   * ```tsx
   * const font = await Load.loadFont('/path/to/font.woff2');
   * // Use the font
   * dc.text('Hello, World!', 10, 10, 20, font);
   * ```
   */
  public static async loadFont(path: string): Promise<string> {
    const fileName = path.split('/').pop();
    const fontName = fileName?.split('.')[0];
    if (fontName) {
      if (!this.fonts.has(fontName)) {
        const font = new FontFace(fontName, `url(${path})`);
        await font.load();
        document.fonts.add(font);
        this.fonts.add(fontName);
      }
      return fontName;
    } else {
      throw new Error('Font name not found');
    }
  }
}

export default Load;
