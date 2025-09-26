<script
  setup
  lang="ts"
>
  import { defineAsyncComponent, onMounted } from 'vue'
  import { useAppStore } from '@/stores/app.ts'
  import { useMovieStore } from '@/stores/movie'

  import AppPage from '@/components/app/AppPage.vue'
  import MovieFilters from '@/components/movie/filters/MovieFilters.vue'
  import MovieDisplay from '@/components/movie/display/MovieDisplay.vue'

  const LazyMovieTrailerModal = defineAsyncComponent(() => import('@/components/movie/trailer/MovieTrailerModal.vue'))

  const appStore = useAppStore()
  const movieStore = useMovieStore()

  onMounted(async () => {
    await movieStore.loadMovies()

    // Simulate data loading delay
    setTimeout(() => {
      appStore.showLoader = false
    }, 300)
  })
</script>

<template>
  <AppPage>
    <div class="movie-container">
      <MovieFilters />

      <MovieDisplay />
    </div>

    <LazyMovieTrailerModal
      v-if="movieStore.showTrailerModal"
      key="movie-trailer-modal"
    />
  </AppPage>
</template>

<style
  lang="scss"
  scoped
>
    .movie-container {
        display: flex;
        justify-content: center;
        gap: 40px;
        width: 100%;

        @media (max-width: 1024px) {
            gap: 28px;
            align-items: flex-start;
        }

        @media (max-width: 860px) {
            flex-direction: column;
            gap: 16px;
            width: 100%;
        }

        @media (max-width: 768px) {
            align-items: normal;
        }
    }
</style>