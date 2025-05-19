import {tokenData } from "./token";

export const sendExpoTokenToBackend = async (token: string, expoPushToken: string) => {
  try {
    const response = await fetch(`${tokenData.setToken}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expoPushToken }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Error al guardar token');
    }

    return responseData;
  } catch (error) {
    console.error('Error detallado:', {
      error: error instanceof Error ? error.message : 'Error desconocido',
      token: expoPushToken,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};