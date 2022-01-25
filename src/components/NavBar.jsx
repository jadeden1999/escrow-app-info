import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import {
    ThemeProvider,colors
    
  } from "@material-ui/core";
  import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: "#FF4B14"
      },
      secondary: {
        main: "#FF4B14"
      },
      error: {
        main: colors.red.A400
      },
      background: {
        default: "#fff"
      }
    }
  });
const NavBar = () => {
    return(
        <ThemeProvider theme={theme}>

        <AppBar position="static">
            <Toolbar>
                <Typography   color="inherit">
                    Demo App
                </Typography>
            </Toolbar>
        </AppBar>
        </ThemeProvider>

    )
}
export default NavBar;