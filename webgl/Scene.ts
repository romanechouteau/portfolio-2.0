import { type OGLRenderingContext, Renderer } from "ogl";
// import { Camera, type OGLRenderingContext, Renderer, Transform } from "ogl";

import { Background } from "./Background";

export class Scene {
  // root: Transform;
  // camera: Camera;

  background: Background;

  constructor(private gl: OGLRenderingContext, private renderer: Renderer) {
    // this.root = new Transform();

    // this.camera = new Camera(gl);
    // this.camera.position.z = 5;

    this.background = new Background(gl);
  }

  // LOAD

  async load() {
    // load ressources
  }

  // RESIZE

  resize() {
    // this.camera.perspective({
    //   aspect: this.gl.canvas.width / this.gl.canvas.height,
    // });
    // this.camera.updateMatrixWorld();
  }

  // RENDER

  preRender(time: number) {
    this.background.preRender(time);
  }

  render() {
    // this.renderer.render({ scene: this.root, camera: this.camera });
    this.renderer.render({ scene: this.background.mesh });
  }
}