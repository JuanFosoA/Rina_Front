import { weeklyMenuData } from "../../../server/token";

export const getWeeklyMenuByDate = async (date: string, token: string) => {
  const res = await fetch(
    `${weeklyMenuData.getWeeklyMenuByDate}?date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    console.error("No se encontró menú para la fecha indicada.");
    return null;
  }

  return res.json();
};

export const setWeeklyMenu = async (
  menuId: string,
  date: string,
  token: string,
) => {
  const res = await fetch(weeklyMenuData.setWeeklyMenu, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ menuId, date }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al asignar el menú: ${errorText}`);
  }

  return res.json();
};
