import "./main.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store/store.js";
import { createRoot } from 'react-dom/client';
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001'

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);