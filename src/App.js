import { ThemeProvider } from '@mui/material/styles';
import Main from './Main';
import customTheme from './styles/customTheme';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <Main />
      </Router>
    </ThemeProvider>
  );
}

export default App;
