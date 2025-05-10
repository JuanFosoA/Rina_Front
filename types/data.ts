import { Menu } from "../modules/menuDetail.tsx/types";
import { Receta } from "../server/recetas.server";

export type LocalReceta = {
  id: string;
  json: Receta;
};

export type LocalMenu = {
  id: string;
  json: Menu;
};
