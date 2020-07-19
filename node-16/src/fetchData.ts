import { polyfill } from 'es6-promise';
import _fetch from 'isomorphic-fetch';

polyfill();

export async function getData() {
  try {
    const data = await _fetch('https://jsonplaceholder.typicode.com/comments');
    if (data.ok) {
      return await data.json();
    }
  } catch (e) {
    return e
  }
}
