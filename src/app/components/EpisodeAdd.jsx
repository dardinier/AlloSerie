import React from 'react';
import EpisodeForm from "./EpisodeForm";
import LogoModal from "./LogoModal";
import {toast} from "react-toastify";

class EpisodeAdd extends React.Component {

  constructor() {
    super();
    this.handleFormChange = this.handleFormChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.setLogo = this.setLogo.bind(this);
    this.state = {
      episodeTemp: {
        name: '',
        code: '',
        logo: undefined,
        synopsis: '',
        score: 0
      }
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
    let hasError = false;
    if (this.state.episodeTemp.name === "") {
      toast.error("Le nom est vide.");
      hasError = true;
    }
    if (this.state.episodeTemp.logo === undefined) {
      toast.error("Aucun logo n'a été défini.");
      hasError = true;
    }
    if (this.state.episodeTemp.code === "") {
      toast.error("Le code est vide.");
      hasError = true;
    }
    if (this.state.episodeTemp.synopsis === "") {
      toast.error("Le synopsis est vide.");
      hasError = true;
    }

    if (!hasError) {
      this.props.submitForm(this.state.episodeTemp.name, this.state.episodeTemp.code, this.state.episodeTemp.logo, this.state.episodeTemp.synopsis, this.state.episodeTemp.score);
      this.setState({ episodeTemp: { name: '', code: '', logo: undefined, synopsis: '', score: undefined } });
    }
  }

  setLogo(logo) {
    this.setState(prevState => ({ episodeTemp : { ...prevState.episodeTemp, logo }}));
  }

  render() {
    return (
      <div>
        <h4>Ajouter un épisode :</h4>
        <hr/>
        <EpisodeForm
          name={this.state.episodeTemp.name}
          code={this.state.episodeTemp.code}
          logo={this.state.episodeTemp.logo}
          synopsis={this.state.episodeTemp.synopsis}
          score={this.state.episodeTemp.score}
          handleFormChange={this.handleFormChange}/>
        <div className="form-group">
          <button type="submit" className="btn btn-block btn-outline-success" onClick={this.submitForm}>Ajouter cet épisode</button>
        </div>
        <LogoModal setLogo={this.setLogo}/>
      </div>
    );
  }
}

export default EpisodeAdd;
