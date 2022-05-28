<script lang="ts" setup>
  import { Movie } from '../types/movie'
  import { STATES } from '../types/state'
  import EmptyMovie from './EmptyMovie.vue'

  interface Props {
    movies: Movie[]
  }

  defineProps<Props>()
</script>

<template>
  <div>
    <h1 class="text-white text-2xl pt-5">History</h1>
    <div
      class="overflow-auto max-h-56 border border-gray-600 px-2 rounded mt-5"
    >
      <div v-if="!movies.length" class="py-5 px-2">
        <span class="text-gray-300">Nenhum filme no histórico</span>
      </div>
      <ul v-else class="list-disc py-3 space-y-2">
        <li v-for="movie in movies" class="text-white">
          <a
            :href="`https://www.themoviedb.org/movie/${movie.id}`"
            class="hover:underline text-blue-500"
            target="_blank"
            >{{ movie.title }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
