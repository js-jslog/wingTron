import dispatcher from './dispatcher'

export function updateScores(scores) {
  dispatcher.dispatch({
    type: 'UPDATE_SCORES',
    scores: scores,
  })
}
