import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ServiceWorker } from './serviceWorker';
import { AppRouterOutlet } from './app/routing/app-router-outlet.component';
import { APP_ROUTES } from './app/routing/app.routing';

render((
  <BrowserRouter>
    <AppRouterOutlet routes={APP_ROUTES}/>
  </BrowserRouter>
), document.querySelector('#app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorker.unregister();
