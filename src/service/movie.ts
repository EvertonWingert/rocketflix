import { Movie } from "../types/index";
import { BASE_URL, API_KEY } from "../constants/index";
import { HttpClient } from "../helpers/index";

 //TODO: create type for client
const LANGUAGE = 'language=pt-BR'
export const MovieService = () => {

    const searchMovieByLetter = async (letter: string): Promise<Movie> => {
          const response = await HttpClient().get(`${BASE_URL}/search/movie?api_key=${API_KEY}&${LANGUAGE}&query=${letter}`);
        const movies = response.results;
        return movies[Math.floor(Math.random() * movies.length)];
    
    }

    return {
        searchMovieByLetter
    }

}