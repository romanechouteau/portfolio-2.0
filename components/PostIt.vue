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

const position = ref({ x: 0, y: 0 });
const color = COLORS["gray-800"];
const size = 2;

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
  canvas.value.width = width;
  canvas.value.height = height;
}

// --CANVAS DRAWING--

const getCoords = (mouseX: number, mouseY: number, cvs: HTMLCanvasElement) => {
  const { x, y } = cvs.getBoundingClientRect();
  return {
    x: mouseX - x,
    y: mouseY - y
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
  ctx.value.lineWidth = size;

  position.value = getCoords(evt.clientX, evt.clientY, canvas.value);
  ctx.value.lineTo(position.value.x, position.value.y);
  ctx.value.stroke();
  ctx.value.closePath();
}

const onMouseUp = () => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
}
</script>
