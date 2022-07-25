import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { defineCustomElements } from '@ionic/core/loader/index';

defineCustomElements();

ReactDOM.render(<App />, document.querySelector('#root'));