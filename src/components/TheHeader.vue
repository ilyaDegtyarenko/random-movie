<script
  lang="ts"
  setup
>
  import AppLanguageSwitcher from '@/components/app/AppLanguageSwitcher.vue'

  const appTitle = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <img
          src="/apple-touch-icon.png"
          :alt="appTitle"
          class="header__logo-image"
        >

        <h1 class="header__title">
          {{ appTitle }}
        </h1>
      </div>

      <AppLanguageSwitcher />
    </div>
  </header>
</template>

<style
  lang="scss"
  scoped
>
    .header {
        z-index: 100;
        position: sticky;
        top: 0;
        background: var(--default-bg);

        &__container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        &__logo-image {
            width: 32px;
            height: 32px;
            border-radius: 4px;
        }

        &__title {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
        }
    }

    @media (max-width: 768px) {
        .header {
            &__container {
                padding: 16px;
            }

            &__title {
                font-size: 20px;
            }
        }
    }
</style>