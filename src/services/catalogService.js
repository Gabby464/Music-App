import * as api from "../services/requester.js";
import {page} from '../middlewares/lib.js';
const endpoints = {
  base: "http://localhost:3030",
  allAlbums: "/data/albums?sortBy=_createdOn%20desc&distinct=name",
  createAlbum: "/data/albums",
  getAlbum: (id) => `/data/albums/${id}`,
  search: (query) => `/data/albums?where=name%20LIKE%20%22$${query}%22`,
};
export const loadAll = async () => {
    const albums = await api.get(endpoints.base + endpoints.allAlbums)
    return albums
};

export const createNew = async (data) => {
    const newAlbum = await api.post(endpoints.base + endpoints.createAlbum, data);
    return newAlbum
}

export const getAlbumCard = async (id) => {
  const card = await api.get(endpoints.base + endpoints.getAlbum(id));
  console.log(card);
  return card
}
export const deleteRecord = async (id) => {
  const deleted = await api.delete(endpoints.base + endpoints.getAlbum(id));
  page.redirect('/catalog')
}

export const editRecord = async(id, data)=>{
  const edited = await api.put(endpoints.base + endpoints.getAlbum(id), data);
  page.redirect(`/albums/${id}`)
}
export const searchAlbum = async (albumName) =>{
  const query = encodeURIComponent(`name LIKE "${albumName}"`)
  console.log(query)
  const result = await api.get(`${endpoints.base}/data/albums?where=${query}`);
  return result;
}