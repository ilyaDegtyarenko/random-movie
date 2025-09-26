<script
  setup
  lang="ts"
>
  import { ref } from 'vue'

  type Props = {
    src?: string
    autoplay?: boolean
  }

  type Emits = {
    (event: 'error'): void
    (event: 'retry'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const videoRef = ref<HTMLVideoElement | null>(null)
  const videoError = ref<boolean>(false)

  const handleVideoError = (): void => {
    videoError.value = true

    emit('error')
  }

  const retryVideo = (): void => {
    videoError.value = false

    if (videoRef.value) {
      videoRef.value.load()
    }

    emit('retry')
  }

  defineExpose({
    pause: () => {
      if (videoRef.value) {
        videoRef.value.pause()
      }
    },
  })
</script>

<template>
  <div class="modal-content">
    <div
      v-if="props.src && !videoError"
      key="video"
      class="video-container"
    >
      <video
        ref="videoRef"
        :src="props.src"
        controls
        :autoplay="props.autoplay"
        class="trailer-video"
        @error="handleVideoError"
      >
        {{ $t('movie.modal.videoNotSupported') }}
      </video>
    </div>

    <div
      v-else-if="!props.src"
      key="no-trailer"
      class="no-trailer"
    >
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>

      <p>{{ $t('movie.modal.noTrailerMessage') }}</p>
    </div>

    <div v-else-if="videoError" class="video-error">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>

      <p>{{ $t('movie.modal.videoLoadError') }}</p>

      <button
        class="retry-button"
        @click="retryVideo"
      >
        {{ $t('movie.modal.tryAgain') }}
      </button>
    </div>
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .modal-content {
        padding: 0;
    }

    .video-container {
        position: relative;
        width: 100%;
        background: #000;
    }

    .trailer-video {
        width: 100%;
        height: auto;
        min-height: 400px;
        max-height: 500px;
        display: block;

        @media (max-width: 768px) {
            min-height: 250px;
            max-height: 350px;
        }
    }

    .no-trailer,
    .video-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 40px;
        color: #888;
        text-align: center;

        svg {
            margin-bottom: 20px;
            opacity: 0.6;
        }

        p {
            font-size: 18px;
            margin: 0;

            @media (max-width: 480px) {
                font-size: 16px;
            }
        }

        @media (max-width: 768px) {
            padding: 40px 30px;
        }
    }

    .retry-button {
        margin-top: 20px;
        background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
        border: none;
        border-radius: 25px;
        padding: 12px 24px;
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--transition-default-duration-with-ease);

        &:hover {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(0);
        }
    }
</style>