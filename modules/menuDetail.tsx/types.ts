export interface Cantidad {
  valor: number;
  unidad: string;
}

export interface IngredienteCompra {
  nombre: string;
  cantidad: Cantidad;
}

export interface Receta {
  id: string;
  nombre: string;
  imagenNombre: string | null;
  categorias: string[];
  porciones: number;
  tiempoPreparacion: number;
  informacionNutricional: {
    calorias: number;
    carbohidratos: string;
    grasas: string;
    proteinas: string;
  };
  ingredientes: {
    nombre: string;
    cantidad: Cantidad;
  }[];
  instrucciones: {
    orden: number;
    paso: string;
  }[];
}

export interface Menu {
  [dia: string]: {
    [comida: string]: string;
  };
}

