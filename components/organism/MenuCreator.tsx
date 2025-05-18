import { useForm, Controller } from "react-hook-form";
import { View, ScrollView, Dimensions, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { crearMenu } from "../../server/menu.server";
import { useAuth } from "../../context/AuthContext";
import TitleText from "../atoms/TitleText";
import DayColumn from "../molecules/DayColumn";
import ButtonRow from "../molecules/ButtonRow";

const { width, height } = Dimensions.get("window");

const roundTo8 = (value: number) => Math.floor(value / 8) * 8;

const presetWidth = roundTo8(width * 0.35);
const columnHeight = roundTo8(height * 0.678);
const containerPadding = roundTo8(height * 0.02);
const presetHeight = roundTo8(columnHeight * 0.9);

type FormData = {
  name: string;
  [key: string]: any;
};

export default function MenuCreator() {
  const router = useRouter();
  const { userToken } = useAuth();

  const days = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];
  const mealTypes = ["desayuno", "almuerzo", "cena"];

  const defaultValues: FormData = { name: "" };
  days.forEach((day) => {
    defaultValues[day] = {};
    mealTypes.forEach((mealType) => {
      defaultValues[day][mealType] = "";
    });
  });

  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues,
  });
  const formData = watch();

  const onSubmit = (data: FormData) => {
    const daysWithPartialData: string[] = [];

    for (const day of days) {
      const meals = data[day];
      const values = Object.values(meals);
      const filled = values.filter((v) => v !== "");
      if (filled.length > 0 && filled.length < mealTypes.length) {
        daysWithPartialData.push(day);
      }
    }

    if (daysWithPartialData.length > 0) {
      alert(`Completa todos los campos en: ${daysWithPartialData.join(", ")}`);
      return;
    }

    const payload = {
      name: data.name || null,
      dias: days.reduce(
        (acc, day) => {
          acc[day] = data[day];
          return acc;
        },
        {} as Record<string, Record<string, string>>,
      ),
    };

    crearMenu(payload, userToken);
    router.replace("/menus");
  };

  const clearSelections = () => {
    setValue("name", "");
    days.forEach((day) => {
      mealTypes.forEach((mealType) => {
        setValue(`${day}.${mealType}`, "");
      });
    });
  };

  return (
    <View
      className="flex-1 bg-[#d7cbbd] w-full"
      style={{ padding: containerPadding, height }}
    >
      <View className="flex-row justify-center my-4">
        <TitleText>Create Menu</TitleText>
      </View>

      <View className="mb-4 px-2">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-white rounded-xl p-4 text-black shadow-md"
              placeholder="Título del menú"
              placeholderTextColor="#a49c8f"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                borderWidth: 1,
                borderColor: "rgba(164, 156, 143, 0.3)",
              }}
            />
          )}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row" style={{ gap: containerPadding }}>
          {days.map((day) => (
            <DayColumn
              key={day}
              day={day}
              mealTypes={mealTypes}
              formData={formData}
              control={control}
              setValue={setValue}
              width={presetWidth}
              height={presetHeight}
              padding={containerPadding}
            />
          ))}
        </View>
      </ScrollView>

      <ButtonRow onCreate={handleSubmit(onSubmit)} onCancel={clearSelections} />
    </View>
  );
}
