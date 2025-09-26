<template>
  <div class="app-spinner"></div>
</template>

<style
  lang="scss"
  scoped
>
    .app-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid var(--color-primary);
        border-radius: 50%;
        animation: spin 500ms linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
