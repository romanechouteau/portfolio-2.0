<template>
  <canvas class="fixed inset-0" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import App from "@/webgl/App";

const canvas = ref<HTMLCanvasElement | null>(null);
const app = ref<App | null>(null);

onMounted(async () => {
  if (!canvas.value) return;

  app.value = new App(canvas.value);
  await app.value.load();
  app.value.start();
});

onUnmounted(() => {
  app.value?.stop();
});
</script>