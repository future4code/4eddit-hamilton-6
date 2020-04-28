import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    primary: {main: '#EC7D62'},
  },

  props:{
    MuiTextField: {
      fullWidth: true,
    }
  }

});
