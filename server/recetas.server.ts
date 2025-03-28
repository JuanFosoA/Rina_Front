import { recetasData } from "./token";

export interface Receta {
  id?: string;
  nombre: string;
  imagenNombre?: string;
  porciones?: number;
  tiempoPreparacion: number;
  ingredientes?: Ingrediente[];
  instrucciones?: Instruccion[];
  informacionNutricional?: InformacionNutricional;
  categorias?: string[];
}

export interface Ingrediente {
  nombre: string;
  cantidad: Cantidad;
}

export interface Instruccion {
  calorias: number;
  proteinas: string;
  carbohidratos: string;
  grasas: string;
}
export interface InformacionNutricional {
  paso: string;
  orden: number;
}

export interface Cantidad {
  valor: number;
  unidad: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export const getRecetas = async (
  token: string | null
): Promise<ApiResponse<Receta[]>> => {

  if (!token) {
    return {
      status: 401,
      error: 'No estás autenticado'
    };
  }
  try {
    const response = await fetch(recetasData.getRecetas, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        error: data.message || "Error al obtener recetas",
      };
    }

    return {
      status: response.status,
      data: data,
    };
  } catch (error) {
    console.error("Error en getRecetas:", error);
    return {
      status: 500,
      error: "Error de conexión",
    };
  }
};

export const crearRecetaConImagen = async (
  recetaData: Omit<Receta, "id">,
  imagenUri: string | null,
  token: string | null
): Promise<ApiResponse<Receta>> => {

  if (!token) {
    return {
      status: 401,
      error: 'No estás autenticado'
    };
  }

  const formData = new FormData();

  formData.append("receta", {
    string: JSON.stringify(recetaData),
    type: "application/json",
    name: "receta.json",
  } as any);

  if (imagenUri) {
    let filename = imagenUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename || '');
    let type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('imagen', {
      uri: imagenUri,
      name: filename || 'imagen.jpg',
      type
    } as any);
  }

  try {
    const response = await fetch(recetasData.crearRecetaConImagen, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        error: responseData.message || "Error al crear receta",
      };
    }

    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error("Error en crearRecetaConImagen:", error);
    return {
      status: 500,
      error: "Error de conexión",
    };
  }
};
