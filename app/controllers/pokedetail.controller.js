import { pokedetailDiv } from "../constants/htmlElements"
import { abilitiesUrl, pokemonUrl } from "../constants/services"
import { evolutionChainHTML } from "./evolutions.controller"
import { renderTypeCapsule } from "../models/type-capsule"
import { setLoadingOff, setLoadingOn } from "../main"
// import { resetBattle } from "./battle-sim.controller"

/**
 * const pokemonResponse = pokemonUrl + pokemon id or name
 * Fetch -> capsule and search controllers
 * @param {Object} pokemon 
 */
export const renderPokedetail = (pokemon) => {
    setLoadingOn()

    const pokedetailHTML = `
        <div class="pokedetail_header">

            <div class="pokedetail_header_arrow" id="left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g data-name="Circle Left">
                        <path d="M17 11H9.414l1.293-1.293a1 1 0 0 0-1.414-1.414l-3 3a1 1 0 0 0 0 1.414l3 3a1 1 0 0 0 1.414-1.414L9.414 13H17a1 1 0 0 0 0-2z"/>
                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                    </g>
                </svg>
            </div>

            <div class="pokedetail_title">
            
                <div class="poke_id">${pokemon.id}</div>
                <div class="poke_name">${pokemon.name}</div>

            </div>

            <div class="pokedetail_header_arrow" id="right">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g data-name="Circle Right">
                        <path d="m17.706 11.292-3-3a1 1 0 0 0-1.414 1.414L14.586 11H7a1 1 0 0 0 0 2h7.586l-1.293 1.293a1 1 0 1 0 1.414 1.414l3-3a1 1 0 0 0-.001-1.415z"/>
                        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z"/>
                    </g>
                </svg>
            </div>

        </div>

        <div class="pokedetail_image">
            <div class="poke_img">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemonGIF">
            </div>
        </div>

        <div class="poke_types">
            ${pokemon.types.reduce((acc, type) => {
                let html = ''
                html += `
                    <div class="type_capsule">
                        ${renderTypeCapsule(type.type.name)}
                    </div>
                `
                return acc + html
            }, '')}

        </div>

        <span class="divider"></span>

        <div class="pokedetail_evolutions">
            <!-- evolutionChainHTML(pokemon) -->
        </div>

        <span class="divider"></span>

        <div class="pokedetail_data">
            <div class="poke_data_container">

                <div class="poke_abilities"> 
                    ${pokemon.abilities.reduce((acc, ability, ability_id = 0) => {
                        let html = ''
                        let id_counter = ability_id++

                        html += `
                            <div class="ability" id="${'ability_' + id_counter}">
                                <div class="ability_name">
                                    <span>${ability.ability.name}</span>
                                    <span>+</span>
                                </div>
                                <div class="ability_description hidden"></div>
                            </div>

                        `
                        return acc + html 
                    }, '')}               
                </div>
            </div>
        </div>

        <span class="divider"></span>

        <div class="pokedetail_row03">
            <div class="poke_stats" style="height:250px">
                <canvas id="detailChart" class="detail_chart">
                    <!-- pokemonChart(pokemon) -->
                </canvas>
            </div>
        </div>
    `
        
    pokedetailDiv.innerHTML = pokedetailHTML

    pokemonChart(pokemon)
    evolutionChainHTML(pokemon)
    initAbilitiesEv() 

    initArrowsEvent(pokemon)
    setLoadingOff()
    return pokemon
} 

/**
 * Renders chart showing pokemon stats
 * @param {Object} pokemon 
 */
export const pokemonChart = (pokemon) => {
    const chartCanva = document.getElementById('detailChart').getContext('2d');
    const statsLabels = pokemon.stats.map(stat => stat.stat.name);
    const statsData = pokemon.stats.map(stat => stat.base_stat);

    const myChart = new Chart(chartCanva, {
        type: 'polarArea',
        data: {
            labels: statsLabels,
            datasets: [{
                label: 'Base stats',
                data: statsData,
                backgroundColor: [      
                    'rgba(0, 97, 114, .3)',
                    'rgba(10, 147, 150, .3)',
                    'rgba(148, 210, 189, .3)',
                    'rgba(238, 155, 0, .3)',
                    'rgba(202, 103, 2, .3)',
                    'rgba(187, 62, 3, .3)'],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'top'
            },
            scales: {
                r: {
                    max: 255, // max value 255
                    beginAtZero: true,
                },
            },
        }
    });
    // labels: pokemon.stats.map(stat => stat.label)
    // data: pokemon.stats.map(stat => stat.value)
    chartCanva.innerHTML = myChart
}

/**
 * Enables detail view nav
 * arrowLeft renders previous pokemon
 * arrowRight renders next pokemon
 * @param {Object} pokemon 
 */
const initArrowsEvent = (pokemon) => {
    const arrows = document.querySelectorAll('.pokedetail_header_arrow')

    arrows.forEach(arrow => {
        arrow.addEventListener('click', async (ev) => {
            setLoadingOn()
            const arrowId = arrow.getAttribute('id')
            let pokemonArrowId = ''

            if (arrowId.includes('left')) {
                pokemonArrowId = pokemon.id - 1
            } else {
                pokemonArrowId = pokemon.id + 1
            }
            const pokemonArrowUrl = pokemonUrl + pokemonArrowId
            const pokemonArrow = await fetch(pokemonArrowUrl).then(res => res.json())
            renderPokedetail(pokemonArrow)
            setLoadingOff()
        })
    });
}

/**
 * Renders pokemon abilities
 * Toggle abilities description
 */
const initAbilitiesEv = async() => {
    const abilityContainers = document.querySelectorAll(".ability")

    abilityContainers.forEach(abilityContainer => {
        const abilityDesc = abilityContainer.lastElementChild
        
        abilityContainer.addEventListener('click', async (ev) => {

            await getAbilityDescription(abilityContainer)

            if (abilityDesc.classList.contains('hidden')) {
                abilityDesc.classList.remove('hidden')
                abilityDesc.style.display = ''

            } else {
                abilityDesc.style.display = 'none'
                abilityDesc.classList.add('hidden')
            }
        })
    })
}

/**
 * Gets ability description
 * @param {HTMLElement} abilityContainer 
 */
const  getAbilityDescription = async (abilityContainer) => {
    const abilityNameContainer = abilityContainer.children[0]
    const abilityDescriptionContainer = abilityContainer.children[1]

    const abilityName = abilityNameContainer.firstElementChild.innerHTML
    const fetchUrl = abilitiesUrl + abilityName

    const abilityResponse = await fetch(fetchUrl).then((res) => res.json())
    const abilityDescription = abilityResponse.effect_entries[1].short_effect

    abilityDescriptionContainer.innerHTML = abilityDescription
}

