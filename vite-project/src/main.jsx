import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css'

  const theme= createTheme();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <div className='root2'>
         <App />
      </div>    
      
    </ThemeProvider>
  </React.StrictMode>,
)
