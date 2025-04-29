import { Text } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: any;
};

const TitleText = ({ children, style }: Props) => (
  <Text className="text-xl font-bold" style={style}>
    {children}
  </Text>
);

export default TitleText;
