<script
  setup
  lang="ts"
>
  import { ref } from 'vue'

  type Props = {
    imagePath?: string
    altText?: string
  }

  const props = defineProps<Props>()

  const imageError = ref<boolean>(false)

  const handleImageError = (): void => {
    imageError.value = true
  }
</script>

<template>
  <div class="movie-poster">
    <img
      key="image"
      :src="props.imagePath"
      :alt="props.altText"
      class="poster-image"
      @error="handleImageError"
    >

    <div
      v-if="imageError"
      key="placeholder"
      class="poster-placeholder"
    >
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21,15 16,10 5,21" />
      </svg>
    </div>
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .movie-poster {
        flex: 0 0 300px;
        height: 450px;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
        background: rgba(60, 60, 60, 0.5);

        @media (max-width: 1400px) {
            flex: 0 0 250px;
        }

        @media (max-width: 768px) {
            flex: none;
            height: 300px;
            align-self: center;
        }

        @media (max-width: 480px) {
            flex: none;
            width: 200px;
            height: 300px;
        }
    }

    .poster-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-default-duration-with-ease);

        &:hover {
            transform: scale(1.02);
        }
    }

    .poster-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(60, 60, 60, 0.8);
        color: #888;
    }
</style>