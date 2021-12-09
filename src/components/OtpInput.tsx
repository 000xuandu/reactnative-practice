import React from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONTS, SIZES} from '~constants';

interface OtpInputProps {
  otpLength: number;
  [key: string]: any;
}

const defaultProps: OtpInputProps = {
  otpLength: 4,
};

const OtpInput: React.FC<OtpInputProps> = ({otpLength}) => {
  const [inputRefs, setInputRefs] = React.useState<Array<any>>([]);

  const INPUTS = React.useMemo(() => Array(otpLength).fill(1), [otpLength]);

  const setRef = (ref: TextInput | null, index: number) => {
    if (ref) {
      inputRefs.push(ref);
      if (index === otpLength - 1) {
        setInputRefs(inputRefs);
      }
    }
  };

  const handleOnKeyPress = React.useCallback(
    (nativeEvent, index) => {
      if (nativeEvent.key === 'Backspace') {
        if (index > 0) {
          inputRefs[index - 1].focus();
        }
      } else if (index < otpLength - 1) {
        inputRefs[index + 1].focus();
      }
    },
    [inputRefs, otpLength],
  );

  const InputLayout = ({index}: {index: number}) => {
    return (
      <View style={[styles.inputLayout]}>
        <TextInput
          ref={ref => setRef(ref, index)}
          style={styles.input}
          onKeyPress={({nativeEvent}) => handleOnKeyPress(nativeEvent, index)}
          keyboardType="numeric"
          textAlign="center"
          selectionColor={'green'}
          maxLength={1}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      {INPUTS?.map((_, index) => {
        return <InputLayout index={index} key={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputLayout: {
    width: heightPercentageToDP('7.88%'),
    height: heightPercentageToDP('7.88%'),
    marginHorizontal: SIZES.spacing_8_horizontal,

    borderRadius: SIZES.spacing_16_vertical,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .5)',

    overflow: 'hidden',
  },
  input: {
    width: '100%',
    height: '100%',
    padding: 0,

    ...FONTS.sbold_24,
    color: COLORS.white,
    lineHeight: Platform.select({
      ios: 0,
    }),
  },
});
OtpInput.defaultProps = defaultProps;
export default OtpInput;
