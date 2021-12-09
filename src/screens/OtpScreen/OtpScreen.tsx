import React from 'react';
import {Text, View} from 'react-native';
import {CustomIcon, OtpInput, TopBar} from '~components';
import {COLORS, SIZES} from '~constants';
import {otpStyle} from './OtpStyle';

const OtpScreen: React.FC<{}> = () => {
  return (
    <View style={otpStyle.container}>
      <TopBar
        showLeftIcon={true}
        headerText=""
        customContainerStyle={otpStyle.customHeader}
      />
      <View style={otpStyle.content}>
        <View style={otpStyle.iconLockAndTextWrapper}>
          <View style={otpStyle.iconLock}>
            <CustomIcon
              name="Lock"
              size={SIZES.spacing_32_horizontal}
              color={COLORS.white}
            />
          </View>
          <Text style={otpStyle.enterOtpCode}>Enter the OTP Code</Text>
          <Text style={otpStyle.sentOtpCode}>
            We’ve sent you an OTP code to
          </Text>
          <Text style={otpStyle.phone}>08768262427</Text>
        </View>
        <OtpInput otpLength={4} />
      </View>
    </View>
  );
};
export default OtpScreen;
