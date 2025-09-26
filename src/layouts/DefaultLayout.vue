<script
  setup
  lang="ts"
>
  import { useAppStore } from '@/stores/app.ts'

  import TheHeader from '@/components/TheHeader.vue'
  import TheFooter from '@/components/TheFooter.vue'
  import TheLoader from '@/components/TheLoader.vue'

  const appStore = useAppStore()
</script>

<template>
  <div class="layout">
    <Transition name="fade-transition">
      <TheLoader
        v-if="appStore.showLoader"
        key="loader"
      />
    </Transition>

    <div
      class="layout-content"
      key="layout-content"
    >
      <TheHeader />

      <main class="main-content">
        <Suspense>
          <slot />
        </Suspense>
      </main>

      <TheFooter />
    </div>
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .layout {
        overflow: auto;
        height: 100vh;
    }

    .layout-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
        background: var(--default-bg);
    }

    .main-content {
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
    }
</style>
