import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  onPress: () => void;
  iconName: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Button: FC<Props> = ({onPress, backgroundColor, style, iconName}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{backgroundColor}, style, styles.button]}>
      <Icon name={iconName} color="white" size={20} />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 50,
    height: 50,
  },
});
