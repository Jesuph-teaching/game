// Purpose: Custom Tailwind CSS theme configuration.
// Path: config/theme.ts
// future plan : add more colors and extend tailwindcss theme => extract it into a general submodule to be used in other projects
import { Config as DaisyUIConfig } from 'daisyui';
//import themes from 'daisyui/src/theming/themes';

const daisyUIConfig: DaisyUIConfig = {
	themes: ['forest'],
};

export default daisyUIConfig;
