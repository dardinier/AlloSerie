import React from 'react';

class EpisodeItem extends React.Component {

  constructor() {
    super();
    this.deleteEpisode = this.deleteEpisode.bind(this);
  }

  deleteEpisode() {
    this.props.deleteEpisode(this.props.id);
  }

  render() {
    return (
      <div className="episode">
        <div className="episode__description">{this.props.name}, {this.props.code} : {this.props.score}</div>
        <button onClick={this.deleteEpisode}>Supprimer</button>
      </div>
    );
  }
}

export default EpisodeItem;
