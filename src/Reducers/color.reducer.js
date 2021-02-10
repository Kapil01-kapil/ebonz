import {colorConstants} from '../Constants';
const initialState = {
  HEADER: '#FF8A65',
  BUTTON: '#FF8A65',
  FOREGROUND_LIGHT: '#FFFFFF',
  FOREGROUND_DARK: '#939393',
  BASE_COLOR: '#BDBDBD',
  BACKGROUND: '#FFFFFF',
  SHADOW_COLOR: '#F8F8F8',
};
export function colors(state = initialState, action) {
  switch (action.type) {
    case colorConstants.LIGHT:
      return {
        HEADER: '#FF8A65',
        BUTTON: '#FF8A65',
        FOREGROUND_LIGHT: '#FFFFFF',
        FOREGROUND_DARK: '#939393',
        BASE_COLOR: '#BDBDBD',
        BACKGROUND: '#FFFFFF',
        SHADOW_COLOR: '#F8F8F8',
        BLACK:'BLACK'
      };
    case colorConstants.DARK:
      return {
        HEADER: '#FF8A65',
        BUTTON: '#FF8A65',
        FOREGROUND_LIGHT: '#FFFFFF',
        FOREGROUND_DARK: '#FEFEFE',
        BASE_COLOR: '#999999',
        BACKGROUND: '#424242',
        SHADOW_COLOR: '#F8F8F8',
        BLACK:'WHITE'
      };
    default:
      return state;
  }
}
