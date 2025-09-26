<template>
  <div class="app-page">
    <slot />
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .app-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        padding: 32px;
        background: var(--default-bg-color);
    }

    @media (max-width: 768px) {
        .app-page {
            padding: 16px;
        }
    }
</style>
