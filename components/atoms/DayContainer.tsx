import { View, Text } from 'react-native';

type Props = {
  day: string;
  children: React.ReactNode;
  style?: any;
};

const DayContainer = ({ day, children, style }: Props) => (
  <View
    className="bg-[#faf6eb] rounded-full items-center"
    style={style}
  >
    <Text className="text-secondary mb-4 text-lg font-semibold capitalize">{day}</Text>
    {children}
  </View>
);

export default DayContainer;
