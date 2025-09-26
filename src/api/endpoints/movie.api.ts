import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { Movie, Filters } from '@/ts/types/movie'
import { GenreEnum } from '@/ts/enums/movie'

export default (fetch: AxiosInstance) => ({
  all(config?: AxiosRequestConfig) {
    return fetch<Movie[]>('/data/movies_list.json', config)
  },

  async filtered(filters: Filters, config?: AxiosRequestConfig) {
    // Simulate API filtering by fetching all movies and filtering server-side
    const response = await fetch<Movie[]>('/data/movies_list.json', config)

    const filteredMovies = response.data.filter((movie) => {
      const genreMatch = filters.genre === GenreEnum.All || movie.genre_type === filters.genre
      const yearMatch = movie.year >= filters.minYear && movie.year <= filters.maxYear
      const ratingMatch = movie.rating_score >= filters.minRating && movie.rating_score <= filters.maxRating

      return genreMatch && yearMatch && ratingMatch
    })

    let availableMovies = filteredMovies

    // If there's a currently selected movie and more than one movie available,
    // exclude the current movie to ensure a different one is selected
    if (filters.selectedId && filteredMovies.length > 1) {
      availableMovies = filteredMovies.filter(movie => movie.id !== filters.selectedId)
    }

    return {
      ...response,
      data: availableMovies,
    }
  },
})
