import {
  offsetHoenn,
  pokemonUrl,
  getPokemonIconURL,
  getPokemonGIFIconURL,
} from "../constants/services";
import { setLoadingOff, setLoadingOn } from "../main";
import { renderTypeCapsule } from "../models/type-capsule";
import { changeToDetailView } from "./navigation.controller";
import { renderPokedetail } from "./pokedetail.controller";

export const renderPokeCapsules = async (pokemonlist = offsetHoenn) => {
  setLoadingOn();

  const pokemonResponse = await fetch(pokemonlist).then((res) => res.json());
  const pokemons = pokemonResponse.results;

  let html = "";
  let local_index = 1;
  // console.log(pokemons);
  for (const pokemon of pokemons) {
    const detailUrl = pokemon.url;
    const detailResponse = await fetch(detailUrl).then((res) => res.json());

    html += pokecapsuleHTML(detailResponse, local_index);
    local_index++;
  }

  const pokemonList = document.querySelector(".pokemon_list");
  pokemonList.innerHTML = html;

  initCapsuleEvents();
  setLoadingOff();
};

/**
 *
 * @param {object} pokemon object -> pokemon detail url
 * @returns {HTMLElement} pokemon capsule HTML
 */
export const pokecapsuleHTML = (pokemon, local_index) => {
  const pokecapsuleModel = `
        <li class="pokecapsule" capsule-id="${pokemon.id}">
            <div class="pokecapsule_pic">
                <img src="${
                  getPokemonGIFIconURL(
                    pokemon
                  ) /*pokemon.sprites.front_default*/
                }" alt="sprite">
            </div>

            <div class="pokecapsule_content">
                <div class="capsule_data">
                    <h3 class="data_id">${local_index}</h3>
                    <h4 class="data_name">${pokemon.name.toUpperCase()}</h4>
                </div>
                <div class="capsule_types">
                    ${pokemon.types.reduce((acc, type) => {
                      let html = "";
                      html += `
                            <span class="type_capsule">
                                ${renderTypeCapsule(type.type.name)}
                            </span>
                        `;
                      return acc + html;
                    }, "")}

                </div>
            </div>
        </li>
    `;
  return pokecapsuleModel;
};

export const initCapsuleEvents = () => {
  const pokecapsules = document.querySelectorAll(".pokecapsule");

  pokecapsules.forEach((pokecapsule) => {
    pokecapsule.addEventListener("click", async (ev) => {
      const pokemonId = pokecapsule.getAttribute("capsule-id");
      const pokemonFetch = pokemonUrl + pokemonId;
      const pokemon = await fetch(pokemonFetch).then((res) => res.json());

      renderPokedetail(pokemon);
      changeToDetailView();
    });
  });
};
