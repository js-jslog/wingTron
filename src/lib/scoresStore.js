import { EventEmitter } from 'events';
import dispatcher from './dispatcher.js';

class ScoresStore extends EventEmitter {
  constructor() {
    super()
    this.scores = [
      10,
      10,
    ]
  }

  updateScores(scores) {
    this.scores = scores

    this.emit('change');
  }

  getAll() {
    return this.scores;
  }

  handleActions(action) {
    switch(action.type) {
      case 'UPDATE_SCORES': {
        this.updateScores(action.scores)
      }
    }
  }
}

const scoresStore = new ScoresStore;
dispatcher.register(scoresStore.handleActions.bind(scoresStore))

export default scoresStore
