import React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Test } from './test';
const render = () => {
  ReactDOM.render(
  <AppContainer><Test/></AppContainer>, document.querySelector('[app]'));
}

render();

if (module.hot) { module.hot.accept(render); }