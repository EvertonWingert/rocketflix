<script lang="ts" setup>
import { Movie } from '../types/index';

interface Props {
    movie: Movie
}

defineProps<Props>();

</script>
<template>
    <div class="sm:flex">
        <div class="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
            <img
                class="rounded h-96 w-52 object-cover hover:opacity-75 transition ease-in-out duration-150"
                :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            />
        </div>
        <div>
            <h4 class="text-lg font-bold text-white">{{ movie.title }}</h4>
            <p class="mt-1 text-gray-300">{{ movie.overview }}</p>
        </div>
    </div>
</template>
