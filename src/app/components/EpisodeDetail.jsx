import React from 'react';

class EpisodeDetail extends React.Component {

  constructor() {
    super();
    this.state = {
      episode: null
    }
  }

  componentDidMount() {
    fetch('/api/episodes/' + this.props.match.params.id)
      .then(response => response.json())
      .then(data => this.setState({episode: data}));
  }

  render() {
    return (
      <div>
        {this.state.episode !== null
          ?
          <div>
            Salut {this.state.episode.name}
          </div>
          :
          <div>
            Chargement de l'épisode ...
          </div>
        }
      </div>
    );
  }
}

export default EpisodeDetail;
