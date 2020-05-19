import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";

import 'assets/css/style.css';

import mainRouter from 'routers/mainRouter.js';


const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {mainRouter.map((page) => {
        return page.layout;
      })}
    </Switch>
  </Router>,
  document.getElementById('root')
);

