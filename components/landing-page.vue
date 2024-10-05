<template>
  <div class="block w-full h-screen shrink-0 overflow-hidden">
    <div id="bckg-dots" class="absolute w-full h-full opacity-10 -z-10"></div>
    <div id="bckg-smear" class="absolute w-full h-full -z-10"></div>

    <AppHeader></AppHeader>
    <div class="flex justify-around h-full px-4 pt-4">
      <div class="w-full md:w-1/2 flex flex-col p">
        <NuxtImg src="/landing-page-img/landing-logo.png" class="w-full"></NuxtImg>
        <!-- TODO - zmienić grafikę bo jest  hala krakowi a nie agh-->
        <div class="px-3 py-10 whitespace-pre-wrap text-ellipsis">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci eius dolores pariatur quidem, temporibus
          ut
          eos enim suscipit distinctio commodi expedita asperiores ea possimus non excepturi illum sit delectus
          magnam?
        </div>
        <button class="rounded-full bg-blue-400 hover:bg-blue-500 w-48 h-14 self-center">Dołącz do nas</button>
      </div>
      <NuxtImg src="/landing-page-img/arm-robocomp.png" class="hidden md:block"></NuxtImg>

    </div>

  </div>
</template>

<script lang="ts" setup></script>

<style>
#bckg-dots {
  background: url('/landing-page-img/dot.png') gray 0% 0% / 50px 50px repeat;
}

#bckg-smear {
  background: url('/landing-page-img/bckg-smear.png');
}
</style>
