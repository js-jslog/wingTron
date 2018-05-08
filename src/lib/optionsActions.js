import dispatcher from './dispatcher';

export function updateOptions(options) {
  dispatcher.dispatch({
    type: 'UPDATE_OPTIONS',
    options: options,
  });
}
