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
  paso: string;
  orden: number;
}

export interface InformacionNutricional {
  calorias: number;
  proteinas: string;
  carbohidratos: string;
  grasas: string;
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

const unauthorizedResponse = <T>(): ApiResponse<T> => ({
  status: 401,
  error: "No estás autenticado",
});

const serverErrorResponse = <T>(error: unknown): ApiResponse<T> => ({
  status: 500,
  error: error instanceof Error ? error.message : "Error de conexión",
});

const safeFetch = async (input: RequestInfo, init?: RequestInit) => {
  try {
    const response = await fetch(input, init);
    const text = await response.text();

    if (!text.trim()) {
      return { ok: false, response, error: "Respuesta vacía del servidor" };
    }

    try {
      const data = JSON.parse(text);
      return { ok: response.ok, response, data, error: null };
    } catch (parseError) {
      console.error("Error parseando JSON:", parseError);
      return { ok: false, response, error: "Formato de respuesta inválido" };
    }
  } catch (error) {
    console.error("Error en safeFetch:", error);
    return {
      ok: false,
      response: null,
      error: error instanceof Error ? error.message : "Error de conexión",
    };
  }
};

export const getRecetas = async (
  token: string | null
): Promise<ApiResponse<Receta[]>> => {
  if (!token) return unauthorizedResponse();

  const { ok, response, data, error } = await safeFetch(
    recetasData.getRecetas,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!ok) {
    return {
      status: response?.status || 500,
      error: error || "Error desconocido",
    };
  }

  return {
    status: response!.status,
    data: Array.isArray(data) ? data : [],
  };
};

export const crearRecetaConImagen = async (
  recetaData: Omit<Receta, "id">,
  imagenUri: string | null,
  token: string | null
): Promise<ApiResponse<Receta>> => {
  if (!token) return unauthorizedResponse();

  const formData = new FormData();
  formData.append("receta", {
    string: JSON.stringify(recetaData),
    type: "application/json",
    name: "receta.json",
  } as any);

  if (imagenUri) {
    const filename = imagenUri.split("/").pop() || "imagen.jpg";
    const extension = /\.(\w+)$/.exec(filename)?.[1] || "jpeg";
    const type = `image/${extension}`;

    formData.append("imagen", {
      uri: imagenUri,
      name: filename,
      type,
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

    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        error: data?.message || "Error al crear receta",
      };
    }

    return {
      status: response.status,
      data,
    };
  } catch (error) {
    return serverErrorResponse(error);
  }
};

export const getRecetaById = async (
  id: string,
  token: string | null
): Promise<ApiResponse<Receta>> => {
  if (!token) return unauthorizedResponse();

  const { ok, response, data, error } = await safeFetch(
    `${apiFast}api/recetas/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!ok) {
    return {
      status: response?.status || 500,
      error: error || "Error desconocido",
    };
  }

  const recetaProcesada = {
    ...data,
    imagenUrl: data.imagenNombre
      ? `${apiFast}uploads/${data.imagenNombre}`
      : null,
  };

  return {
    status: response!.status,
    data: recetaProcesada,
  };
};
