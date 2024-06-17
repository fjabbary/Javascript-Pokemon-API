

async function handleSubmit(e) {
  e.preventDefault();

  const pokemonName = e.target.name.value
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    displayPokemonDetails(data)
  } catch (error) {
    alert(`Pokemone with the name of ${pokemonName} is not available`)
  }
}


function displayPokemonDetails(data) {
  const { id, name, sprites } = data;

  const pokemonUI = `<div class="card" style="width: 18rem;">
          <img src=${sprites.other.dream_world.front_default} class="card-img-top" alt=${name}>
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <a href="/pages/details.html?id=${id}" class="btn btn-warning">View Details</a>
          </div>
        </div>`;

  const div = document.createElement('div');
  div.innerHTML = pokemonUI;
  const pokemonContainer = document.getElementById('pokemons-container');
  pokemonContainer.appendChild(div);
}