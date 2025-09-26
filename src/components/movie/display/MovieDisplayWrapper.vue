<script
  lang="ts"
  setup
>
  import { useMovieStore } from '@/stores/movie.ts'

  const movieStore = useMovieStore()
</script>

<template>
  <div
    :class="{
      'movie-display-wrapper': true,
      'movie-display-wrapper--spinning': movieStore.isSpinning,
    }"
  >
    <slot />
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .movie-display-wrapper {
        position: relative;
        flex-basis: 60%;
        max-width: 900px;

        &--spinning {
            &:before {
                z-index: 1;
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(45, 45, 45, 0.8);
                backdrop-filter: blur(10px);
                border-radius: 16px;
            }

            &:after {
                z-index: 2;
                content: '';
                position: absolute;
                top: calc(50% - 20px);
                left: calc(50% - 20px);
                width: 40px;
                height: 40px;
                border: 3px solid transparent;
                border-top: 3px solid #fff;
                border-radius: 50%;
                animation: spin 300ms linear infinite;
                display: inline-block;
                margin-right: 10px;

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            }
        }
    }
</style>