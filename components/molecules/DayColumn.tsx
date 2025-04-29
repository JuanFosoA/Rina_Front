import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { MealSelector } from './MealSelector';
import DayContainer from '../atoms/DayContainer';

type DayColumnProps = {
  day: string;
  mealTypes: string[];
  formData: any;
  control: any;
  setValue: (name: string, value: any) => void;
  width: number;
  height: number;
  padding: number;
};

export default function DayColumn({ day, mealTypes, formData, control, setValue, width, height, padding }: DayColumnProps) {
  return (
    <DayContainer
      day={day}
      style={{ width, height, padding }}
    >
      <Controller
        control={control}
        name={day}
        render={() => (
          <View style={{ gap: padding / 2, width: '100%' }}>
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
    </DayContainer>
  );
}
