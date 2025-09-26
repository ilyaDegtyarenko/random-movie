import { GenreEnum } from '@/ts/enums/movie.ts'

export type Movie = {
  id: number
  title: string
  year: number
  description: string
  image_path: string
  genre_type: GenreEnum
  rating_score: number
  trailer_link: string
}

export type Filters = {
  genre: GenreEnum
  minYear: number
  maxYear: number
  minRating: number
  maxRating: number
  selectedId?: Movie['id']
}

export type FilterOption = {
  label: string
  value: string
}