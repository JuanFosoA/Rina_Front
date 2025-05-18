import { TouchableOpacity, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  style?: any;
};

const PrimaryButton = ({ title, onPress, style }: Props) => (
  <TouchableOpacity
    className="bg-fith rounded-full p-4 my-12 w-32 items-center mx-2"
    style={style}
    onPress={onPress}
  >
    <Text className="text-white font-medium">{title}</Text>
  </TouchableOpacity>
);

export default PrimaryButton;
