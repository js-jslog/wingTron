import React, { Component } from "react";
import ScoresStore from '../../lib/scoresStore.js';

class ScoreBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scores: ScoresStore.getAll(),
    }
  }

  componentWillMount() {
    ScoresStore.on('change', () => {
      this.setState({
        scores: ScoresStore.getAll(),
      });
    });
  }

  render() {
    const { color, children } = this.props;
    const score_boards = this.state.scores.map((score, index) =>
      <div key={ index }>
        Player{ index }: { score }
      </div>
    );
    return (
      <div>
       { score_boards }
      </div>
    );
  }
}

export default ScoreBoard;
