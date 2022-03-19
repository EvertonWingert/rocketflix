<script setup lang="ts">
import { ref } from 'vue';

import { MovieCard, Spinner } from './components/index';
import { MovieService } from './service/index';
import { Movie } from './types/index';
import { generateRandomLetter } from './helpers/index'

const { searchMovieByLetter } = MovieService();

const movie = ref();
const isLoading = ref<boolean>(false);

const getRandomMovie = async (query: string) => {
  isLoading.value = true;
  try {
    const response = await searchMovieByLetter(query);
    movie.value = response
  } catch (error) {
    //TODO: handle error
    console.log(error);
  } finally {
    isLoading.value = false;
  }

}

</script>

<template>
  <div class="w-screen h-screen flex justify-center rocketflix__background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-5">
        <div class="flex flex-col items-center justify-center pt-5 mt-5">
          <img src="./assets/logo.svg" class="w-36" />
          <h1 class="leading-6 text-4xl text-white font-bold">Não sabe o que assistir?</h1>
        </div>
        <div class="max-w-lg pt-5 mt-5">
          <div v-if="!movie">
            <span>Nenhum filme</span>
          </div>
          <MovieCard :movie="movie" />
        </div>
        <button
          @click="getRandomMovie(generateRandomLetter())"
          type="button"
          class="inline-flex w-full justify-center items-center px-3 py-2 border border-transparent text-base leading-4 font-medium rounded-md shadow-sm text-[#102d71] bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Encontrar filme
          <Spinner class="ml-2" v-if="isLoading" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rocketflix__background {
  background: linear-gradient(43deg, #102d71 0%, #000000 52%, #c12a23 100%);
}
</style>
