import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GlobalStyle from "./themes/GlobalStyles.jsx";
import { GlobalContextProvider } from "./context/Global.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <GlobalStyle />
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
)
