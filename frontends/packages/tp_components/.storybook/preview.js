import { muiTheme } from 'storybook-addon-material-ui'

import {GreyGooseTheme} from '../theme/schemes/GreyGooseTheme';
import {PureLightTheme} from '../theme/schemes/PureLightTheme';
import {PurpleFlowTheme} from '../theme/schemes/PurpleFlowTheme';

export const decorators = [
	muiTheme([GreyGooseTheme, PureLightTheme, PurpleFlowTheme])
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}