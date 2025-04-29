import { View } from 'react-native';
import PrimaryButton from '../atoms/PrimaryButton';
import SecondaryButton from '../atoms/SecondaryButton';

type ButtonRowProps = {
  onCreate: () => void;
  onCancel: () => void;
};

export default function ButtonRow({ onCreate, onCancel }: ButtonRowProps) {
  return (
    <View className="flex-row justify-center">
      <PrimaryButton title="Crear Menú" onPress={onCreate} />
      <SecondaryButton title="Cancelar" onPress={onCancel} />
    </View>
  );
}
