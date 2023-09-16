import { pokemonList } from "../constants/htmlElements";
import { offsetLimit } from "../constants/vars";
import { setLoadingOff, setLoadingOn } from "../main";
import { changeToListView } from "./navigation.controller";
import { initCapsuleEvents, pokecapsuleHTML } from "./pokecapsule.controller";

export const typeFilterBtns = () => {
    const typeCapsules = document.querySelectorAll('.type_capsule')
    
    typeCapsules.forEach(typeCapsule => {
        typeCapsule.addEventListener('click', async(ev) => {
            ev.preventDefault()
            setLoadingOn()


            const type = typeCapsule.getAttribute('id')
            const typeUrlFull = `https://pokeapi.co/api/v2/type/${type}`

            const typeResponse = await fetch(typeUrlFull).then((res) => res.json())
            console.log(typeResponse.pokemon)
            const pokemons = typeResponse.pokemon

            let html = ''

            for (const pokemon of pokemons) {
                const detailUrl = pokemon.pokemon.url

                const detailResponse = await fetch(detailUrl).then(res => res.json())

                if (detailResponse.id <= offsetLimit) {
                    html += pokecapsuleHTML(detailResponse, detailResponse.id)
                } else {
                    html += ''
                }
            }
            pokemonList.innerHTML = html
            setLoadingOff()
            initCapsuleEvents()

            changeToListView()
        });
    });
}




