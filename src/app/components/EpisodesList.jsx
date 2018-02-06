import React from 'react';
import EpisodeItem from './EpisodeItem';

class EpisodesList extends React.Component {

  constructor() {
    super();
    this.state = {
      episodes: []
    }
  }

  componentDidMount() {
    fetch('/api/episodes')
      .then(response => response.json())
      .then(data => this.setState({ episodes: data }));
  }

  render() {
    return (
      <div>
        {this.state.episodes.map((episode) => {
          return <EpisodeItem name={episode.name} code={episode.code} score={episode.score} />
        })}
      </div>
    );
  }
}

export default EpisodesList;
