import { Renderer, type OGLRenderingContext } from 'ogl';
import { Scene } from './Scene';

export default class App {
    gl: OGLRenderingContext;
    scene: Scene;
    rafId?: number;
    renderer: Renderer;

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Renderer({
            width: window.innerWidth,
            height: window.innerHeight,
            canvas,
            antialias: true,
            dpr: Math.min(3, window.devicePixelRatio),
        });

        this.gl = this.renderer.gl;
        this.scene = new Scene(this.gl, this.renderer);
    }

    // START/STOP

    start() {
        window.addEventListener('resize', this.resize, false);
        this.resize();

        this.rafId = requestAnimationFrame(this.update);
    }

    stop() {
        window.removeEventListener('resize', this.resize);
        if (!this.rafId) return;
        cancelAnimationFrame(this.rafId);
    }

    // LOAD

    async load() {
        await this.scene.load();
    }

    // RESIZE

    resize = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene.resize();
    }

    // RENDER

    update = (t: number) => {
        this.scene.preRender(t);
        this.scene.render();

        requestAnimationFrame(this.update);
    }
}