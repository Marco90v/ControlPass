import React from 'react';
import ReactDOM from 'react-dom';
// import { Router } from "react-router";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

// import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import '../node_modules/animate.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Inicio } from "./components/Inicio";
// import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();
// console.log("index.js");

ReactDOM.render(
  <Router >
    <HashRouter>
      <Inicio class="container" history={history}/>
    </HashRouter>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
