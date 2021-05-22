import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Route from './router'
import { Provider } from 'react-redux'
import store from 'store'
import { calcFontSize } from 'utils'
import './style/index.scss'

calcFontSize()

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>{renderRoutes(Route)}</HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

