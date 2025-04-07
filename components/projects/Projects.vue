<template>
  <div class="div flex flex-col gap-8">
    <Project
      v-for="project in projects"
      :key="project.name"
      :name="project.name"
      :color="project.color"
    />
  </div>
</template>

<script setup lang="ts">
import projectData from "@/data/projects.json";
const projects = projectData.projects;
</script>