import React from 'react';

class EpisodeItem extends React.Component {

  constructor() {
    super();
    this.deleteEpisode = this.deleteEpisode.bind(this);
    this.state = {
      logo: null,
    };
  }

  componentDidMount() {
    console.log('/api/logos/' + this.props.logo);
    fetch('/api/logos/' + this.props.logo)
      .then(response => response.json())
      .then(logo => {
        console.log(logo.image64);
        this.setState({ logo: logo.image64 });
      })
      .catch(() => console.log('crash'));
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
          {this.state.logo !== null &&
          <img src={`data:image/jpg;base64,${this.state.logo}`} />}
        </td>
        <td>
          <a type="button" className="btn btn-block btn-outline-primary" href={this.props.id}>Voir le détail</a>
        </td>
        <td>
          <button type="button" className="btn btn-block btn-outline-danger" onClick={this.deleteEpisode}>
            Supprimer
          </button>
        </td>
      </tr>
    );
  }
}

export default EpisodeItem;
