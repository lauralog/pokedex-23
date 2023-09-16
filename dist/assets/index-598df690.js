(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const h=document.querySelector(".pokedetail"),R=document.querySelector(".header_logo"),v=document.querySelector(".pokemon_list"),k=document.querySelector(".battle_sim"),q=document.querySelector(".types_container"),U=document.querySelectorAll(".region");document.getElementById("btn-kanto");document.getElementById("btn-johto");document.getElementById("btn-hoenn");document.getElementById("btn-sinnoh");const $=document.querySelector(".loading"),y="https://pokeapi.co/api/v2/pokemon/",P="https://pokeapi.co/api/v2/ability/",B="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",j="https://pokeapi.co/api/v2/pokemon/?offset=151&limit=100",C="https://pokeapi.co/api/v2/pokemon/?offset=251&limit=135",x="https://pokeapi.co/api/v2/pokemon/?offset=386&limit=108",E=e=>{const t="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/",n=e.id,a=".gif";return t+n+a},M=e=>`
        <span class="type_icon bg-${e}">
            <img src="/assets/images/type-icons/${e}.svg" alt="${e}-icon">
        </span>
        <span class="type_text">
            <h4>${e}</h4>
        </span>
    `,H=()=>{v.style.display="none",h.classList.remove("hidden"),h.style.display="flex"},_=()=>{h.style.display="none",k.classList.add("hidden"),v.style.display="",q.style.display=""},D=async e=>{const t=await z(e);let n="";if(t.length<=1)n+="Este pokemon no tiene evoluciones";else{let s=0;for(const o of t){const i=o.min_level;n+=`
                ${O(s,i)}
                <div class="pokemon_evolution" position=${s} pokemon="${e.name}">
                    <span class="evolution_name badge">${o.name}</span>
                    <span class="evolution_pic">
                        <img src="${await N(o.name)}" alt="evolIcon">
                    </span>
                </div>
            `,s++}}const a=document.querySelector(".pokedetail_evolutions");a.innerHTML=n},O=(e,t)=>{let n="";return e>0&&(n+=`
            <div class="evolution_divider">
                <span class="level">${t?"lvl."+t:"método especial"}</span>
                <span class="arrow"> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="3-Arrow Right"/>
                    </svg>
                </span>
            </div>
        `),n},z=async e=>{const t=e.species.url,a=(await fetch(t).then(l=>l.json())).evolution_chain.url,s=await fetch(a).then(l=>l.json());let o=[],i=s.chain;do{let l=i.evolves_to.length,c=i.evolution_details[0];if(o.push({name:i.species.name,url:i.species.url,min_level:c?c.min_level:1}),l>1)for(let r=1;r<l;r++)o.push({name:i.evolves_to[r].species.name,url:i.evolves_to[r].species.url,min_level:c?c.min_level:1});i=i.evolves_to[0]}while(i&&i.hasOwnProperty("evolves_to"));return o},N=async e=>{const t=`https://pokeapi.co/api/v2/pokemon/${e}/`;return`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${(await fetch(t).then(o=>o.json())).id}.png`},b=e=>{p();const t=`
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
            
                <div class="poke_id">${e.id}</div>
                <div class="poke_name">${e.name}</div>

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
                <img src="${e.sprites.other["official-artwork"].front_default}" alt="pokemonGIF">
            </div>
        </div>

        <div class="poke_types">
            ${e.types.reduce((n,a)=>{let s="";return s+=`
                    <div class="type_capsule">
                        ${M(a.type.name)}
                    </div>
                `,n+s},"")}

        </div>

        <span class="divider"></span>

        <div class="pokedetail_evolutions">
            <!-- evolutionChainHTML(pokemon) -->
        </div>

        <span class="divider"></span>

        <div class="pokedetail_data">
            <div class="poke_data_container">

                <div class="poke_abilities"> 
                    ${e.abilities.reduce((n,a,s=0)=>{let o="",i=s++;return o+=`
                            <div class="ability" id="${"ability_"+i}">
                                <div class="ability_name">
                                    <span>${a.ability.name}</span>
                                    <span>+</span>
                                </div>
                                <div class="ability_description hidden"></div>
                            </div>

                        `,n+o},"")}               
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
    `;return h.innerHTML=t,F(e),D(e),V(),K(e),m(),e},F=e=>{const t=document.getElementById("detailChart").getContext("2d"),n=e.stats.map(o=>o.stat.name),a=e.stats.map(o=>o.base_stat),s=new Chart(t,{type:"polarArea",data:{labels:n,datasets:[{label:"Base stats",data:a,backgroundColor:["rgba(0, 97, 114, .3)","rgba(10, 147, 150, .3)","rgba(148, 210, 189, .3)","rgba(238, 155, 0, .3)","rgba(202, 103, 2, .3)","rgba(187, 62, 3, .3)"],borderColor:"rgba(75, 192, 192, 1)",borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,legend:{position:"top"},scales:{r:{max:255,beginAtZero:!0}}}});t.innerHTML=s},K=e=>{document.querySelectorAll(".pokedetail_header_arrow").forEach(n=>{n.addEventListener("click",async a=>{p();const s=n.getAttribute("id");let o="";s.includes("left")?o=e.id-1:o=e.id+1;const i=y+o,l=await fetch(i).then(c=>c.json());b(l),m()})})},V=async()=>{document.querySelectorAll(".ability").forEach(t=>{const n=t.lastElementChild;t.addEventListener("click",async a=>{await G(t),n.classList.contains("hidden")?(n.classList.remove("hidden"),n.style.display=""):(n.style.display="none",n.classList.add("hidden"))})})},G=async e=>{const t=e.children[0],n=e.children[1],a=t.firstElementChild.innerHTML,s=P+a,i=(await fetch(s).then(l=>l.json())).effect_entries[1].short_effect;n.innerHTML=i},d=async(e=C)=>{p();const n=(await fetch(e).then(i=>i.json())).results;let a="",s=1;for(const i of n){const l=i.url,c=await fetch(l).then(r=>r.json());a+=T(c,s),s++}const o=document.querySelector(".pokemon_list");o.innerHTML=a,A(),m()},T=(e,t)=>`
        <li class="pokecapsule" capsule-id="${e.id}">
            <div class="pokecapsule_pic">
                <img src="${E(e)}" alt="sprite">
            </div>

            <div class="pokecapsule_content">
                <div class="capsule_data">
                    <h3 class="data_id">${t}</h3>
                    <h4 class="data_name">${e.name.toUpperCase()}</h4>
                </div>
                <div class="capsule_types">
                    ${e.types.reduce((a,s)=>{let o="";return o+=`
                            <span class="type_capsule">
                                ${M(s.type.name)}
                            </span>
                        `,a+o},"")}

                </div>
            </div>
        </li>
    `,A=()=>{document.querySelectorAll(".pokecapsule").forEach(t=>{t.addEventListener("click",async n=>{const a=t.getAttribute("capsule-id"),s=y+a,o=await fetch(s).then(i=>i.json());b(o),H()})})},L=494,g=document.querySelector("form"),J=g.querySelector("input"),u=document.querySelector(".pokemon_error"),W=()=>{g.addEventListener("submit",async e=>{e.preventDefault(),w();const t=J.value;if(t.length>=1){p();const a=y+t,s=await fetch(a);await Z(s)}else S("Busca un Pokémon y atrápalos a todos!");m(),g.reset()})},Z=async e=>{if(e.ok){const t=await e.json();b(t),H()}else S(`
            <h3>
                Introduce un nombre de Pokémon válido o un número entre 1 y ${L}. 
            </h3>
            <br>
            <p>
                También puedes obtener una lsita de pokemons según la región pulsando los botones de
                la izquierda o según los tipos pulsando los botones de la izquierda.
            </p>
        `)},w=()=>{u.style.display="none",v.style.display="",u.innerHTML=""},S=e=>{const t=`
        <div class="error_message">${e}</div>
    `;v.style.display="none",u.innerHTML=t,u.style.display="flex",u.addEventListener("click",n=>{w()})},Q=()=>{U.forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault(),w(),p(),e.innerHTML.includes("Kanto")&&d(B),e.innerHTML.includes("Johto")&&d(j),e.innerHTML.includes("Hoenn")&&d(C),e.innerHTML.includes("Sinnoh")&&d(x),_()}),m()})},X=()=>{document.querySelectorAll(".type_capsule").forEach(t=>{t.addEventListener("click",async n=>{n.preventDefault(),p();const s=`https://pokeapi.co/api/v2/type/${t.getAttribute("id")}`,o=await fetch(s).then(c=>c.json());console.log(o.pokemon);const i=o.pokemon;let l="";for(const c of i){const r=c.pokemon.url,f=await fetch(r).then(I=>I.json());f.id<=L?l+=T(f,f.id):l+=""}v.innerHTML=l,m(),A(),_()})})},Y=async()=>{let e="";e+=`
        <div class="battle_btn btn btn-accent">Comparar con pokemon aleatorio</div>
    `,k.innerHTML=e,document.querySelector(".battle_btn").addEventListener("click",n=>{const a=te();console.log(a);const s=ee(a);k.innerHTML+=s})},ee=e=>{const t=`
        <div class="pokemon_stats">
            <div class="poke_stats">
                <canvas class="bg-secondary" id="battleChart"></canvas>
            </div>
        </div>
        <div class="battle_against">
            ${se(e)}
        </div>
    `;return console.log(t),t},te=()=>Math.floor(Math.random()*L)+1,se=async e=>{const n=await fetch(y+e).then(o=>o.json()),a=`
        <div class="random_pokemon">
            <li class="pokecapsule" capsule-id="${n.id}">
                <div class="pokecapsule_pic">
                    <img src="${E(n)}" alt="sprite">
                </div>
                <div class="capsule_data">
                    <div class="capsule_data">
                        <h3 class="data_id">${n.id}</h3>
                        <h4 class="data_name">${n.name.toUpperCase()}</h4>
                    </div>
                </div>
            </li>
        </div>
    `,s=document.querySelector(".battle_against");s.innerHTML=a};window.addEventListener("load",e=>{d(),Y(),X(),Q(),W(),oe()});const oe=()=>{R.addEventListener("click",e=>{_(),d()})},p=()=>{$.classList.add("opened")},m=()=>{$.classList.remove("opened");const e=document.querySelector(".main_center");e.scrollTop=0};
