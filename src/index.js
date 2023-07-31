import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEL: document.querySelector('.error')
};
const {selectEl, catInfo, loaderEl,errorEL } = refs;

refs.selectEl.addEventListener('change', onSelect);

//chenge select method
function onSelect(evt) {
    const breadsId = evt.currentTarget.value;
    console.log(breadsId);
    fetchCatByBreed(breadsId);
}

//get bread method
fetchBreeds()
  .then(resp => {
    console.log(resp.data);
    setOptionsToSelect(createOptionsMarkup(resp.data));
  })
  .catch(err => console.log(err.massage));

//get bread by id method
fetchCatByBreed(beadId='abys')
  .then(resp => {
    console.log(resp.data);
    showTheCatInfo(createCatInfoMarkup(resp.data));
  })
  .catch(err => console.log(err.massage));


  //create markup from select bdeads
function createOptionsMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value='${id}'>${name}</option>`)
    .join();
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
  return `<img class="cat-img" src="${url}" alt="${name}" width="600">
    <h2 class="cat-breed">${name}</h2>
    <p class="cat-descr">${description}</p>
    <p class="cat-temp"><b>Temperament: </b>${temperament}</p>`;
}
