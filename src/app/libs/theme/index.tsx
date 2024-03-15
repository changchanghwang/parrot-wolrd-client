import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Theme } from '@emotion/react';
import {
  createTheme,
  dialogContentClasses,
  ThemeProvider as MuiThemeProvider,
  useTheme as useEmotionTheme,
} from '@mui/material';
import './index.css';

function ThemeProvider(props: { children: ReactNode }) {
  // prop destruction
  const { children } = props;

  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  const theme = useMemo(() => {
    const muiTheme = createTheme({
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              padding: '11px 16px',
              border: '2px solid #B3BAC5',
              borderRadius: '8px',
              '&.Mui-focused': {
                borderColor: '#5555FF',
              },
              '&.Mui-error': {
                borderColor: '#FF2626',
              },
            },
            input: {
              fontSize: '20px',
              fontWeight: 500,
              height: '24px',
              padding: '0',
            },
            notchedOutline: {
              border: 'none',
            },
          },
        },
        MuiInputAdornment: {
          styleOverrides: {
            root: {
              marginRight: '0',
            },
          },
        },
        MuiFormHelperText: {
          styleOverrides: {
            root: {
              margin: '0',
              color: '#5E6C83',
            },
          },
        },
        MuiIconButton: {
          defaultProps: {
            disableRipple: true,
          },
          styleOverrides: {
            root: {
              padding: '0',
            },
          },
        },
        MuiMenuItem: {
          defaultProps: {
            disableRipple: true,
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: '16px',
              boxShadow: '20px 16px 0px #000000',
            },
          },
        },
        MuiDialogTitle: {
          styleOverrides: {
            root: {
              padding: '24px',
            },
          },
        },
        MuiDialogContent: {
          styleOverrides: {
            root: {
              padding: '40px 60px',
            },
          },
        },
        MuiDialogActions: {
          styleOverrides: {
            root: {
              padding: '40px 60px',
              // https://github.com/mui/material-ui/blob/b265431f9a32ea726c5227821126fbc6424117d5/packages/mui-material/src/DialogContent/DialogContent.js#L41
              [`.${dialogContentClasses.root} + &`]: {
                paddingTop: '0px',
              },
            },
          },
        },
      },
      spacing: 4,
    });
    return {
      ...muiTheme,
      palette: {
        ...muiTheme.palette,
      },
    };
  }, []);

  // effects
  // handlers

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}

export const useTheme = (): [Theme, ] => {
  return useEmotionTheme();
};

//HACK: 일단 mui의 theme대신 emotion의 theme을 사용하도록 한다.
export { ThemeProvider, Theme };

export * from './media-query';
