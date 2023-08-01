import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchBreeds, fetchCatByBreed } from './tamplate/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
  selectEl: document.querySelector('#js-select'),
  catInfo: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEL: document.querySelector('.error'),
};
const { selectEl, catInfo, loaderEl, errorEL } = refs;
const arrSelect = [];

selectEl.addEventListener('change', onSelect);

loaderEl.classList.replace('loader', 'is-hidden');
errorEL.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

//chenge select method
function onSelect(evt) {
  let breadsId = evt.currentTarget.value;

 loaderEl.classList.replace('is-hidden', 'loader');
errorEL.classList.add('is-hidden');
 catInfo.classList.add('is-hidden');
  //get bread by id method
  fetchCatByBreed(breadsId)
    .then(resp => {
        loaderEl.classList.replace('loader', 'is-hidden');
        selectEl.classList.remove('is-hidden');
    
      const oneCat = resp.data;

      showTheCatInfo(createCatInfoMarkup(oneCat));
      refs.catInfo.classList.remove('is-hidden');
    })
    .catch(fetchError);
}

//get bread method
fetchBreeds()
  .then(resp => {
    setOptionsToSelect(createOptionsMarkup(resp.data));
  })
  .catch(fetchError);

//create markup from select bdeads
function createOptionsMarkup(arr) {
  arr.map(({ id, name }) => arrSelect.push({ text: name, value: id }));
  //   return arr
  // .map(({ id, name }) => `<option value='${id}'>${name}</option>`)
  // .join();
  //   console.log(arrSelect)
  new SlimSelect({
    select: '#js-select',
    data: arrSelect,
  });
}

//set options to select
function setOptionsToSelect(markup) {
  selectEl.innerHTML = markup;
}

//show once cat
function showTheCatInfo(markup) {
  catInfo.innerHTML = markup;
}

//create markup from once cat
function createCatInfoMarkup({
  0: {
    breeds: {
      0: { name, description, temperament },
    },
    url,
  },
}) {
  return `<img class="cat-img" src="${url}" alt="${name}" width="400">
  <div class="wrapper">
  <h1 class="cat-breed">${name}</h1>
  <p class="cat-descr">${description}</p>
  <p class="cat-temp"><b>Temperament: </b>${temperament}</p>
  </div>`;
}

function fetchError() {
  refs.selectEl.classList.remove('is-hidden');
  refs.loaderEl.classList.replace('loader', 'is-hidden');

  refs.errorEL.hidden = false;
  Report.failure(
    'Error download',
    `${refs.errorEL.textContent}`, 'OK',
    
  );
}
