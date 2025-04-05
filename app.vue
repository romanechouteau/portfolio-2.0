<template>
  <!-- <WebGL /> -->
  <div class="absolute top-0 left-0 w-full min-h-screen bg-gray-400">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
</script>
