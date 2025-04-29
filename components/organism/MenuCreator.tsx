import { useForm } from 'react-hook-form';
import { View, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { crearMenu } from '../../server/menu.server';
import { useAuth } from '../../context/AuthContext';
import TitleText from '../atoms/TitleText';
import DayColumn from '../molecules/DayColumn';
import ButtonRow from '../molecules/ButtonRow';

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
  const { userToken } = useAuth();

  const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
  const mealTypes = ["desayuno", "almuerzo", "cena"];

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
    crearMenu(data, userToken);
    router.replace('/menus');
  };

  const clearSelections = () => {
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
