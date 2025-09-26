import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Movie, Filters } from '@/ts/types/movie.ts'
import { movieService } from '@/services/movie.service.ts'
import { GenreEnum } from '@/ts/enums/movie.ts'

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<Movie[]>([])
  const selectedMovie = ref<Movie | null>(null)
  const isSpinning = ref<boolean>(false)
  const showTrailerModal = ref<boolean>(false)

  const filters = reactive<Filters>({
    genre: GenreEnum.All,
    minYear: 1984,
    maxYear: 2023,
    minRating: 0,
    maxRating: 10,
  })

  const loadMovies = async (): Promise<void> => {
    try {
      const { data } = await movieService.getAllMovies()

      movies.value = data
    } catch (error) {
      console.error('Failed to load movies:', error)

      movies.value = []
    }
  }

  const updateFilters = (newFilters: Filters): void => {
    Object.assign(filters, newFilters)
  }

  const getFilteredMovies = async (): Promise<Movie[]> => {
    try {
      const { data } = await movieService.getFilteredMovies({
        ...filters,
        selectedId: selectedMovie.value?.id,
      })

      return data
    } catch (error) {
      console.error('Failed to load filtered movies:', error)

      return []
    }
  }

  const spinForMovie = async (): Promise<void> => {
    if (isSpinning.value) {
      return
    }

    isSpinning.value = true

    // Simulate spinning animation delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const filteredMovies = await getFilteredMovies()

    if (filteredMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMovies.length)

      selectedMovie.value = filteredMovies[randomIndex]!
    } else {
      selectedMovie.value = null
    }

    isSpinning.value = false
  }

  const openTrailerModal = (movie: Movie | null): void => {
    if (movie?.trailer_link) {
      showTrailerModal.value = true
    }
  }

  const closeTrailerModal = (): void => {
    showTrailerModal.value = false
  }

  return {
    movies,
    selectedMovie,
    isSpinning,
    showTrailerModal,
    filters,

    loadMovies,
    updateFilters,
    getFilteredMovies,
    spinForMovie,
    openTrailerModal,
    closeTrailerModal,
  }
})