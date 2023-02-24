let planetsArray = [];
const prevPlanetBtn = document.querySelector(".pagination-btn--prev");
const nextPlanetBtn = document.querySelector(".pagination-btn--next");
const url = "https://majazocom.github.io/Data/solaris.json";
const planetContainerEl = document.querySelector(".planet-container");
const searchInput = document.getElementById("search-input");
const searchResultEl = document.getElementById("search-result");


// hämtar data från api
async function getSolarSystem() {
    try {
        let resp = await fetch(url);
        let data = await resp.json();
        planetsArray = data;
    }
    catch (error) {
    }
};

getSolarSystem();

// tar datan från api och renderar ut element
function renderPlanet(id) {
    const planet = planetsArray.find(planet => planet.id === id);
    planetContainerEl.innerHTML = "";
    const text = document.createElement("section");
    planetContainerEl.className = 'planet-container';
    planetContainerEl.appendChild(text);
    let moonString = "";
    planet.moons.forEach(moon => {
        moonString += moon + ", "
    });

    planetContainerEl.innerHTML += `
<section class="planet-header">
    <article>
    <button class="pagination-btn--prev" onclick="renderPlanet(${id - 1})">Previous</button>
    </article>
    <article>
    <h1 class="h1-planet-title">${planet.name}</h1>
    </article>
    <article>
    <button class="pagination-btn--next" onclick="renderPlanet(${id + 1})">Next</button>
    </article>
</section>
<div class="planet-info-wrapper">
    <section class="planet-info">
        <p>${planet.desc}</p>
    </section>
    <section class="planet-info-grid">
        
        <article>
            <h4>Typ:</h4>
        </article>

        <article>
            <h4>Omkrets:</h4>
        </article>

        <article>
            <h4>Km sol:</h4>
        </article>

        <article>
            <h4>Dygn:</h4>
        </article>

        <article>
            <p>${planet.type}</p>
        </article>

        <article>
            <p>${planet.circumference} km</p>
        </article>
        
        <article>
            <p>${planet.distance} km</p>
        </article>
        
        <article>
            <p>${planet.rotation} jorddygn</p>
        </article>

        <article>
            <h4>Natt:</h4>
        </article>

        <article>
            <h4>Dag:</h4>
        </article>

        <article>
            <h4>Jorddygn:</h4>
        </article>

        <article>
        </article>

        <article>
            <p>${planet.temp.night} °C</p>
        </article>
        
        <article>
            <p>${planet.temp.day} °C</p>
        </article>
        
        <article>
            <p>${planet.orbitalPeriod} jorddygn</p>
        </article>

        <article>
        </article>

        
    </section>
    <section class="planet-moons">
        <article>
            <h4>Månar</h4>
            <p>${moonString}</p>
        </article>
    </section>
</div>
      `;
    planetContainerEl.appendChild(text);
    if (planet.id === 0) {
        document.querySelector(".pagination-btn--prev").style.display = "none";
    } else if (planet.id === planetsArray.length - 1) {
        document.querySelector(".pagination-btn--next").style.display = "none"
    }
}

// sökfunktion
function renderSearchResult(planetsArray) {
    searchResultEl.innerHTML = "";
    planetsArray.forEach(planet => {
        let searchHits = document.createElement("article");
        searchHits.className = 'search-result';
        searchHits.innerHTML = `<p onclick="renderPlanet(${planet.id});clearSearchResult()" class="search-result-text">Search result: ${planet.name}</p>`;
        searchHits.addEventListener("click", function () {
        });
        searchResultEl.appendChild(searchHits);
    });
};

// sökfunktion
searchInput.addEventListener('keyup', function () {
    let input = searchInput.value;
    let matches = [];
    planetsArray.forEach(planet => {
        if (planet.name.toLowerCase().includes(input.toLowerCase())) {
            matches.push(planet);
        }
    });
    if (matches.length > 0) {
        renderSearchResult(matches);
    } else {
        searchResultEl.innerHTML = `<p>Search Result: No results.</p>`
    }
});