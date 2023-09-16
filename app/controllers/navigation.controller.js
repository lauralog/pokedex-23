import { pokedetailDiv, pokemonList, detailBattle, typesList } from "../constants/htmlElements"


export const changeToDetailView = () => {
    // esconder list
    pokemonList.style.display = "none"
    // typesList.style.display = "none"

    // mostrar detail
    // pokedetailDiv.style.display = ''
    // detailBattle.classList.remove('hidden')
    pokedetailDiv.classList.remove('hidden')
    pokedetailDiv.style.display = "flex"
}

export const changeToListView = () => {
    //esconder Detail
    pokedetailDiv.style.display = "none"
    detailBattle.classList.add('hidden')


    // mostrar div list
    pokemonList.style.display = ''
    typesList.style.display = ''
}
