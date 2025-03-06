import { Geometry, Program, Mesh, type OGLRenderingContext } from 'ogl';

export class Background {
  prg: Program;
  geom: Geometry;
  mesh: Mesh;

  constructor(gl: OGLRenderingContext) {
    this.geom = new Geometry(gl, {
        position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
        uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    this.prg = new Program(gl, {
        vertex: /* glsl */ `
            attribute vec2 uv;
            attribute vec2 position;

            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = vec4(position, 0, 1);
            }
        `,
        fragment: /* glsl */ `
            precision highp float;

            uniform float uTime;

            varying vec2 vUv;

            void main() {
                gl_FragColor = vec4(vUv.x, vUv.y + cos(uTime) * 0., 1., 1.);
            }
        `,
        uniforms: {
            uTime: { value: 0 },
        },
        depthWrite: false,
    });

    this.mesh = new Mesh(gl, { geometry: this.geom, program: this.prg, frustumCulled: false });
  }

  // PRE-RENDER

  preRender(time: number) {
    this.prg.uniforms.uTime.value = time * 0.001;
  }
}