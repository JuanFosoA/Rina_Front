import { TouchableOpacity, Text } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  style?: any;
};

const SecondaryButton = ({ title, onPress, style }: Props) => (
  <TouchableOpacity
    className="bg-gray-500 rounded-full p-4 my-2 w-32 items-center"
    style={style}
    onPress={onPress}
  >
    <Text className="text-white font-medium">{title}</Text>
  </TouchableOpacity>
);

export default SecondaryButton;
