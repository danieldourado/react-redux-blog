import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#fafafa',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    }
  },
});
export default responsiveFontSizes(theme);
