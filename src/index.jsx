import { join } from 'lodash';
import { square } from './utils';

import './style.css';

console.log('Webpack Works !|, That\'s awesome !', square(10));

const foo = [1, 2, 3];
console.log(...foo);
const str = 'Ravins';
console.log(str.padStart(8));

let count = 0;
function component() {
  const el = document.createElement('div');
  el.innerHTML = join(['Hello', 'World', ], ' ');
  return el;
}

document.body.appendChild(component());
