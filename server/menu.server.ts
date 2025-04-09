import { apiFast, menuData } from "./token";

export const getMenu = async (token: string | null): Promise<any> => {
  try {
    const response = await fetch(menuData.getMenu, {
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
        error: data.message || "Error al obtener Menu",
      };
    }

    return {
      status: response.status,
      data: data,
    };
  } catch (error) {
    console.error("Error en getMenu:", error);
    return {
      status: 500,
      error: "Error de conexión",
    };
  }
};

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

export const getListaMenu = async (
  menu: Menu,
  token: string | null
): Promise<{ status: number; data?: IngredienteCompra[]; error?: string }> => {
  if (!token) {
    return {
      status: 401,
      error: "No estás autenticado",
    };
  }

  try {
    const response = await fetch(menuData.getListaMenu, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menu),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        error: data.message || "Error al obtener la lista de compras",
      };
    }

    return {
      status: response.status,
      data: data as IngredienteCompra[],
    };
  } catch (error) {
    console.error("Error en getListaMenu:", error);
    return {
      status: 500,
      error: "Error de conexión",
    };
  }
};

export const crearMenu = async (
  MenuData: object,
  token: string | null
): Promise<any> => {
  if (!token) {
    return {
      status: 401,
      error: "No estás autenticado",
    };
  }

  const dataToSend = {
    dias: MenuData,
  };

  try {
    const response = await fetch(menuData.crearMenu, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        error: responseData.message || "Error al crear Menu",
      };
    }

    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error("Error en Menu:", error);
    return {
      status: 500,
      error: "Error de conexión",
    };
  }
};



export const getMenuById = async (
  id: string,
  token: string | null
): Promise<any> => {
  if (!token) {
    return {
      status: 401,
      error: 'No estás autenticado'
    };
  }

  try {
    const response = await fetch(`${apiFast}api/menus/${id}`, {
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
        error: response.status === 404 ? 'Menu no encontrada' : 'Respuesta vacía del servidor',
      };
    }

    const data = JSON.parse(responseText);

    if (!response.ok) {
      return {
        status: response.status,
        error: data.message || `Error ${response.status}`,
      };
    }

    

    return {
      status: response.status,
      data: data,
    };
  } catch (error) {
    console.error('Error en getMenuById:', error);
    return {
      status: 500,
      error: error instanceof Error ? error.message : 'Error de conexión',
    };
  }
};