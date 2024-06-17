document.addEventListener('DOMContentLoaded', getPokemonDetails)

async function getPokemonDetails() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const id = params.get('id');
  console.log(id);

  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`

  const response = await fetch(apiUrl)
  const data = await response.json()
  console.log(data);
  displayPokemonDetails(data)
}

function displayPokemonDetails(data) {
  const { abilities, base_experience, sprites, stats, types, name } = data;

  document.querySelector('.card-title').innerText = name.toUpperCase()
  const imgAttrs = {
    src: sprites.other.dream_world.front_default,
    alt: name
  }

  Object.entries(imgAttrs).forEach(([key, value]) => {
    document.getElementById('image').setAttribute(key, value);
  });

  const baseExp = document.getElementById('base-exp')
  baseExp.innerHTML = `<b>Base Experience:</b> ${base_experience}`

  const abilitiesUI = document.getElementById('abilities')
  const statsUI = document.getElementById('stats')
  const typesUI = document.getElementById('types')

  abilitiesUI.innerHTML = abilities.map(ability => `<li>${ability.ability.name}</li>`).join(' ')
  statsUI.innerHTML = stats.map(stat => `<li>${stat.stat.name}</li>`).join(' ')
  typesUI.innerHTML = types.map(type => `<li>${type.type.name}</li>`).join(' ')

}

