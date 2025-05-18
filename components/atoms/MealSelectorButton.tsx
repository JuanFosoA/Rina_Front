// atoms/MealSelectorButton.tsx
import { Text, Pressable } from "react-native";
import { FC } from "react";

type Props = {
  title: string;
  onPress: () => void;
};

const MealSelectorButton: FC<Props> = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-full py-3 px-4 my-1 bg-white rounded-2xl border border-[#d1ccc0] shadow-sm active:opacity-80"
    >
      <Text className="text-center text-base font-medium text-[#444]">
        {title}
      </Text>
    </Pressable>
  );
};

export default MealSelectorButton;
