<template>
  <div class="relative w-full h-[100vh] shrink-0">
    <div id="bckg-dots" class="absolute w-full h-full opacity-10 bg-gray-200"></div>
    <div id="bckg-smear" class="absolute w-full h-full"></div>

    <div class="flex h-full">
      <div class="w-1/2">
        <NuxtImg src="images/landing-logo.png" class="w-full"></NuxtImg>
        <div class="px-5 py-10 overflow-auto whitespace-pre-wrap text-ellipsis">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci eius dolores pariatur quidem, temporibus ut
          eos enim suscipit distinctio commodi expedita asperiores ea possimus non excepturi illum sit delectus magnam?
        </div>
        <button class="rounded-[50px] bg-[#38bdf8]/70 w-[200px] h-[3.5rem] ml-[70px]">Dołącz do nas</button>
      </div>  
      <NuxtImg src="images/arm-robocomp.png" class="h-full w-auto self-end"></NuxtImg>
    </div>

  </div>
</template>

<script lang="ts" setup></script>

<style>
#bckg-dots {
  background: url('images/dot.png') lightgray 0% 0% / 50px 50px repeat;
}

#bckg-smear {
  background: url('images/bckg-smear.png');
}
</style>
