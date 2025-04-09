export const apiFast = "https://zzzbuilds-server.lat/";

export const authToken = {
  login: apiFast + "api/auth/signin",
  register: apiFast + "api/auth/signup",
  validator: apiFast + "api/auth/me",
};

export const recipeToken = {
  getId: apiFast + "api/recetas/",
};

export const recetasData = {
  getRecetas: apiFast + "api/recetas",
  crearRecetaConImagen: apiFast + "api/recetas",
  getImagen: apiFast + "imagen"
}

export const menuData = {
  getMenu: apiFast + "api/menus",
  crearMenu: apiFast + "api/menus",
  getListaMenu: apiFast + "api/menus/listaDeCompra",
};