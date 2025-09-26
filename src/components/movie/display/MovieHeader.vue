<script
  setup
  lang="ts"
>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { GenreEnum } from '@/ts/enums/movie.ts'

  type Props = {
    title?: string
    year?: number
    rating?: number
    genre?: GenreEnum
  }

  const props = defineProps<Props>()

  const { t } = useI18n()

  const formattedGenre = computed<string>(() => {
    return t(`movie.filters.genres.${ props.genre }`, [], { default: props.genre })
  })
</script>

<template>
  <div class="movie-header">
    <h1 class="movie-title">{{ props.title }}</h1>

    <div class="movie-meta">
      <span class="movie-year">{{ props.year }}</span>
      <span class="meta-separator">•</span>
      <span class="movie-rating">IMDB: {{ props.rating }}/10</span>
      <span class="meta-separator">•</span>
      <span class="movie-genre">{{ formattedGenre }}</span>
    </div>
  </div>
</template>

<style
  lang="scss"
  scoped
>
    .movie-header {
        .movie-title {
            font-size: 40px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 15px;
            line-height: 1.2;

            @media (max-width: 768px) {
                font-size: 32px;
            }

            @media (max-width: 480px) {
                font-size: 27px;
            }
        }

        .movie-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 16px;
            color: #ccc;
            flex-wrap: wrap;

            @media (max-width: 480px) {
                font-size: 14px;
                gap: 8px;
            }
        }

        .movie-year,
        .movie-rating,
        .movie-genre {
            font-weight: 500;
        }

        .movie-rating {
            color: #4ade80;
            font-weight: 600;
        }

        .meta-separator {
            color: #666;
            font-weight: bold;
        }
    }
</style>