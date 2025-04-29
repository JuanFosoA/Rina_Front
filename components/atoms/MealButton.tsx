import { TouchableOpacity, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  selected: boolean;
};

const MealButton = ({ label, onPress, selected }: Props) => (
  <TouchableOpacity
    className={`bg-secondary rounded-full p-4 my-2 ${selected ? 'bg-green-500' : ''}`}
    style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}
    onPress={onPress}
  >
    <Text className="text-white text-center">{label}</Text>
  </TouchableOpacity>
);

export default MealButton;
