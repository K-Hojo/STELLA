const ROOT_URL = "http://localhost:8000/";

export const CollectionUrls = {
  SEARCH: `${ROOT_URL}api/collection/search/`,
  COLLECTION: `${ROOT_URL}api/collection/collection/`,
  COL_LIST: `${ROOT_URL}api/collection/collection/`,
  COL_ITEM: `${ROOT_URL}api/collection/collection/:col_key`,
  DET_LIST: `${ROOT_URL}api/collection/collection/:col_key/books`,
  DET_ITEM: `${ROOT_URL}api/collection/collection/:col_key/books/:det_key`,
}