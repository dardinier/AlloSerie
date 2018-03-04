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
  }

  componentDidMount() {
    fetch('/api/episodes')
      .then(response => response.json())
      .then(data => this.setState({episodes: data}));
  }

  submitForm(name, code, logo, synopsis, score) {
    const newEpisode = {
      name: name,
      code: code,
      logo: logo,
      synopsis: synopsis,
      score: score
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

  render() {
    return (
      <div className="row">
        <div className="col-md-9 col-sm-12">
          <EpisodesList episodes={this.state.episodes}/>
        </div>
        <div className="col-md-3 col-sm-12">
          <EpisodeAdd submitForm={this.submitForm}/>
        </div>
      </div>
    );
  }
}

export default Episodes;
