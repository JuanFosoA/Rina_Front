import { TouchableOpacity, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  style?: any;
};

const SecondaryButton = ({ title, onPress, style }: Props) => (
  <TouchableOpacity
    className="bg-gray-500 rounded-full p-4 my-12 w-32 items-center mx-2"
    style={style}
    onPress={onPress}
  >
    <Text className="text-white font-medium">{title}</Text>
  </TouchableOpacity>
);

export default SecondaryButton;
