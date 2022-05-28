<script setup lang="ts">
  import { ref } from 'vue'

  import { MovieCard, History, Spinner } from './components/index'
  import { MovieService } from './service/index'
  import { Movie } from './types/index'
  import { generateRandomLetter } from './helpers/index'

  const { searchMovieByLetter } = MovieService()

  enum STATES {
    IDLE,
    LOADING,
    LOADED,
    ERROR,
  }

  const movie = ref({} as Movie)
  const state = ref(STATES.IDLE)
  const history = ref<Movie[]>([])

  const getRandomMovie = async (query: string) => {
    state.value = STATES.LOADING
    try {
      const response = await searchMovieByLetter(query)
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
            <div class="flex flex-row">
              <div
                class="bg-gray-100 opacity-50 animate-pulse w-1/2 h-72"
              ></div>
            </div>
          </div>
          <div v-if="state === STATES.ERROR">
            <span class="text-red-300">Falha ao buscar filme</span>
          </div>
          <div v-if="state === STATES.LOADED && !movie">
            <span class="text-gray-300">Nenhum filme encontrado</span>
          </div>
          <div v-else-if="state === STATES.LOADED && movie">
            <MovieCard :movie="movie" />
          </div>
        </div>
        <button
          @click="getRandomMovie(generateRandomLetter())"
          :disabled="state === STATES.LOADING"
          type="button"
          class="inline-flex w-full justify-center items-center px-3 py-2 border border-transparent text-base leading-4 font-medium rounded-md shadow-sm text-[#102d71] bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
        >
          Encontrar filme
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
