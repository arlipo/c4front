import React from 'react';
import ReactDOM from 'react-dom';
import VdomListElement from './components/test/VdomListElement';
import VdomFiltersElement from './components/test/VdomFiltersElement';
import './index.scss';
//start here
ReactDOM.render(
  <>
    <VdomFiltersElement />
    <VdomListElement />
  </>,
  document.getElementById('root')
);

