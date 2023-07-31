import axios from 'axios';

import { fetchBreeds, fetchCatByBreed, API_KEY } from './js/cat-api';

axios.defaults.headers.common['x-api-key'] = API_KEY;

fetchBreeds().then(data => console.log(data)).catch(err => console.log(err.massage));

// fetchCatByBreed('abys')
//   .then(result => console.log(result))
//   .catch(err =>
//     console.log(err.massage)
//   );
