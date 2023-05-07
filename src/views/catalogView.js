import { html, until } from "../middlewares/lib.js";
import { getUser } from "../services/authService.js";
import { loadAll } from "../services/catalogService.js";

const catalogTemplate = (albumPromise) => html`
  <section id="catalogPage">
    <h1>All Albums</h1>
    ${until(albumPromise, html`<p>Loading<p>`)}
  </section>
`;

const noAlbums = () => html` <!--No albums in catalog-->
  <p>No Albums in Catalog!</p>`;

export const albumCard = (album, user) => html` 
<div class="card-box">
  <img src="${album.imgUrl}" />
  <div>
    <div class="text-center">
      <p class="name">Name: ${album.name}</p>
      <p class="artist">Artist: ${album.artist}</p>
      <p class="genre">Genre: ${album.genre}</p>
      <p class="price">Price: ${album.price}</p>
      <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    ${user
      ? html`<div class="btn-group">
          <a href="/albums/${album._id}" id="details">Details</a>
        </div>`
      : html``}
  </div>
</div>`;

const getAlbumCards = async () => {
    const albums = await loadAll();
    const user = await getUser();
    if (albums.length < 1) {
      return noAlbums();
    } else {
       return albums.map((album) => albumCard(album, user))    
    }
  };
  

export const catalogView = (ctx) => {
  ctx.render(catalogTemplate(getAlbumCards()));
};

