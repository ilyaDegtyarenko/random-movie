<script
  lang="ts"
  setup
>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const appTitle = import.meta.env.VITE_APP_TITLE

  const currentYear = computed<number>(() => {
    return new Date().getFullYear()
  })
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__section">
          <h3 class="footer__title">
            {{ appTitle }}
          </h3>

          <p class="footer__description">
            {{ t('footer.description') }}
          </p>
        </div>

        <div class="footer__section">
          <h4 class="footer__subtitle">
            {{ t('footer.quickLinks') }}
          </h4>

          <ul class="footer__links">
            <li>
              <a
                href="https://github.com/ilyaDegtyarenko/random-movie"
                target="_blank"
                class="footer__link"
              >
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">
          © {{ currentYear }} {{ appTitle }}. {{ t('footer.allRightsReserved') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style
  lang="scss"
  scoped
>
    .footer {
        background: var(--default-bg);
        color: #fff;
        margin-top: auto;

        &__container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 32px;
        }

        &__content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 32px;
            margin-bottom: 32px;
        }

        &__section {
            display: flex;
            flex-direction: column;
            gap: 16px;

            &:last-of-type {
                justify-self: center;
            }
        }

        &__title {
            font-size: 24px;
            font-weight: 600;
            color: var(--color-primary);
            margin: 0;
        }

        &__subtitle {
            font-size: 18px;
            font-weight: 500;
            margin: 0;
        }

        &__description {
            color: #ccc;
            line-height: 1.6;
            margin: 0;
        }

        &__links {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        &__link {
            color: #ccc;
            text-decoration: none;
            transition: color var(--transition-default-duration-with-ease);

            &:hover {
                color: var(--color-primary);
            }
        }

        &__bottom {
            border-top: 1px solid #444;
            padding-top: 32px;
            text-align: center;
        }

        &__copyright {
            color: #ccc;
            font-size: 14px;
            margin: 0;
        }
    }

    @media (max-width: 768px) {
        .footer {
            &__container {
                padding: 24px 16px;
            }

            &__content {
                grid-template-columns: 1fr;
                gap: 24px;
            }

            &__section:last-of-type {
                justify-self: auto;
            }
        }
    }
</style>