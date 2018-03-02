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
      <div className="col-lg-4 col-sm-6 portfolio-item">
        <a className="card h-100" href={this.props.id}>
          {this.state.logo !== null &&
          <img className="card-img-top" src={`data:image/jpg;base64,${this.state.logo}`} />}
          <div className="card-body">
            <h4 className="card-title">{this.props.name}</h4>
            <p className="card-text">{this.props.code}</p>
          </div>
        </a>
      </div>
    );
  }
}

export default EpisodeItem;
