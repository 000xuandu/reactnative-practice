import React from 'react';
import {
  Image,
  Keyboard,
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {InputField} from '~components';
import {SIZES} from '~constants';
import {Logo, Wave} from '~constants/images';
import {signInStyle} from './SignInStyle';

const SignInScreen: React.FC<{}> = () => {
  const [emailOrPhoneText, setEmailOrPhoneText] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isKeyboardShow, setIsKeyboardShow] = React.useState<boolean>(false);
  const hightDefaultRef = React.useRef(heightPercentageToDP('38%')).current;

  const onChangeEmailOrPhoneText = React.useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setEmailOrPhoneText(e.nativeEvent.text);
    },
    [],
  );

  const onInputFocus = React.useCallback(() => {
    setIsKeyboardShow(true);
  }, []);

  const onChangePasswordText = React.useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setPassword(e.nativeEvent.text);
    },
    [],
  );

  React.useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShow(false);
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const signInFormTranslate = () => {
    'worklet';
    return isKeyboardShow ? SIZES.statusBarSpace : hightDefaultRef;
  };

  const customSignInFormStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(signInFormTranslate())}],
    };
  });

  return (
    <View style={signInStyle.container}>
      <View style={signInStyle.logoAndTextWrapper}>
        <Image
          source={Wave}
          resizeMode="cover"
          style={signInStyle.waveImageWrapper}
        />
        <View style={signInStyle.logoWrapper}>
          <Image source={Logo} style={signInStyle.logo} resizeMode="cover" />
        </View>
        <View style={signInStyle.textLogoWrapper}>
          <Text style={signInStyle.textLogoApp}>B-Wallet</Text>
        </View>
      </View>
      <Animated.View
        style={[signInStyle.signInFormWrapper, customSignInFormStyle]}>
        <Text style={signInStyle.signInTitle}>Sign In</Text>
        <InputField
          value={emailOrPhoneText}
          onChange={onChangeEmailOrPhoneText}
          onFocus={onInputFocus}
          label={'Email/Phone Number'}
          customContainerStyle={signInStyle.inputStyle}
        />
        <InputField
          value={password}
          onChange={onChangePasswordText}
          onFocus={onInputFocus}
          label={'Password'}
          showIcon
          customContainerStyle={signInStyle.inputStyle}
        />
        <TouchableOpacity style={signInStyle.signInBtn}>
          <Text style={signInStyle.signInTextBtn}>Sign In</Text>
        </TouchableOpacity>
        <View style={signInStyle.forgotPassWrapper}>
          <TouchableOpacity>
            <Text style={signInStyle.forgetPassText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={signInStyle.signUpWrapper}>
          <Text style={signInStyle.dontHaveAccYet}>
            Don’t have account yet?
          </Text>
          <TouchableOpacity>
            <Text style={signInStyle.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default SignInScreen;
