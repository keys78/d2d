<template>
  <main id="main">
    <RouterView />
  </main>
</template>

<script setup>
</script>

<!-- <template>
  <main id="main">
    <RouterView v-slot="{ Component }">
      <Transition name="page-slide" mode="out-in">
        <div>
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>
</template>

<script setup>
</script>

<style>
.page-slide-enter-active,
.page-slide-leave-active {
  transition: 400ms ease all;
}
.page-slide-enter-from,
.page-slide-leave-to {
  transition: 600ms ease all;
  transform: translateY(60px);
}
</style> -->