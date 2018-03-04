import React from 'react';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class EpisodeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actualLogo: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logo !== this.props.logo && nextProps.logo !== undefined) {
      fetch('/api/logos/' + nextProps.logo)
        .then(response => response.json())
        .then(logo => this.setState({ actualLogo: logo }));
    }
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Série</label>
          <input type="text" name="name" className="form-control" value={this.props.name} onChange={this.props.handleFormChange}/>
        </div>

        <div className="form-group">
          <label>Logo</label>
          {
            this.props.logo === undefined ?
              <button type="button" className="form-control btn btn-outline-primary" data-toggle="modal" data-target="#logoModal">
                Choisir un logo
              </button>
              :
              <div>
                <div className="logo__icon" style={{
                  height: "100px",
                  marginBottom: "0.5rem",
                  borderRadius: "0.25rem",
                  backgroundImage: `url(${this.state.actualLogo.image64})`}}/>
                  <button type="button" className="form-control btn btn-outline-secondary" data-toggle="modal" data-target="#logoModal">
                    Changer le logo actuel
                  </button>
              </div>
          }
        </div>

        <div className="form-group">
          <label>Code</label>
          <input type="text" name="code" className="form-control" value={this.props.code} onChange={this.props.handleFormChange}/>
        </div>

        <div className="form-group">
          <label>Synopsis</label>
          <textarea name="synopsis" className="form-control" value={this.props.synopsis} rows="5" onChange={this.props.handleFormChange}/>
        </div>

        <div className="form-group">
          <label>Note</label>

          <div className="row">
            <div className="col-6">
              <MuiThemeProvider>
                <Slider min={0} max={10} step={0.1} value={this.props.score} onChange={this.props.handleFormChange}
                        sliderStyle={{'margin': '10px 0px'}}/>
              </MuiThemeProvider>
            </div>
            <div className="col-6">
              <input type="number" className="form-control" name="score" min="0" max="10" step="0.1" value={this.props.score}
                     onChange={this.props.handleFormChange}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EpisodeForm;
