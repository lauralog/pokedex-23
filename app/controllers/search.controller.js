import { pokedetailDiv, pokemonList } from "../constants/htmlElements"
import { pokemonUrl } from "../constants/services"
import { renderPokedetail } from "./pokedetail.controller"
import { changeToDetailView } from "./navigation.controller"
import { setLoadingOn, setLoadingOff } from "../main"
import { offsetLimit } from "../constants/vars"


// ERROR: al buscar un pokemon inválido se queda pillado en la pantalla de loading

const form = document.querySelector("form")
const input = form.querySelector("input")
const pokemonError = document.querySelector(".pokemon_error")


/**
 * Enables search 
 */
export const searchPokemon = () => {

    form.addEventListener('submit', async(ev) => {
        ev.preventDefault()
        resetErrors()
        const inputValue = input.value
        const inputLength = inputValue.length 

        if (inputLength >= 1) {
            setLoadingOn()
            const fetchUrl = pokemonUrl + inputValue
            const pokemonResponse = await fetch(fetchUrl)

            await validateSearch(pokemonResponse)
        } else {
            renderError("Busca un Pokémon y atrápalos a todos!")
        }
        
        setLoadingOff()
        form.reset()
    })
}

const validateSearch = async (pokemonResponse) => {
    if (pokemonResponse.ok) {
        const pokemon = await pokemonResponse.json()
        renderPokedetail(pokemon)
        changeToDetailView()
    } else {
        renderError(`
            <h3>
                Introduce un nombre de Pokémon válido o un número entre 1 y ${offsetLimit}. 
            </h3>
            <br>
            <p>
                También puedes obtener una lsita de pokemons según la región pulsando los botones de
                la izquierda o según los tipos pulsando los botones de la izquierda.
            </p>
        `)
    }
}


export const resetErrors = () => {
    pokemonError.style.display = 'none'
    pokemonList.style.display = ''
    pokemonError.innerHTML = ""
}


const renderError = (errorMessage) => {

    const html = `
        <div class="error_message">${errorMessage}</div>
    `
    pokemonList.style.display = 'none'
    pokemonError.innerHTML = html
    pokemonError.style.display = 'flex'

    pokemonError.addEventListener('click', (ev) => {
        // pokemonError.style.display = 'none'
        // pokemonList.style.display = ''
        resetErrors()
    })
}

