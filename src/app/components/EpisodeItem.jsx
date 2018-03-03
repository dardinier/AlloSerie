import React from 'react';

class EpisodeItem extends React.Component {

  constructor() {
    super();
    this.deleteEpisode = this.deleteEpisode.bind(this);
    this.state = {
      logo: {},
      iconStatus: "pending"
    };
  }

  componentDidMount() {
    fetch('/api/logos/' + this.props.logo)
      .then(response => response.json())
      .then(logo => this.setState({ logo, iconStatus: "done" }))
      .catch(() => this.setState({iconStatus: "fail"}));
  }

  deleteEpisode() {
    this.props.deleteEpisode(this.props.id);
  }

  renderBannerStyle() {
    const defaultStyle = {
      height: "150px"
    };
    switch(this.state.iconStatus) {
      case "pending":
        return {
          ...defaultStyle,
          backgroundImage: "linear-gradient(135deg, #fee140 0%, #fa709a 100%)"
        };
      case "done":
        return {
          ...defaultStyle,
          backgroundImage: `url(data:image/jpg;base64,${this.state.logo.image64})`
        };
      case "fail":
        return {
          ...defaultStyle,
          backgroundImage: "url(\"assets/images/no-display.jpg\")"
        };
    }
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
