<script
  setup
  lang="ts"
>
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useMovieStore } from '@/stores/movie.ts'
  import type { FilterOption } from '@/ts/types/movie.ts'
  import { GenreEnum } from '@/ts/enums/movie.ts'

  import FilterDropdown from './FilterDropdown.vue'
  import SpinButton from './SpinButton.vue'

  const movieStore = useMovieStore()
  const { t } = useI18n()

  const ratingRange = ref<string>('0-10')
  const yearRange = ref<string>('1984-2023')

  const genreOptions = computed<FilterOption[]>(() => {
    return Object.values(GenreEnum).map((value) => {
      return {
        value,
        label: t(`movie.filters.genres.${ value }`),
      }
    })
  })

  const imdbOptions = computed<FilterOption[]>(() => [
    { value: '0-10', label: t('movie.filters.ratings.anyScore') },
    { value: '8-10', label: t('movie.filters.ratings.8to10') },
    { value: '7-10', label: t('movie.filters.ratings.7to10') },
    { value: '6-10', label: t('movie.filters.ratings.6to10') },
    { value: '5-10', label: t('movie.filters.ratings.5to10') },
  ])

  const yearOptions = computed<FilterOption[]>(() => [
    { value: '1984-2023', label: t('movie.filters.years.all') },
    { value: '2020-2023', label: '2020-2023' },
    { value: '2010-2019', label: '2010-2019' },
    { value: '2000-2009', label: '2000-2009' },
    { value: '1990-1999', label: '1990-1999' },
    { value: '1984-1989', label: '1984-1989' },
  ])

  const updateFilters = (): void => {
    movieStore.updateFilters({ ...movieStore.filters })

    movieStore.selectedMovie = null
  }

  const updateRatingFilters = (): void => {
    const [ min, max ] = ratingRange.value.split('-').map(Number)

    movieStore.filters.minRating = Number(min)
    movieStore.filters.maxRating = Number(max)

    updateFilters()
  }

  const updateYearFilters = (): void => {
    const [ min, max ] = yearRange.value.split('-').map(Number)

    movieStore.filters.minYear = Number(min)
    movieStore.filters.maxYear = Number(max)

    updateFilters()
  }

  const handleSpin = (): void => {
    movieStore.spinForMovie()
  }
</script>

<template>
  <div class="movie-filters">
    <div>
      <FilterDropdown
        v-model="movieStore.filters.genre"
        :options="genreOptions"
        :label="$t('movie.filters.genre')"
        @update:model-value="updateFilters"
      />

      <FilterDropdown
        v-model="yearRange"
        :options="yearOptions"
        :label="$t('movie.filters.releaseYear')"
        vertical-only
        @update:model-value="updateYearFilters"
      />

      <FilterDropdown
        v-model="ratingRange"
        :options="imdbOptions"
        :label="$t('movie.filters.imdb')"
        vertical-only
        @update:model-value="updateRatingFilters"
      />
    </div>

    <SpinButton
      :is-spinning="movieStore.isSpinning"
      @spin="handleSpin"
    />
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .movie-filters {
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-basis: 400px;
        background: rgba(45, 45, 45, 0.8);
        border-radius: 12px;
        padding: 30px 30px 40px 30px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);

        @media (max-width: 768px) {
            flex: none;
        }
    }

    @media (max-width: 768px) {
        .movie-filters {
            padding: 20px;
        }

        .filter-group {
            margin-bottom: 25px;
        }

        .spin-button {
            padding: 14px 28px;
            font-size: 16px;
        }
    }
</style>