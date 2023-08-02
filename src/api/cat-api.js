import axios from 'axios';

const API_KEY =
  'live_dd0iS9bjfaYqfTXyQxs7HmzJnQH9UcuL3VeJ9m57LBzbAUBHcODQS9O5fkUr8YK7';
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
 
  return axios.get(`${BASE_URL}/breeds`);
 
}

function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
}

export { fetchBreeds, fetchCatByBreed };
