import React from 'react';
import DatePickerHolder from './components/DatePickerHolder';
import Counter from './components/Counter';

import './style.css';

const App = () => {
  console.log(
    // this environment BUILD_VERSION variable is set
    // using "webpack.DefinePlugin" plugin in webpack config
    `build version: ${process.ENV.BUILD_VERSION}`
  );
  console.log('<App /> component rendered');

  return (
    <div className="layout">
      <div>
        <DatePickerHolder />
      </div>
      <div>
        <Counter />
      </div>
    </div>
  );
}

export default App;