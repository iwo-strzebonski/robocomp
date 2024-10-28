<template>
  <div class="min-h-screen w-full overflow-y-auto overflow-x-none flex flex-col">
    <AppHeader class="z-50 absolute"/>
    <div class="w-full h-screen shrink-0 bg-black z-10">
      <div id="bckg-dots" class="absolute w-full h-full opacity-10 -z-10"></div>
      <div id="bckg-smear" class="absolute w-full h-full -z-10"></div>

      <div class="h-20"></div>

      <div class="flex justify-around h-full px-4 pt-4">
        <div class="w-full md:w-1/2 flex flex-col slide-right">
          <NuxtImg src="/img/landing-page/landing-logo.webp" class="w-full" alt="Landing logo" />

          <span class="px-3 py-10 whitespace-pre-wrap text-ellipsis text-white"
            >Festiwal robotyki ROBOCOMP to inicjatywa Koła Naukowego Integra. Główną atrakcją będą zawody robotów oraz
            pokazy firm związanych z robotyką, automatyką i elektroniką.
          </span>

          <NuxtLink
            class="rounded-full bg-blue-500 hover:bg-blue-600 px-8 py-4 self-center uppercase text-white tracking-[.15rem]"
            to="http://registration.robocomp.info"
            target="_blank"
          >
            Dołącz do nas
          </NuxtLink>
        </div>

        <NuxtImg src="/img/landing-page/arm-robocomp.webp" class="hidden md:block slide-up" alt="ROBOCOMP robot arm" />
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<style>
#bckg-dots {
  background: url('/img/landing-page/dot.webp') gray 0% 0% / 50px 50px repeat;
}

#bckg-smear {
  @apply bg-[url('/img/landing-page/bckg-smear.svg')] bg-cover;
}


.slide-up {
  opacity: 0;
  transform: translateY(100%);
  animation: slideUp 1.2s ease forwards;
}

.slide-right {
  opacity: 0;
  transform: translateX(-100%);
  animation: slideRight 1.2s ease forwards;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}

@keyframes slideRight {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
</style>

