import { apiFast, recetasData } from "./token";

export interface Receta {
  id: string;
  nombre: string;
  imagenNombre?: string | null;
  porciones: number;
  tiempoPreparacion: number;
  ingredientes: Ingrediente[];
  instrucciones: Instruccion[];
  informacionNutricional: InformacionNutricional;
  categorias: string[];
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

interface ApiResponse<T> {
  status: number;
  data?: T;
  error?: string;
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

    const responseText = await response.text();
    if (!responseText) {
      return {
        status: response.status,
        error: "La respuesta del servidor está vacía",
      };
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Error parseando JSON:", parseError);
      return {
        status: response.status,
        error: "Formato de respuesta inválido",
      };
    }

    if (!response.ok) {
      return {
        status: response.status,
        error: data.message || `Error ${response.status}: ${response.statusText}`,
      };
    }

    return {
      status: response.status,
      data: Array.isArray(data) ? data : [], 
    };
  } catch (error) {
    console.error("Error en getRecetas:", error);
    return {
      status: 500,
      error: error instanceof Error ? error.message : "Error de conexión",
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


export const getRecetaById = async (
  id: string,
  token: string | null
): Promise<ApiResponse<Receta>> => {
  if (!token) {
    return {
      status: 401,
      error: 'No estás autenticado'
    };
  }

  try {
    const response = await fetch(`${apiFast}api/recetas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const responseText = await response.text();
    if (!responseText.trim()) {
      return {
        status: response.status,
        error: response.status === 404 ? 'Receta no encontrada' : 'Respuesta vacía del servidor',
      };
    }

    const data = JSON.parse(responseText);

    if (!response.ok) {
      return {
        status: response.status,
        error: data.message || `Error ${response.status}`,
      };
    }

    const recetaProcesada = {
      ...data,
      imagenUrl: data.imagenNombre 
        ? `${apiFast}uploads/${data.imagenNombre}`
        : null
    };

    return {
      status: response.status,
      data: recetaProcesada,
    };
  } catch (error) {
    console.error('Error en getRecetaById:', error);
    return {
      status: 500,
      error: error instanceof Error ? error.message : 'Error de conexión',
    };
  }
};