import React from 'react';
import EpisodeForm from "./EpisodeForm";

class EpisodeAdd extends React.Component {

  constructor() {
    super();
    this.handleFormChange = this.handleFormChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      episodeTemp: {}
    };
  }

  handleFormChange(event, score) {
    if (score !== undefined) {
      this.setState(prevState => ({
        episodeTemp: {
          ...prevState.episodeTemp,
          score
        }
      }));
    } else {
      const {name, value} = event.target;
      if (name === 'score') {
        this.setState(prevState => ({
          episodeTemp: {
            ...prevState.episodeTemp,
            [name]: Number(value)
          }
        }));
      } else {
        this.setState(prevState => ({
          episodeTemp: {
            ...prevState.episodeTemp,
            [name]: value
          }
        }));
      }
    }
  }

  submitForm() {
    this.props.submitForm(this.state.episodeTemp.name, this.state.episodeTemp.code, this.state.episodeTemp.score);
    this.setState({ episodeTemp: { name: '', code: '', score: '' } });
  }

  render() {
    return (
      <div>
        <h4>Ajouter un épisode :</h4>
        <hr/>
        <EpisodeForm name={this.state.episodeTemp.name} code={this.state.episodeTemp.code} score={this.state.episodeTemp.score} handleFormChange={this.handleFormChange}/>
        <div className="form-group">
          <button type="submit" className="btn btn-block btn-outline-success" onClick={this.submitForm}>Ajouter cet épisode</button>
        </div>
      </div>
    );
  }
}

export default EpisodeAdd;
