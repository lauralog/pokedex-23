import { pokemonUrl } from "../constants/services"
import { renderPokedetail } from "./pokedetail.controller"

export const evolutionChainHTML = async (pokemon) => {
    const evolutions = await createEvolutionChainArray(pokemon)

    let html = ''

    if (evolutions.length <= 1) {
        html += 'Este pokemon no tiene evoluciones'
    } else {
        
        let counter = 0
        for (const evolution of evolutions) {
            const minLvl = evolution.min_level
            html += `
                ${renderArrow(counter, minLvl)}
                <div class="pokemon_evolution" position=${counter} pokemon="${pokemon.name}">
                    <span class="evolution_name badge">${evolution.name}</span>
                    <span class="evolution_pic">
                        <img src="${await getIcon(evolution.name)}" alt="evolIcon">
                    </span>
                </div>
            `
            counter++
            
        }
    }
    const container = document.querySelector('.pokedetail_evolutions')
    container.innerHTML = html

}

/**
 * PASS
 * Al clickar en las evoluciones, cargar la vista detalle del pokemon 
 */
const initEvolEvent = () => {}


/**
 * 
 * @param {number} counter 
 * @param {number} minLvl 
 * @returns 
 */
const renderArrow = (counter, minLvl) => {
    let divider = ''
    if (counter > 0) {
        divider += `
            <div class="evolution_divider">
                <span class="level">${minLvl? 'lvl.'+minLvl : 'método especial'}</span>
                <span class="arrow"> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="3-Arrow Right"/>
                    </svg>
                </span>
            </div>
        `
    }
    return divider
}


/**
 * Crea un array con la línea evolutiva del pokemon para usarla posteriormente
 * @param {Object} pokemon 
 * returns evoChain array
 */
const createEvolutionChainArray = async(pokemon) => {
    // fecth pokemon species
    const speciesUrl = pokemon.species.url
    const pokemonSpeciesResponse = await fetch(speciesUrl).then((res) => res.json())

    // evolution_chain fetch
    const evolChainUrl = pokemonSpeciesResponse.evolution_chain.url
    const evolutionChainResponse = await fetch(evolChainUrl).then((res) => res.json())

    let evoChain = [];
    let evoData = evolutionChainResponse.chain;
    // console.log(evoData);

    do {
      let numberOfEvolutions = evoData['evolves_to'].length; 
      let evoDetails = evoData['evolution_details'][0]; 
    
      evoChain.push({
        "name": evoData.species.name,
        "url": evoData.species.url,
        "min_level": !evoDetails ? 1 : evoDetails.min_level,
      });
    
        if(numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) { 
                evoChain.push({
                    "name": evoData.evolves_to[i].species.name,
                    "url": evoData.evolves_to[i].species.url,
                    "min_level": !evoDetails ? 1 : evoDetails.min_level,
                });
            }
        }        
    
      evoData = evoData['evolves_to'][0];
    
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    // console.log(evoChain);

    return evoChain;
}

/**
 * 
 * @param {String} name pokemon name
 * @returns image url
 */
const getIcon = async (name) => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}/`
    const pokemonResponse = await fetch(pokemonUrl).then((res) => res.json())
    const pokeId = pokemonResponse.id

    const pokemonIconUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokeId}.png`

    return pokemonIconUrl
}