import React from "react";
import EpisodesList from "./EpisodesList";
import EpisodeAdd from "./EpisodeAdd";

class Episodes extends React.Component {

  constructor() {
    super();
    this.state = {
      episodes: []
    };
    this.submitForm = this.submitForm.bind(this);
    this.deleteEpisode = this.deleteEpisode.bind(this);
  }

  componentDidMount() {
    fetch('/api/episodes')
      .then(response => response.json())
      .then(data => this.setState({episodes: data}));
  }

  submitForm(name, code, logo, synopsis, score) {
    console.log(logo);
    const newEpisode = {
      name: name,
      code: code,
      logo: logo,
      synopsis: synopsis,
      score: Number(score)
    };

    fetch('/api/episodes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEpisode)
    })
      .then(response => response.json())
      .then(episode => this.setState({episodes: [...this.state.episodes, episode]}));
  }

  deleteEpisode(id) {
    fetch('/api/episodes/' + id, {
      method: 'DELETE'
    })
      .then(() => this.setState({episodes: this.state.episodes.filter((episode) => episode.id !== id)}));
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-9 col-sm-12">
          <EpisodesList episodes={this.state.episodes} deleteEpisode={this.deleteEpisode}/>
        </div>
        <div className="col-md-3 col-sm-12">
          <EpisodeAdd submitForm={this.submitForm}/>
        </div>
      </div>
    );
  }
}

export default Episodes;
