import dispatcher from './dispatcher';

export function updateOptions(options) {
  dispatcher.dispatch({
    type: 'UPDATE_OPTION',
    val: 500,
  });
}
