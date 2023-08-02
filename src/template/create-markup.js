// Create markup from select bdeads
function createOptionsMarkup(arr) {
    return arr
  .map(({ id, name }) => `<option value='${id}'>${name}</option>`)
  .join();

}


//Ccreate markup from once cat
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

  export {createCatInfoMarkup,createOptionsMarkup}