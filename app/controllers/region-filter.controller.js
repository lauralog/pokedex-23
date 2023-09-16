import { regionBtns } from "../constants/htmlElements";
import { offsetHoenn, offsetJohto, offsetKanto, offsetSinnoh } from "../constants/services";
import { setLoadingOn, setLoadingOff } from "../main";
import { changeToListView } from "./navigation.controller";
import { renderPokeCapsules } from "./pokecapsule.controller";
import { resetErrors } from "./search.controller";

export const regionFilterBtns = () => {

    regionBtns.forEach(regionBtn => {

        regionBtn.addEventListener('click', async(ev) => {
            ev.preventDefault()
            resetErrors()
            setLoadingOn()

            if (regionBtn.innerHTML.includes('Kanto')) {
                renderPokeCapsules(offsetKanto);    
            }
            if (regionBtn.innerHTML.includes('Johto')) {
                renderPokeCapsules(offsetJohto);  
            }
            if (regionBtn.innerHTML.includes('Hoenn')) {
                renderPokeCapsules(offsetHoenn);    
            }
            if (regionBtn.innerHTML.includes('Sinnoh')) {
                renderPokeCapsules(offsetSinnoh);  
            }
            changeToListView()
        });
        setLoadingOff()

    });
}

