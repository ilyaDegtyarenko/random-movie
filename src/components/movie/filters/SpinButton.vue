<script
  setup
  lang="ts"
>
  import { debounceFn } from '@/utils/debounce.ts'

  type Props = {
    isSpinning?: boolean
  }

  type Emits = {
    (event: 'spin'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const handleSpin = debounceFn(() => {
    emit('spin')
  }, 150)
</script>

<template>
  <button
    :disabled="props.isSpinning"
    :class="{
      'spin-button': true,
      'spinning': props.isSpinning
    }"
    @click="handleSpin"
  >
    <span
      v-if="props.isSpinning"
      key="spinner"
      class="spinner"
    ></span>

    <span key="text">
      {{ $t('movie.filters.spin') + (props.isSpinning ? '...' : '') }}
    </span>
  </button>
</template>

<style
  lang="scss"
  scoped
>
    .spin-button {
        width: 100%;
        background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
        border: none;
        border-radius: 50px;
        margin-top: 16px;
        padding: 16px 32px;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 1px;
        cursor: pointer;
        transition: background var(--transition-default-duration-with-ease),
        box-shadow var(--transition-default-duration-with-ease);
        position: relative;
        overflow: hidden;
        text-transform: uppercase;

        &:hover:not(:disabled) {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);

            &:not(:active) {
                box-shadow: 0 0 25px rgba(74, 222, 128, 0.4);
            }
        }

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        &.spinning {
            background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
        }

        @media (max-width: 768px) {
            margin-top: 8px;
            padding: 14px 28px;
            font-size: 16px;
        }
    }

    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid #fff;
        border-radius: 50%;
        animation: spin 300ms linear infinite;
        display: inline-block;
        margin-right: 10px;
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