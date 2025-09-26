<script
  lang="ts"
  setup
>
  import AppSpinner from '@/components/app/AppSpinner.vue'
</script>

<template>
  <div class="loader-overlay">
    <div class="loader-icon">
      <img
        src="/apple-touch-icon.png"
        alt="Loader icon"
        draggable="false"
      />
    </div>

    <div class="loader-content">
      <AppSpinner />

      <div class="loading-text">
        {{ $t('loading') }}...
      </div>
    </div>
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .loader-overlay {
        z-index: 1100;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        background: var(--default-bg);
    }

    .loader-icon {
        display: flex;
        height: 140px;
    }

    .loader-content {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .loading-text {
        font-size: 16px;
    }
</style>
