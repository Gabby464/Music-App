import { html, until } from "../middlewares/lib.js";
import { editRecord, getAlbumCard } from "../services/catalogService.js";

const editTemplate = (albumPromise) => html `
           <section class="editPage">
            <form>
                <fieldset>
                    <legend>Edit Album</legend>
                ${until(albumPromise, html`<p>Loading</p>`)}
                </fieldset>
            </form>
        </section>

`
const editCard = (album, onSubmit) => html`
                    <div class="container">
                     <form @submit = ${onSubmit}>
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value="${album.name}">

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${album.imgUrl}">

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" value="${album.price}">

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${album.releaseDate}">

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" value="${album.artist}">

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" value="${album.genre}">

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${album.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                        </form>
                    </div>
`

export const editView = (ctx) => {
    const id = ctx.params.id
    const onSubmit = async(e) => {
        e.preventDefault();
        const edited = Object.fromEntries(new FormData(e.currentTarget));
        if (Object.values(edited).some((value) => !value)) {
            alert("Please fill out all fields.");
        }else{
            await editRecord(id, edited)

        }
    }
    ctx.render(editTemplate(loadAlbum(id, onSubmit)))
}

const loadAlbum = async (id, onSubmit) => {
    const card = await getAlbumCard(id);
    return editCard(card, onSubmit);
}

