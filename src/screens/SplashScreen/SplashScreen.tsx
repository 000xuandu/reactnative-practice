import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {Logo, Wave} from '~constants/images';
import {splashStyle} from './splashStyle';

interface SplashProps {}

const SplashScreen: React.FC<SplashProps> = ({}) => {
  return (
    <View style={splashStyle.container}>
      <View style={splashStyle.logoAndTextWrapper}>
        <View style={splashStyle.logoWrapper}>
          <Image source={Logo} style={splashStyle.logo} resizeMode="cover" />
        </View>
        <View style={splashStyle.textLogoWrapper}>
          <Text style={splashStyle.textLogoApp}>B-Wallet</Text>
        </View>
      </View>
      <ImageBackground
        source={Wave}
        resizeMode="cover"
        style={splashStyle.waveImageWrapper}>
        <Text style={splashStyle.textBestChoice}>
          Your best choice for e-voucher
        </Text>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
