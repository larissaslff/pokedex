const pokeApi = {}

function convertPoke(pokemonDetails) {
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetails.id; 
    pokemon.name = pokemonDetails.name;

    const types = pokemonDetails.types.map((typesSlot) => typesSlot.type.name);
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then((pokemon) => convertPoke(pokemon));
}

pokeApi.getPokemons =  (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailsRequest) => Promise.all(detailsRequest))
    .then((pokemonDetails) => pokemonDetails)
}
