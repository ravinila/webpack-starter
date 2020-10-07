import React, { useCallback, useState } from 'react';
import { join, map } from 'lodash';

import './style';

const Counter = () => {
  const [counter, setCounter] = useState([
    {id: 1, value: 0},
    {id: 2, value: 0},
    {id: 3, value: 0},
    {id: 4, value: 0},
    {id: 5, value: 0}
  ]);
  const onIncrement = useCallback(() => {
    setCounter(map(counter, a => ({...a, value: a.value + 1})));
  });
  const onDegrement = useCallback(() => {
    setCounter(map(counter, a => ({...a, value: a.value - 1})));
  });
  return (
    <div className="box">
      <button className="btn" onClick={onDegrement}>-</button>
      <button className="btn" onClick={onIncrement}>+</button>
      <output>{counter.map(item => (<span key={item.id}>{item.value}</span>))}</output>
    </div>
  );
}

export default Counter;