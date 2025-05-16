import { useForm, Controller } from 'react-hook-form';
import { View, ScrollView, Dimensions, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { crearMenu } from '../../server/menu.server';
import { useAuth } from '../../context/AuthContext';
import TitleText from '../atoms/TitleText';
import DayColumn from '../molecules/DayColumn';
import ButtonRow from '../molecules/ButtonRow';

const { width, height } = Dimensions.get('window');

type FormData = {
  titulo: string;
  [key: string]: any;
};

export default function MenuCreator() {
  const presetWidth = width * 0.4;
  const columnHeight = height * 0.8;
  const containerPadding = height * 0.02;
  const presetHeight = columnHeight * 0.9;
  const router = useRouter();
  const { userToken } = useAuth();

  const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
  const mealTypes = ["desayuno", "almuerzo", "cena"];

  const defaultValues: FormData = {
    titulo: '',
  };

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
    const daysWithPartialData: string[] = [];
  
    for (const day of days) {
      const meals = data[day];
      const values = Object.values(meals);
      const filled = values.filter(v => v !== '');
  
      if (filled.length > 0 && filled.length < mealTypes.length) {
        daysWithPartialData.push(day);
      }
    }
  
    if (daysWithPartialData.length > 0) {
      alert(`Completa todos los campos en: ${daysWithPartialData.join(', ')}`);
      return;
    }
  
    crearMenu(data, userToken);
    router.replace('/menus');
  };
  

  const clearSelections = () => {
    setValue('titulo', '');
    days.forEach(day => {
      mealTypes.forEach(mealType => {
        setValue(`${day}.${mealType}`, '');
      });
    });
  };

  return (
    <View className="flex-1 bg-tertiary w-full" style={{ padding: containerPadding, height }}>
      <View className="flex-row justify-center m-5">
        <TitleText>Create Menu</TitleText>
      </View>

      <View className="mb-4 px-4">
        <Controller
          control={control}
          name="titulo"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-white rounded-md p-3 text-black"
              placeholder="Título del menú"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row" style={{ gap: containerPadding }}>
          {days.map(day => (
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
