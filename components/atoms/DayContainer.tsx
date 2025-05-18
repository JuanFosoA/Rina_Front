import { View, Text } from "react-native";

type Props = {
  day: string;
  children: React.ReactNode;
  style?: any;
};

const DayContainer = ({ day, children, style }: Props) => (
  <View
    className="bg-[#f7f3e9] rounded-full items-center shadow-sm"
    style={style}
  >
    <Text className="text-[#a49c8f] mb-4 text-lg font-semibold capitalize">
      {day}
    </Text>
    {children}
  </View>
);

export default DayContainer;
