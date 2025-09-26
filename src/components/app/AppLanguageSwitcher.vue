<script
  setup
  lang="ts"
>
  import { useI18n } from 'vue-i18n'
  import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

  const { locale } = useI18n()
  const isMenuOpen = ref(false)

  const switcherRef = useTemplateRef('switcherRef')

  const selectLanguage = (value: string): void => {
    locale.value = value
    localStorage.setItem('userLang', value)
    isMenuOpen.value = false
  }

  const toggleMenu = (): void => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const handleClickOutside = (event: Event): void => {
    if (switcherRef.value && !switcherRef.value.contains(event.target as Node)) {
      isMenuOpen.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<template>
  <div
    ref="switcherRef"
    class="language-switcher"
  >
    <button
      class="language-switcher__button"
      :class="{ 'language-switcher__button--active': isMenuOpen }"
      @click="toggleMenu"
    >
      <svg
        class="language-switcher__icon language-switcher__icon--translate"
        viewBox="0 0 24 24"
      >
        <path
          d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z"
        />
      </svg>

      <span class="language-switcher__text">
        {{ $i18n.locale }}
      </span>

      <svg
        viewBox="0 0 24 24"
        :class="{
          'language-switcher__icon language-switcher__icon--chevron': true,
          'language-switcher__icon--rotated': isMenuOpen
        }"
      >
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    </button>

    <ul
      :class="{
        'language-switcher__menu': true,
        'language-switcher__menu--open': isMenuOpen
      }"
    >
      <li
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :class="{
          'language-switcher__item': true,
          'language-switcher__item--active': $i18n.locale === locale
        }"
        @click="selectLanguage(locale)"
      >
        {{ locale }}
      </li>
    </ul>
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .language-switcher {
        position: relative;
        display: inline-block;

        &__button {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 22px;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
            cursor: pointer;
            transition: var(--transition-default-duration-with-ease);
            transition-property: background-color, border-color, transform;

            &:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.3);
            }

            &:active {
                transform: scale(0.98);
            }

            &--active {
                background: rgba(71, 75, 216, 0.2);
                border-color: var(--color-primary);
            }
        }

        &__icon {
            width: 18px;
            height: 18px;
            fill: currentColor;
            flex-shrink: 0;
            transition: transform var(--transition-default-duration-with-ease);

            &--rotated {
                transform: rotate(180deg);
            }
        }

        &__text {
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        &__menu {
            position: absolute;
            top: calc(100% + 4px);
            right: 0;
            min-width: 120px;
            background: #2d2d2d;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            list-style: none;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px);
            transition: var(--transition-default-duration-with-ease);
            transition-property: opacity, visibility, transform;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

            &--open {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
        }

        &__item {
            padding: 10px 16px;
            font-size: 13px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            cursor: pointer;
            color: #fff;
            transition: background-color var(--transition-default-duration-with-ease);
            text-align: center;

            &:first-child {
                border-radius: 7px 7px 0 0;
            }

            &:last-child {
                border-radius: 0 0 7px 7px;
            }

            &:only-child {
                border-radius: 7px;
            }

            &:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            &--active {
                background: var(--color-primary);
                color: #fff;
            }
        }
    }
</style>
