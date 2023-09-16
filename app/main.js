// style
import "./../assets/styles/style.sass";

import { headerLogo, loadingContainer } from "./constants/htmlElements";
import { renderPokeCapsules } from "./controllers/pokecapsule.controller";
import { searchPokemon } from "./controllers/search.controller";
import { changeToListView } from "./controllers/navigation.controller";
import { regionFilterBtns } from "./controllers/region-filter.controller";
import { typeFilterBtns } from "./controllers/types-filter.controller";
import { renderBattle } from "./controllers/battle-sim.controller";

window.addEventListener('load', (ev) => {
    renderPokeCapsules()

    renderBattle()

    typeFilterBtns()
    regionFilterBtns()
    searchPokemon() 
    reloadPage()
})

/**
 * se puede quitar?????
 */
export const reloadPage = () => {
    headerLogo.addEventListener('click', (ev) => {

        changeToListView()
        renderPokeCapsules()
    })
}

/**--------------------------------------------------------
 * UT FNs
 * --------------------------------------------------------
*/

/**
 * displays loading screen
 */
export const setLoadingOn = () => {
    loadingContainer.classList.add('opened')
}

/**
 * hides loading screen
 */
export const setLoadingOff = () => {
    loadingContainer.classList.remove('opened')
    const main = document.querySelector('.main_center')
    main.scrollTop = 0
}

export const resetBattle = () => {
    detailBattle.innerHTML = ''
}