<script setup lang="ts">
  import { ref } from 'vue'

  import { MovieService } from './service/index'

  import MovieCard from './components/MovieCard.vue'

  import { Movie } from './types/movie'
  import { STATES } from './types/state'

  import { generateRandomLetter } from './helpers/index'
  import FailedToLoad from './components/FailedToLoad.vue'
  import EmptyMovie from './components/EmptyMovie.vue'
  import LoadingMovie from './components/LoadingMovie.vue'
  import History from './components/History.vue'
  import Spinner from './components/Spinner.vue'

  const { searchMovieByChar } = MovieService()

  const movie = ref({} as Movie)
  const state = ref(STATES.IDLE)
  const history = ref<Movie[]>([])

  const handleGenerate = () => {
    const char = generateRandomLetter()

    getRandomMovie(char)
  }

  const getRandomMovie = async (char: string) => {
    state.value = STATES.LOADING
    try {
      const response = await searchMovieByChar(char)
      movie.value = response
      history.value.push(response)
      state.value = STATES.LOADED
    } catch (error) {
      state.value = STATES.ERROR
    }
  }
</script>

<template>
  <div class="w-screen min-h-screen flex justify-center rocketflix__background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-5">
        <div class="flex flex-col items-center justify-center pt-5 mt-5">
          <img src="./assets/logo.svg" class="w-36" />
          <h1 class="leading-6 text-4xl text-white font-bold">
            Não sabe o que assistir?
          </h1>
        </div>
        <div class="max-w-lg pt-5 mt-5 text-center">
          <div v-if="state === STATES.IDLE">
            <span class="text-white">Clique no botão para buscar um filme</span>
          </div>
          <div v-if="state === STATES.LOADING">
            <LoadingMovie />
          </div>
          <div v-if="state === STATES.ERROR">
            <FailedToLoad />
          </div>
          <div v-if="state === STATES.LOADED && !movie">
            <EmptyMovie />
          </div>
          <div v-else-if="state === STATES.LOADED && movie">
            <MovieCard :movie="movie" />
          </div>
        </div>
        <button
          @click="handleGenerate"
          :disabled="state === STATES.LOADING"
          type="button"
          class="inline-flex w-full justify-center items-center px-3 py-2 border border-transparent text-base leading-4 font-medium rounded-md shadow-sm text-[#102d71] bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
        >
          {{ state === STATES.LOADING ? 'Buscando...' : 'Encontrar filme' }}
          <Spinner class="ml-2" v-if="state === STATES.LOADING" />
        </button>
      </div>
      <div>
        <History :movies="history" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .rocketflix__background {
    background: linear-gradient(43deg, #102d71 0%, #000000 52%, #c12a23 100%);
  }
</style>
