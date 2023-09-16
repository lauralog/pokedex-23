import { detailBattle } from "../constants/htmlElements";
import { getPokemonGIFIconURL, pokemonUrl } from "../constants/services";
import { offsetLimit } from "../constants/vars";


export const renderBattle = async() => {
    let html = ''

    html += `
        <div class="battle_btn btn btn-accent">Comparar con pokemon aleatorio</div>
    `
    detailBattle.innerHTML = html

    const battleBtn = document.querySelector('.battle_btn')
    battleBtn.addEventListener('click', (ev) => {
        const randomPokemon = getRandomNumber()
        console.log(randomPokemon);
        const html2 = renderRandom(randomPokemon) // returns html
        detailBattle.innerHTML += html2

        // battleChart(pokemon, random)
    })
}

const renderRandom = (randomPokemon) => {
    const html = `
        <div class="pokemon_stats">
            <div class="poke_stats">
                <canvas class="bg-secondary" id="battleChart"></canvas>
            </div>
        </div>
        <div class="battle_against">
            ${initBattle(randomPokemon)}
        </div>
    `
    console.log(html);
    return html
}

export const resetBattle = () => {
    detailBattle.innerHTML = `<div class="battle_btn btn btn-accent">Comparar con pokemon aleatorio</div>`
}

// renderBattleChart // PASS


/**
 * Generates random number 
 * @returns {Number} random from 1 to 494
 */
const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * offsetLimit) + 1;
    return randomNumber
}


/**
 * Battle
 * @param {Number} randomPokemon 
 */
const initBattle = async(randomPokemon) => {
    // const randomPokemon = getRandomNumber()
    const randomPokemonResponse = await fetch(pokemonUrl + randomPokemon).then((res) => res.json())
    const pokemon = randomPokemonResponse

    const randomCapsuleHTML = `
        <div class="random_pokemon">
            <li class="pokecapsule" capsule-id="${pokemon.id}">
                <div class="pokecapsule_pic">
                    <img src="${getPokemonGIFIconURL(pokemon)}" alt="sprite">
                </div>
                <div class="capsule_data">
                    <div class="capsule_data">
                        <h3 class="data_id">${pokemon.id}</h3>
                        <h4 class="data_name">${pokemon.name.toUpperCase()}</h4>
                    </div>
                </div>
            </li>
        </div>
    `
    const container = document.querySelector('.battle_against')
    container.innerHTML = randomCapsuleHTML
    // return randomCapsuleHTML
}


