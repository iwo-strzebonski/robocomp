<template>
  <div class="w-full h-screen shrink-0 overflow-hidden bg-black z-0">
    <div id="bckg-dots" class="absolute w-full h-full opacity-10 -z-10"></div>
    <div id="bckg-smear" class="absolute w-full h-full -z-10"></div>

    <AppHeader />

    <div class="flex justify-around h-full px-4 pt-4">
      <div class="w-full md:w-1/2 flex flex-col">
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

      <NuxtImg src="/img/landing-page/arm-robocomp.webp" class="hidden md:block" alt="ROBOCOMP robot arm" />
    </div>
  </div>
</template>

<style>
#bckg-dots {
  background: url('/img/landing-page/dot.webp') gray 0% 0% / 50px 50px repeat;
}

#bckg-smear {
  @apply bg-[url('/img/landing-page/bckg-smear.svg')] bg-cover;
}
</style>
