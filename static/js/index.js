document.addEventListener('DOMContentLoaded', loadInitData)

function titleCase(txt) {
  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}

function extractId(url) {
  const arr = url.split('')
  return arr[arr.length - 2]
}


async function loadInitData() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=7';
  const response = await fetch(url)
  const result = await response.json()

  console.log(result.results);
  pokemons = result.results;

  const ul = document.createElement('ul')
  ul.classList.add('list-group');

  ul.innerHTML = pokemons.map(pokemon => `<li class="list-group-item d-flex justify-content-between">
    <div><b>${titleCase(pokemon.name)}</b></div>
    <div> <a class="btn btn-warning btn-sm text-white" href=/pages/details.html?id=${extractId(pokemon.url)}>View Details</a> </div>
    </li>`)

  document.getElementById('pokemons').appendChild(ul)
}



