import coafSerif200 from './serif/SpectralSC-ExtraLight.ttf';
import coafSerif200i from './serif/SpectralSC-ExtraLightItalic.ttf';
import coafSerif300 from './serif/SpectralSC-Light.ttf';
import coafSerif300i from './serif/SpectralSC-LightItalic.ttf';
import coafSerif400 from './serif/SpectralSC-Regular.ttf';
import coafSerif400i from './serif/SpectralSC-Italic.ttf';
import coafSerif500 from './serif/SpectralSC-Medium.ttf';
import coafSerif500i from './serif/SpectralSC-MediumItalic.ttf';
import coafSerif600 from './serif/SpectralSC-SemiBold.ttf';
import coafSerif600i from './serif/SpectralSC-SemiBoldItalic.ttf';
import coafSerif700 from './serif/SpectralSC-Bold.ttf';
import coafSerif700i from './serif/SpectralSC-BoldItalic.ttf';
import coafSerif800 from './serif/SpectralSC-ExtraBold.ttf';
import coafSerif800i from './serif/SpectralSC-ExtraBoldItalic.ttf';

import coafSans100 from './sans/Montserrat-Thin.ttf';
import coafSans100i from './sans/Montserrat-ThinItalic.ttf';
import coafSans200 from './sans/Montserrat-ExtraLight.ttf';
import coafSans200i from './sans/Montserrat-ExtraLightItalic.ttf';
import coafSans300 from './sans/Montserrat-Light.ttf';
import coafSans300i from './sans/Montserrat-LightItalic.ttf';
import coafSans400 from './sans/Montserrat-Regular.ttf';
import coafSans400i from './sans/Montserrat-Italic.ttf';
import coafSans500 from './sans/Montserrat-Medium.ttf';
import coafSans500i from './sans/Montserrat-MediumItalic.ttf';
import coafSans600 from './sans/Montserrat-SemiBold.ttf';
import coafSans600i from './sans/Montserrat-SemiBoldItalic.ttf';
import coafSans700 from './sans/Montserrat-Bold.ttf';
import coafSans700i from './sans/Montserrat-BoldItalic.ttf';
import coafSans800 from './sans/Montserrat-ExtraBold.ttf';
import coafSans800i from './sans/Montserrat-ExtraBoldItalic.ttf';
import coafSans900 from './sans/Montserrat-Black.ttf';
import coafSans900i from './sans/Montserrat-BlackItalic.ttf';

export const fontFace = `
@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif200}) format('truetype');
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif200i}) format('truetype');
  font-weight: 200;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif300}) format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif300i}) format('truetype');
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif400}) format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif400i}) format('truetype');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif500}) format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif500i}) format('truetype');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif600}) format('truetype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif600i}) format('truetype');
  font-weight: 600;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif700}) format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif700i}) format('truetype');
  font-weight: 700;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif800}) format('truetype');
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Serif';
  src: url(${coafSerif800i}) format('truetype');
  font-weight: 800;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans100}) format('truetype');
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans100i}) format('truetype');
  font-weight: 100;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans200}) format('truetype');
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans200i}) format('truetype');
  font-weight: 200;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans300}) format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans300i}) format('truetype');
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans400}) format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans400i}) format('truetype');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans500}) format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans500i}) format('truetype');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans600}) format('truetype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans600i}) format('truetype');
  font-weight: 600;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans700}) format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans700i}) format('truetype');
  font-weight: 700;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans800}) format('truetype');
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans800i}) format('truetype');
  font-weight: 800;
  font-style: italic;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans900}) format('truetype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'COAF Sans';
  src: url(${coafSans900i}) format('truetype');
  font-weight: 900;
  font-style: italic;
}
`