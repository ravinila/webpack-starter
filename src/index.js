import { join } from 'lodash';

console.log('Webpack Works !, That\'s awesome !');

function component() {
  const el = document.createElement('div');

  el.innerHTML = join(['Hello', 'World', '!'], ' ');

  return el;
}

document.body.appendChild(component());
