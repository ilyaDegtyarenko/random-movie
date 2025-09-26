<script
  setup
  lang="ts"
>
  type Props = {
    title?: string
    details?: string
  }

  type Emits = {
    (event: 'close'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const handleClose = () => emit('close')
</script>

<template>
  <div class="modal-header">
    <h3 class="modal-title">
      <span>
        {{ props.title }}
      </span>

      <span class="modal-title__details">
        {{ props.details ? (' - ' + props.details) : '' }}
      </span>
    </h3>

    <button
      class="close-button"
      :aria-label="$t('movie.modal.closeModal')"
      @click="handleClose"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 25px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(40, 40, 40, 0.8);
    }

    .modal-title {
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        word-break: break-word;
        color: #fff;
        font-size: 22px;
        font-weight: 600;
        margin: 0;

        &__details {
            font-weight: 400;
            color: #ccc;
        }

        @media (max-width: 480px) {
            font-size: 19px;
        }
    }

    .close-button {
        background: none;
        border: none;
        color: #888;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: all var(--transition-default-duration-with-ease);
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
        }

        &:active {
            transform: scale(0.95);
        }
    }
</style>