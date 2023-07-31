import axios from 'axios';

const API_KEY =
  'live_dd0iS9bjfaYqfTXyQxs7HmzJnQH9UcuL3VeJ9m57LBzbAUBHcODQS9O5fkUr8YK7';
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  // https://api.thecatapi.com/v1/breeds?api_key=live_dd0iS9bjfaYqfTXyQxs7HmzJnQH9UcuL3VeJ9m57LBzbAUBHcODQS9O5fkUr8YK7
  //   ${BASE_URL}/breeds?api_key=${API_KEY}
  return axios.get(`${BASE_URL}/breeds`);
 
}

function fetchCatByBreed(breedId) {
  //https:api.thecatapi.com/v1/images/search?breed_ids=abys
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
}

export { fetchBreeds, fetchCatByBreed };
