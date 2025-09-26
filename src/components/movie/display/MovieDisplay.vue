<script
  setup
  lang="ts"
>
  import { useMovieStore } from '@/stores/movie'
  import MoviePoster from './MoviePoster.vue'
  import MovieHeader from './MovieHeader.vue'
  import MovieDescription from './MovieDescription.vue'
  import MovieActions from './MovieActions.vue'
  import { ref, watch } from 'vue'
  import MovieDisplayWrapper from '@/components/movie/display/MovieDisplayWrapper.vue'

  const movieStore = useMovieStore()

  const transitionName = ref<string>('fade-transition')

  const handleWatchTrailer = (): void => {
    if (movieStore.selectedMovie?.trailer_link) {
      movieStore.openTrailerModal(movieStore.selectedMovie)
    }
  }

  const handleSpinAgain = (): void => {
    movieStore.spinForMovie()
  }

  watch(() => movieStore.selectedMovie, (newValue, oldValue) => {
    transitionName.value = (newValue && oldValue) ? 'scale-transition' : 'slide-x-right-transition'
  }, { immediate: true })
</script>

<template>
  <MovieDisplayWrapper>
    <Transition
      :name="transitionName"
      mode="out-in"
    >
      <div
        v-if="!movieStore.selectedMovie"
        key="empty"
        class="movie-display"
      >
        <div class="no-movie">
          {{ $t('movie.noMovieMessage') }}
        </div>
      </div>

      <div
        v-else
        :key="'movie-' + movieStore.selectedMovie.id"
        class="movie-display"
      >
        <MoviePoster
          :image-path="movieStore.selectedMovie?.image_path"
          :alt-text="movieStore.selectedMovie?.title"
        />

        <div class="movie-details">
          <MovieHeader
            :title="movieStore.selectedMovie?.title"
            :year="movieStore.selectedMovie?.year"
            :rating="movieStore.selectedMovie?.rating_score"
            :genre="movieStore.selectedMovie?.genre_type"
          />

          <MovieDescription
            :description="movieStore.selectedMovie?.description"
          />

          <MovieActions
            :has-trailer="!!movieStore.selectedMovie?.trailer_link"
            :is-spinning="movieStore.isSpinning"
            @watch-trailer="handleWatchTrailer"
            @spin-again="handleSpinAgain"
          />
        </div>
      </div>
    </Transition>
  </MovieDisplayWrapper>
</template>

<style
  lang="scss"
  scoped
>
    .movie-display {
        display: flex;
        gap: 40px;
        width: 100%;
        height: 100%;
        background: rgba(45, 45, 45, 0.8);
        border-radius: 16px;
        padding: 40px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);

        @media (max-width: 1024px) {
            flex-direction: column;
        }
    }

    .movie-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .no-movie {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 24px;
        font-weight: 300;
        color: #ccc;
        line-height: 1.4;

        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
    }
</style>