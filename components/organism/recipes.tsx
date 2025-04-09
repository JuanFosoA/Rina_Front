import { useForm, Controller } from 'react-hook-form';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { MealSelector } from '../molecules/RecipeModal';
import { useRouter } from 'expo-router';
import { crearMenu } from '../../server/menu.server';
import { useAuth } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');

type FormData = {
  [key: string]: {
    [mealType: string]: string;
  };
};

export default function MenuCreator() {
  const presetWidth = width * 0.4;
  const columnHeight = height * 0.8;
  const containerPadding = height * 0.02;
  const presetHeight = columnHeight * 0.9;
  const router = useRouter();
  const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
  const mealTypes = ["desayuno", "almuerzo", "cena"];
  const { userToken } = useAuth();
  const defaultValues: FormData = {};

  days.forEach(day => {
    defaultValues[day] = {};
    mealTypes.forEach(mealType => {
      defaultValues[day][mealType] = '';
    });
  });

  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues,
  });

  const formData = watch();

  const onSubmit = (data: FormData) => {
    crearMenu(data,userToken)
    router.replace('/menus');
  };

  return (
    <View className="flex-1 bg-tertiary flex-col w-full h-full" style={{ padding: containerPadding, height }}>
      <View className="flex-row justify-center m-5">
        <Text className="text-xl font-bold">Create Menu</Text>
      </View>
      <View className="flex-row justify-between" style={{ gap: containerPadding }}>
        <ScrollView horizontal className="flex-1" showsHorizontalScrollIndicator={false}>
          <View className="flex-row" style={{ gap: containerPadding }}>
            {days.map(day => (
              <View
                key={day}
                className="bg-[#faf6eb] rounded-full items-center"
                style={{ width: presetWidth, height: presetHeight, padding: containerPadding }}
              >
                <Text className="text-secondary mb-4 text-lg font-semibold capitalize">{day}</Text>
                <Controller
                  control={control}
                  name={day}
                  render={() => (
                    <View style={{ gap: containerPadding / 2, width: '100%' }}>
                      {mealTypes.map(mealType => (
                        <MealSelector
                          key={mealType}
                          day={day}
                          mealType={mealType}
                          selectedRecipeId={formData[day]?.[mealType] || ''}
                          onSelect={(selectedDay, selectedMealType, recipeId) => {
                            setValue(`${selectedDay}.${selectedMealType}`, recipeId);
                          }}
                        />
                      ))}
                    </View>
                  )}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="flex-row justify-center">
        <TouchableOpacity 
          className="bg-fith rounded-full p-4 my-10 mx-4 w-32 items-center" 
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-medium">Crear Menú</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="bg-gray-500 rounded-full p-4 my-10 mx-4 w-32 items-center" 
          onPress={() => {
            days.forEach(day => {
              mealTypes.forEach(mealType => {
                setValue(`${day}.${mealType}`, '');
              });
            });
          }}
        >
          <Text className="text-white font-medium">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
