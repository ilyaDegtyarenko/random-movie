<script
  setup
  lang="ts"
>
  type Props =  {
    description?: string
  }

  const props = defineProps<Props>()
</script>

<template>
  <div class="movie-description">
    <p>{{ props.description }}</p>
  </div>
</template>

<style
  lang="scss"
  scoped
>
  .movie-description {
    p {
      font-size: 18px;
      line-height: 1.6;
      color: #ddd;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
</style>