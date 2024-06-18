

async function handleSubmit(e) {
  e.preventDefault();

  const pokemonName = e.target.name.value
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`


  try {
    const response = await fetch(url)
    const data = await response.json()
    displayPokemonDetails(data)
    e.target.reset();
  } catch (error) {
    alert(`Pokemone with the name of ${pokemonName} is not available`)
  }
}


function displayPokemonDetails(data) {
  const { id, name, sprites } = data;
  console.log(data);

  const pokemonUI = `<div class="card">
          <img src=${sprites.other.dream_world.front_default} class="card-img-top mx-auto py-3" alt=${name}>
          <div class="card-body text-center">
            <h5 class="card-title">${name}</h5>
            <a href="/pages/details.html?id=${id}" class="btn btn-sm btn-primarys">View Details</a>
            <button class="btn btn-success my-2 btn-sm" id="addBtn" onclick="addToTeam('${encodeURIComponent(JSON.stringify(data))}')">Add to Team</button>
          </div>
        </div>`;

  const div = document.createElement('div');
  div.innerHTML = pokemonUI;
  const pokemonContainer = document.getElementById('pokemons-container');
  pokemonContainer.appendChild(div);
}


let pokemonTeam = JSON.parse(localStorage.getItem('members')) || [];
function addToTeam(data) {
  const { id, name, sprites } = JSON.parse(decodeURIComponent(data));
  const pokemonObj = { id, name, sprites }

  const foundPokemon = pokemonTeam.find(item => item.id === id)
  if (!foundPokemon) {
    pokemonTeam.push(pokemonObj);
    localStorage.setItem('members', JSON.stringify(pokemonTeam));
    renderMember(pokemonTeam);

  } else {
    document.getElementById('pokeName').innerText = name
    const myModal = new bootstrap.Modal('#onload');
    myModal.show();
  }

}

function renderMember(pokemonTeam) {
  const memberContainer = document.querySelector('.member-container')
  memberContainer.innerHTML = '';

  pokemonTeam.forEach(member => {
    const { id, name, sprites } = member;
    const memberUI = `<div class="card card-body">
              <img src=${sprites.other.dream_world.front_default} class="card-img-top mx-auto" alt=${name}>
              <div class="card-body">
                <h5 class="card-title text-center">${name}</h5>
                <a class="btn btn-danger btn-sm d-block" onclick="removeMember(${id})">X</a>
              </div>
            </div>`

    const div = document.createElement('div');
    div.innerHTML = memberUI;

    memberContainer.appendChild(div);
  })

  if (document.querySelector('.member-container').childElementCount > 0) {
    document.querySelector('.member-container').lastElementChild.style.animation = 'appear 1.5s ease';
  }
}

renderMember(pokemonTeam)

function removeMember(id) {
  pokemonTeam = pokemonTeam.filter(member => member.id != id)
  renderMember(pokemonTeam)
  localStorage.setItem('members', JSON.stringify(pokemonTeam));
  document.querySelector('.member-container').lastElementChild.style.animation = ''
}
