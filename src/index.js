import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './api/cat-api';
import { createCatInfoMarkup, createOptionsMarkup } from './template/create-markup';

const refs = {
  selectEl: document.querySelector('#js-select'),
  catInfo: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEL: document.querySelector('.error'),
};
const { selectEl, catInfo, loaderEl, errorEL } = refs;


selectEl.addEventListener('change', onSelect);


// Chenge select method
function onSelect(evt) {

catInfo.innerHTML = '';

  let breadsId = evt.target.value;
  hidden();

  //get bread by id method
  fetchCatByBreed(breadsId)
    .then(resp => {
      setMarkup(catInfo, createCatInfoMarkup(resp.data));
      hidden()
    })
    .catch(fetchError);
}

// Get bread method
fetchBreeds()
  .then(resp => {
    const cat = resp.data
    setMarkup(selectEl, createOptionsMarkup(cat));
    slim();
    hidden()
  })
  .catch(fetchError);



function setMarkup(element, markup) {
  element.innerHTML = markup;
}


function slim() {
    new SlimSelect({
        select: "#js-select",
    })
    
}



function hidden(){
    loaderEl.classList.toggle('is-hidden')
    loaderEl.classList.toggle('loader')
}
// Show error notification
function fetchError() {
  Report.failure('Error download', `${refs.errorEL.textContent}`, 'OK');
}
