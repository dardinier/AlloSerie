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
      <tr className="episode">
        <td>{this.props.name}</td>
        <td>{this.props.code}</td>
        <td>{this.props.score}</td>
        <td>
          <a type="button" className="btn btn-outline-primary" href={this.props.id}>Voir le détail</a>
        </td>
        <td>
          <button type="button" className="btn btn-outline-danger" onClick={this.deleteEpisode}>
            Supprimer
          </button>
        </td>
      </tr>
    );
  }
}

export default EpisodeItem;
