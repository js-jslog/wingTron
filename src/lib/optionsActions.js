import dispatcher from './dispatcher';

export function updateOptions(options) {
  dispatcher.dispatch({
    type: 'UPDATE_OPTIONS',
    options: options,
  });
}

export function addPlayer(options) {
  dispatcher.dispatch({
    type: 'ADD_PLAYER',
    options: options,
  })
}

export function removePlayer(index) {
  dispatcher.dispatch({
    type: 'REMOVE_PLAYER',
    index: index,
  })
}
