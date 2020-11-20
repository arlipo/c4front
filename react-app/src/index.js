import React from 'react';
import ReactDOM from 'react-dom';
import VdomListElement from './components/test/VdomListElement'
import VdomFiltersElement from './components/test/VdomFiltersElement'
import './index.scss'

//start
ReactDOM.render(
  <div>
    <VdomFiltersElement />
    <VdomListElement />
  </div>,
  document.getElementById('root')
);

