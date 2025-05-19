import { deviceData } from "./token";

export const registerDevice = async (expoToken: string, deviceId: string) => {
  try {
    const response = await fetch(deviceData.crearUserDevice, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expoPushToken: expoToken, deviceId })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return { success: true };
  } catch (error) {
    console.error('Error en registerDevice:', error);
    return { success: false };
  }
};