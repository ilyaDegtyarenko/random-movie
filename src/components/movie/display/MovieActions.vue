<script
  setup
  lang="ts"
>
  import { debounceFn } from '@/utils/debounce.ts'

  type Props = {
    hasTrailer?: boolean
    isSpinning?: boolean
  }

  type Emits = {
    (event: 'watchTrailer'): void
    (event: 'spinAgain'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const handleWatchTrailer = debounceFn(() => {
    emit('watchTrailer')
  }, 150)

  const handleSpinAgain = debounceFn(() => {
    emit('spinAgain')
  }, 150)
</script>

<template>
  <div class="movie-actions">
    <button
      :disabled="!props.hasTrailer"
      :class="{
        'watch-button': true,
        'disabled': !props.hasTrailer
      }"
      @click="handleWatchTrailer"
    >
      <span class="button-icon">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </span>

      {{ props.hasTrailer ? $t('movie.actions.watchNow') : $t('movie.actions.noTrailerAvailable') }}
    </button>

    <button
      :disabled="props.isSpinning"
      :class="{
        'spin-again-button': true,
        'disabled': props.isSpinning
      }"
      @click="handleSpinAgain"
    >
      {{ $t('movie.actions.spinAgain') }}
    </button>
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .movie-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: auto;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 15px;
        }
    }

    .watch-button {
        flex: 1;
        background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
        border: none;
        border-radius: 50px;
        padding: 16px 32px;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: background var(--transition-default-duration-with-ease),
        box-shadow var(--transition-default-duration-with-ease);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        text-transform: uppercase;

        &:hover:not(:disabled) {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);

            &:not(:active) {
                box-shadow: 0 0 25px rgba(74, 222, 128, 0.4);
            }
        }

        &.disabled {
            background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
            cursor: not-allowed;
            opacity: 0.7;

            .button-icon {
                opacity: 0.5;
            }
        }

        @media (max-width: 768px) {
            padding: 14px 28px;
            font-size: 16px;
        }
    }

    .spin-again-button {
        flex: 1;
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50px;
        padding: 16px 32px;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: background var(--transition-default-duration-with-ease),
        border-color var(--transition-default-duration-with-ease);
        text-transform: uppercase;

        &:hover:not(:active):not(.disabled) {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 768px) {
            padding: 14px 28px;
            font-size: 16px;
        }
    }

    .button-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>