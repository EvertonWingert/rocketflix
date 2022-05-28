<script lang="ts" setup>
  import { Movie } from '../types/index'

  interface Props {
    movies: Movie[]
  }

  defineProps<Props>()
</script>

<template>
  <div class="overflow-auto">
    <h1 class="text-white text-2xl pt-5">History</h1>
    <ul class="list-disc pt-5">
      <li v-for="movie in movies" class="text-white">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>
