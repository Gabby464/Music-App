import { html, until } from "../middlewares/lib.js";
import { getUser } from "../services/authService.js";
import { searchAlbum } from "../services/catalogService.js";
import { albumCard } from "./catalogView.js";

export const searchTemplate = (onSearch, result) => html`
  <section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired albums's name"
      />
      <button class="button-list" @click=${onSearch}>Search</button>
    </div>

    <h2>Results:</h2>
    <div id="search-results">
      ${until(result, html`<p>Loading</p>`)}
    </div>
  </section>
`;

const noResult = () => html`
    <p class="no-result">No result.</p>

`;

export const searchView = (ctx) => {
  const onSearch = async () => {
    const userInput = document.getElementById('search-input').value;
    const user = getUser()
    const result = await searchAlbum(userInput);
    if (result.length < 1) {
        ctx.render(searchTemplate(onSearch, noResult()))
    } else {
      const albums = result.map((album) => albumCard(album, user));
      ctx.render(searchTemplate(onSearch, albums))
    }
  }
  ctx.render(searchTemplate(onSearch, []))
 
};
