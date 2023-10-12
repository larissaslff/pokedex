const pokemonList = document.getElementById('pokemonList');
const loadMore = document.getElementById('loadMore')
const limit = 5
let offset = 0


function loadMoreItens(offset, limit) {
    function convertPokemonToLi(pokemon) {
        return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name"> ${pokemon.name} </span>
        
        <div class="detail">
            <ol class="types">
               ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
            </ol>
    
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
    </li>
    `
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => convertPokemonToLi(pokemon)).join(' ')
    })
}

loadMoreItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit
    loadMoreItens(offset, limit)
})