import { useMemo } from "react";

export function useDayAndMeal() {
  const now = useMemo(() => new Date(), []);
  const dayOfWeek = useMemo(() => {
    const days = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    return days[now.getDay()];
  }, [now]);

  const moment = useMemo(() => {
    const hour = now.getHours();
    if (hour < 11) return "desayuno";
    if (hour < 17) return "almuerzo";
    return "cena";
  }, [now]);

  return { dayOfWeek, moment, now };
}
