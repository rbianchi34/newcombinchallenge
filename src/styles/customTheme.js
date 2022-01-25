import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();
const customTheme = createTheme({
    spacing: defaultTheme.spacing,
    palette: {
        mode: 'light',
        primary: {
            main: '#3d9154',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#3d5a91',
            contrastText: '#ffffff'
        },
        success: {
            main: '#83c442',
            contrastText: '#ffffff'
        },
        warning: {
            main: '#e59c30',
            contrastText: '#ffffff'
        },
        neutral: {
            main: '#6b6b6b',
            contrastText: '#fff',
        },
        danger: {
            main: '#f44336',
            contrastText: '#fff',
        },
    },
});

export default customTheme;