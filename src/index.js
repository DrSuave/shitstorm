import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GeoTracking from './Components/geolocated.js'

ReactDOM.render(<GeoTracking />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();