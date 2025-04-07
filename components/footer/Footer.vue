<template>
  <div class="container mb-32">
    <div class="w-full h-full grid grid-cols-12 gap-grid-gap">
      <div class="col-span-3 flex flex-col gap-grid-gap">
        <StampSheet/>
        <div class="w-full h-full bg-gray-50"></div>
      </div>
      <Envelope class="col-span-6" />
      <div class="col-span-3 bg-gray-50"></div>
    </div>
  </div>
</template>