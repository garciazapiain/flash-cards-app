import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
// import { registerSW } from 'virtual:pwa-register';

const theme = createTheme();

// Register service worker for offline support
// registerSW({
//   onNeedRefresh() {
//     console.log("New content available! Refresh the app.");
//   },
//   onOfflineReady() {
//     console.log("App is ready to work offline.");
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
