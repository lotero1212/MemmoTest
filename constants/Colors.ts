/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const appColors = {
  palette: {
    100: '#F31559',
    200: '#BC7AF9',
    300: '#BC5A94',
    400: '#F075AA',
    500: '#FF76CE'
  },

  text: {
    100: '#FFEECC',
    200: '#FFDDCC',
    300: '#FFCCCC',
    400: '#FEBBCC'
  },

  bg: {
    100: '#FFAF45',
    200: '#FB6D48',
    300: '#D74B76',
    400: '#673F69'
  }

}

export const Colors = {
  light: {
    text: appColors.palette[300],
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: appColors.text[400],
    background: appColors.bg[400],
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
