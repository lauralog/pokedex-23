export const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/"
export const abilitiesUrl = "https://pokeapi.co/api/v2/ability/"

export const offsetKanto = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
export const offsetJohto = "https://pokeapi.co/api/v2/pokemon/?offset=151&limit=100"
export const offsetHoenn = "https://pokeapi.co/api/v2/pokemon/?offset=251&limit=135"
export const offsetSinnoh = "https://pokeapi.co/api/v2/pokemon/?offset=386&limit=108"



/**
 * 
 * @param {number} pokemon_id pokemon.id from POkemon endpoint "https://pokeapi.co/api/v2/pokemon/{id or name}/" 
 */
export const getPokemonIconURL = (pokemon) => {
    const iconURLstart = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/"
    const pokemonId = pokemon.id // pokemon.id
    const iconURLend = ".png"

    const pokeIconURL = iconURLstart + pokemonId + iconURLend
    return pokeIconURL
}

/**
 * 
 * @param {number} pokemon_id // link to GitHub repository
 */
export const getPokemonGIFIconURL = (pokemon) => {
    const iconURLstart = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"
    const pokemonId = pokemon.id // pokemon.id
    const iconURLend = ".gif"

    const pokeIconURL = iconURLstart + pokemonId + iconURLend
    return pokeIconURL
}

/**
 * 
 * @param {number} pokemon_id pokemon.id from POkemon endpoint "https://pokeapi.co/api/v2/pokemon/{id or name}/" 
 */
export const getPokemonEvolutionIconURL = (pokemon) => {
    const iconURLstart = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/"
    const pokemonId = pokemon.id // pokemon.id
    const iconURLend = ".png"

    const pokeIconURL = iconURLstart + pokemonId + iconURLend
    return pokeIconURL
}