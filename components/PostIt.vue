<template>
  <div class="relative">
    <div class="absolute bg-gray-300 w-full h-full top-0 left-0 rotate-[-3deg]"></div>
    <div class="absolute bg-gray-200 w-full h-full top-0 left-0 rotate-[4deg]"></div>
    <div class="relative bg-gray-100 w-full h-full px-[10%] py-[5%]">
      <img src="@/assets/images/smiley.png" class="w-1/2 h-auto ml-auto" />
    </div>
    <div ref="wrapper" class="absolute inset-0">
      <canvas
        ref="canvas"
        class="w-full h-full"
        @mousedown="onMouseDown"
      ></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { COLORS } from "@/utils/colors";

const wrapper = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const size = ref(4);
const sizeRatio = 0.014;
const pixelRatio = ref(1);
const position = ref({ x: 0, y: 0 });
const color = COLORS["gray-800"];

// --CANVAS SETUP--

onMounted(() => {
  if (!canvas.value) return;
  ctx.value = canvas.value.getContext("2d");
  window.addEventListener("resize", onResize);
  onResize();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

const onResize = () => {
  if (!canvas.value || !wrapper.value) return;

  const { width, height } = wrapper.value.getBoundingClientRect();

  pixelRatio.value = Math.min(window.devicePixelRatio, 3);
  size.value = Math.max(Math.round(width * sizeRatio), 1) * pixelRatio.value;
  canvas.value.width = width * pixelRatio.value;
  canvas.value.height = height * pixelRatio.value;
}

// --CANVAS DRAWING--

const getCoords = (mouseX: number, mouseY: number, cvs: HTMLCanvasElement) => {
  const { x, y } = cvs.getBoundingClientRect();
  return {
    x: (mouseX - x) * pixelRatio.value,
    y: (mouseY - y) * pixelRatio.value
  }
}

const onMouseDown = (evt: MouseEvent) => {
  if (!canvas.value) return;

  position.value = getCoords(evt.clientX, evt.clientY, canvas.value);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

const onMouseMove = (evt: MouseEvent) => {
  if (!canvas.value || !ctx.value) return;

  ctx.value.beginPath();
  ctx.value.moveTo(position.value.x, position.value.y);
  ctx.value.strokeStyle = color;
  ctx.value.lineWidth = size.value;
  ctx.value.lineJoin = "round";

  position.value = getCoords(evt.clientX, evt.clientY, canvas.value);
  ctx.value.lineTo(position.value.x, position.value.y);
  ctx.value.closePath();
  ctx.value.stroke();
}

const onMouseUp = () => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
}
</script>
