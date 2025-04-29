import { apiFast, menuData } from "./token";


interface Cantidad {
  valor: number;
  unidad: string;
}

interface IngredienteCompra {
  nombre: string;
  cantidad: Cantidad;
}

interface Menu {
  [dia: string]: {
    [comida: string]: string;
  };
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


export const getMenu = async (
  token: string | null
): Promise<ApiResponse<any>> => {
  if (!token) return unauthorizedResponse();

  const { ok, response, data, error } = await safeFetch(menuData.getMenu, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!ok) {
    return {
      status: response?.status || 500,
      error: error || "Error al obtener menú",
    };
  }

  return {
    status: response!.status,
    data,
  };
};

export const getListaMenu = async (
  menu: Menu,
  token: string | null
): Promise<ApiResponse<IngredienteCompra[]>> => {
  if (!token) return unauthorizedResponse();

  const { ok, response, data, error } = await safeFetch(menuData.getListaMenu, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(menu),
  });

  if (!ok) {
    return {
      status: response?.status || 500,
      error: error || "Error al obtener la lista de compras",
    };
  }

  return {
    status: response!.status,
    data: data as IngredienteCompra[],
  };
};

export const crearMenu = async (
  menuDataToSend: object,
  token: string | null
): Promise<ApiResponse<any>> => {
  if (!token) return unauthorizedResponse();

  const body = JSON.stringify({ dias: menuDataToSend });

  const { ok, response, data, error } = await safeFetch(menuData.crearMenu, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!ok) {
    return {
      status: response?.status || 500,
      error: error || "Error al crear menú",
    };
  }

  return {
    status: response!.status,
    data,
  };
};

export const getMenuById = async (
  id: string,
  token: string | null
): Promise<ApiResponse<any>> => {
  if (!token) return unauthorizedResponse();

  const { ok, response, data, error } = await safeFetch(
    `${apiFast}api/menus/${id}`,
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
      error:
        error ||
        (response?.status === 404 ? "Menú no encontrado" : "Error desconocido"),
    };
  }

  return {
    status: response!.status,
    data,
  };
};
