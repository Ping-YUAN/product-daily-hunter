/* eslint-disable @typescript-eslint/no-explicit-any */
export class Chart {
  public canvas;
  public options;
  public data;
  // this is not a complete mock. You may need to mock other properties as well.

  public constructor(canvas: any, options: any) {
    this.canvas = canvas;
    this.options = options;
    this.data = options.data;
  }
}
