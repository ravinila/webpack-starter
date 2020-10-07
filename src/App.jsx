import React from 'react';
import DatePickerHolder from './components/DatePickerHolder';
import Counter from './components/Counter';

import './style.css';

const App = () => {
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