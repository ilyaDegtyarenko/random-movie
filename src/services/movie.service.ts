import axiosInstance from '@/api/axiosInstance'
import movieApi from '@/api/endpoints/movie.api'
import type { Filters } from '@/ts/types/movie'

export const movieService = {
  /**
   * Retrieves all movies using the specified API.
   *
   * @function
   * @returns A promise that resolves to an array of movie objects.
   */
  getAllMovies: () => movieApi(axiosInstance).all(),

  /**
   * Retrieves filtered movies using the specified API.
   *
   * @function
   * @param filters - The filter criteria to apply
   * @returns A promise that resolves to an array of filtered movie objects.
   */
  getFilteredMovies: (filters: Filters) => movieApi(axiosInstance).filtered(filters),
}
