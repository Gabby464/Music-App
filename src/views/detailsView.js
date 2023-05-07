import { html, until } from "../middlewares/lib.js";
import { getUser } from "../services/authService.js";
import { deleteRecord, getAlbumCard } from "../services/catalogService.js";

const detailsContent = (cardPromise) => html`
  <!--Details Page-->
  <section id="detailsPage">
    <div class="wrapper">${until(cardPromise, html`<p>Loading</p>`)}</div>
  </section>
`;
const detailsCard = (card, deleteAlbum, user) => html`
  <div class="albumCover">
    <img src="${card.imgUrl}" />
  </div>
  <div class="albumInfo">
    <div class="albumText">
      <h1>Name: ${card.name}</h1>
      <h3>Artist: ${card.artist}</h3>
      <h4>Genre:${card.genres}</h4>
      <h4>Price: ${card.price}</h4>
      <h4>Date: ${card.releaseDate}</h4>
      <p>Description: ${card.description}</p>
      ${user
        ? html` <!-- Only for registered user and creator of the album-->
            <div class="actionBtn">
              <a href="/details/${card._id}/edit" class="edit">Edit</a>
              <a @click=${deleteAlbum} href="javascript:void(0)" class="remove"
                >Delete
              </a>
            </div>`
        : html``}
    </div>
  </div>
`;

const getAlbum = async (id, deleteAlbum, user) => {
  const card = await getAlbumCard(id);
  let userId = true;
  if(user._id != card._ownerId){
    userId = false;
  }
  return detailsCard(card, deleteAlbum, userId);
};

export const detailsView = (ctx) => {
  const id = ctx.params.id;
  const deleteAlbum = async () => {
    await deleteRecord(id);
  };
  const user = getUser();


  ctx.render(detailsContent(getAlbum(id, deleteAlbum, user)));
};

