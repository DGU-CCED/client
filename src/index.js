import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import axios from "axios";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = "https://localhos:3000";
axios.defaults.withCredentials = true;

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  
), document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
