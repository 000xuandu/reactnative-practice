import React from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {CustomIcon} from '~components';
import {COLORS, FONTS, SIZES} from '~constants';

interface InputFieldProps {
  showLabel?: boolean;
  label?: string;
  showIcon?: boolean;
  value: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  customContainerStyle?: StyleProp<ViewStyle>;

  [key: string]: any;
}

const defaultProps: InputFieldProps = {
  showLabel: true,
  label: '',
  showIcon: false,
  value: '',
};

const InputField: React.FC<InputFieldProps> = ({
  showLabel,
  showIcon,
  value,
  label,
  customContainerStyle,
  onChange,
  onFocus,
  ...rest
}) => {
  const [iconName, setIconName] = React.useState<string>('Eye-Show');
  const onChangeIcon = React.useCallback(() => {
    if (iconName === 'Eye-Show') {
      setIconName('Eye-Hide');
    } else {
      setIconName('Eye-Show');
    }
  }, [iconName]);

  return (
    <View style={[styles.container, customContainerStyle]}>
      <View style={styles.labelAndInputWrapper}>
        {showLabel && <Text style={styles.label}>{label}</Text>}
        <TextInput
          style={styles.input}
          value={value}
          onChange={onChange}
          secureTextEntry={showIcon && iconName === 'Eye-Show'}
          textAlignVertical="center"
          onFocus={onFocus}
          {...rest}
        />
      </View>
      {showIcon && (
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={onChangeIcon}>
            <CustomIcon
              name={iconName}
              size={SIZES.spacing_24_horizontal}
              color={COLORS.secondary.gray_2}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,

    borderWidth: 1,
    borderColor: COLORS.secondary.gray_3,
    borderRadius: SIZES.spacing_8_vertical,

    paddingVertical: SIZES.spacing_8_vertical,
    paddingHorizontal: SIZES.spacing_12_horizontal,
    marginHorizontal: SIZES.spacing_24_horizontal,

    flexDirection: 'row',
    alignItems: 'center',
  },
  labelAndInputWrapper: {
    flex: 1,
  },
  label: {
    ...FONTS.regular_12,
    color: COLORS.secondary.gray_2,
  },
  input: {
    ...FONTS.sbold_14,
    color: COLORS.black,
    paddingVertical: Platform.select({
      ios: SIZES.spacing_2_vertical,
    }),
    lineHeight: Platform.select({
      ios: 0,
    }),
    padding: 0,
  },
  iconWrapper: {},
});
InputField.defaultProps = defaultProps;
export default InputField;
