<script
  setup
  lang="ts"
>
  import { ref, onMounted, onUnmounted, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useMovieStore } from '@/stores/movie'
  import ModalHeader from './ModalHeader.vue'
  import VideoPlayer from './VideoPlayer.vue'

  const movieStore = useMovieStore()
  const { t } = useI18n()

  const videoPlayerRef = ref<InstanceType<typeof VideoPlayer> | null>(null)

  const selectedMovieDetails = computed<string>(() => {
    const { year, genre_type } = movieStore.selectedMovie || {}

    return `(${ year }, ${ t('movie.filters.genres.' + genre_type) })`
  })

  const closeModal = (): void => {
    // Pause video if playing
    if (videoPlayerRef.value) {
      videoPlayerRef.value.pause()
    }

    movieStore.closeTrailerModal()
  }

  const handleBackdropClick = (event: MouseEvent): void => {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  const handleEscapeKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      closeModal()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey)
    document.body.style.overflow = 'hidden'
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey)
    document.body.style.overflow = ''
  })
</script>

<template>
  <div
    class="modal-overlay"
    @click="handleBackdropClick"
  >
    <div class="modal-container">
      <ModalHeader
        :title="movieStore.selectedMovie?.title"
        :details="selectedMovieDetails"
        @close="closeModal"
      />

      <VideoPlayer
        ref="videoPlayerRef"
        :src="movieStore.selectedMovie?.trailer_link"
        :autoplay="true"
      />
    </div>
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
        animation: fadeIn 0.3s ease-out;
    }

    .modal-container {
        background: rgba(30, 30, 30, 0.95);
        border-radius: 16px;
        width: 100%;
        max-width: 900px;
        max-height: 90vh;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        animation: slideIn 0.4s ease-out;

        @media (max-width: 768px) {
            max-width: 95%;
            max-height: 85vh;
        }
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 25px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(40, 40, 40, 0.8);
    }

    .modal-title {
        color: #fff;
        font-size: 22px;
        font-weight: 600;
        margin: 0;

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

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
</style>