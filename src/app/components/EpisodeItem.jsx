import React from 'react';

class EpisodeItem extends React.Component {

  constructor() {
    super();
    this.deleteEpisode = this.deleteEpisode.bind(this);
    this.state = {
      logo: {},
    };
  }

  componentDidMount() {
    console.log('/api/logos/' + this.props.logo);
    fetch('/api/logos/' + this.props.logo)
      .then(response => response.json())
      .then(logo => {
        console.log(logo.image64);
        this.setState({ logo });
      })
      .catch(() => console.log('crash'));
  }

  deleteEpisode() {
    this.props.deleteEpisode(this.props.id);
  }

  renderBannerStyle() {
    if (this.state.logo.id !== null) {
      return { backgroundImage: `url(data:image/jpg;base64,${this.state.logo.image64})` };
    }
    return { background: "gray" };
  }

  render() {
    return (
      <div className="col-lg-4 col-sm-6 portfolio-item">
        <a className="card" href={this.props.id} style={{marginBottom: '25px'}}>
          <div className="logo__icon" style={this.renderBannerStyle()}/>
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
