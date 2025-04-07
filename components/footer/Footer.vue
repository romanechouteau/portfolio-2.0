<template>
  <div class="container mb-32">
    <div class="w-full h-full grid grid-cols-12 gap-grid-gap">
      <div class="col-span-3 flex flex-col gap-grid-gap">
        <StampSheet/>
        <div class="relative w-full h-full">
          <img
            src="@/assets/images/keys.svg"
            class="absolute top-0 left-0 w-[101%] max-w-none h-auto"/>
        </div>
      </div>
      <Envelope class="col-span-6" />
      <div class="col-span-3 bg-gray-50"></div>
    </div>
  </div>
</template>