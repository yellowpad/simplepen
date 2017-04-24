import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
require('./favicon.ico'); 
import './styles/styles.scss';
import Root from './Root';

const store = configureStore();

render(
	<Root store={store} />,
	document.getElementById('app')
);
