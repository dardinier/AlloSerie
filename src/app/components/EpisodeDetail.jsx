import React from 'react';
import EditModal from './EditModal';
import {Link} from 'react-router-dom';
import LogoModal from "./LogoModal";
import {toast} from "react-toastify";

class EpisodeDetail extends React.Component {

  constructor() {
    super();
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.deleteEpisode = this.deleteEpisode.bind(this);
    this.setLogo = this.setLogo.bind(this);
    this.state = {
      episode: {},
      episodeTemp: {},
      logo: {},
      status: null,
      logoStatus: "pending"
    }
  }

  componentDidMount() {
    $('#editModal').on('hidden.bs.modal', () => this.onCloseModal());
    fetch('/api/episodes/' + this.props.match.params.id)
      .then(response => response.json())
      .then(episode => {
        this.setState({episode: episode, episodeTemp: episode});
        this.loadLogo(episode.logo);
      });
  }

  loadLogo(logo) {
    fetch('/api/logos/' + logo)
      .then(response => response.json())
      .then(logo => this.setState({logo, logoStatus: "done"}))
      .catch(() => this.setState({logoStatus: "fail"}));
  }

  onCloseModal() {
    this.setState({status: null, episodeTemp: this.state.episode});
  }

  handleSubmit() {
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
      const episodeTemp = {
        name: this.state.episodeTemp.name,
        code: this.state.episodeTemp.code,
        logo: this.state.episodeTemp.logo,
        synopsis: this.state.episodeTemp.synopsis,
        score: Number(this.state.episodeTemp.score)
      };
      fetch('/api/episodes/' + this.state.episodeTemp.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(episodeTemp)
      })
        .then(response => response.json())
        .then(episode => {
          if (this.state.episode.logo !== episode.logo) {
            this.loadLogo(episode.logo);
          }
          this.setState({episode: episode, episodeTemp: episode});
          $('#editModal').modal('hide');
        });
    }
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

  deleteEpisode() {
    fetch('/api/episodes/' + this.state.episode.id, {method: 'DELETE'});
  }

  setLogo(logo) {
    this.setState(prevState => ({episodeTemp: {...prevState.episodeTemp, logo}}));
  }

  renderBannerStyle() {
    switch (this.state.logoStatus) {
      case "pending":
        return {backgroundImage: "linear-gradient(135deg, #fee140 0%, #fa709a 100%)"};
      case "done":
        return {backgroundImage: `url(${this.state.logo.image64})`};
      case "fail":
        return {backgroundImage: "url(\"assets/images/no-display.jpg\")"};
    }
  }

  render() {
    return (
      <div>
        {this.state.episode.id !== null
          ?
          <div>
            <div className="card">
              <div>
                <div className="logo__banner" style={this.renderBannerStyle()}>
                  <h1>{this.state.episode.name} - {this.state.episode.code}</h1>
                  <h5>Note : {this.state.episode.score}/10</h5>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <ul className="nav justify-content-center">
                    <li className="nav-item tool-button">
                      <button type="button" className="btn btn-outline-primary" data-toggle="modal"
                              data-target="#editModal">
                        Editer cet épisode
                      </button>
                    </li>
                    <li className="nav-item tool-button">
                      <Link to='/' onClick={this.deleteEpisode}>
                        <button type="button" className="btn btn-outline-danger">
                          Supprimer cet épisode
                        </button>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="list-group-item">
                  <div>
                    <h4>Résumé :</h4>
                    <p>{this.state.episode.synopsis}</p>
                  </div>
                </li>
              </ul>
            </div>
            <EditModal
              name={this.state.episodeTemp.name}
              code={this.state.episodeTemp.code}
              logo={this.state.episodeTemp.logo}
              synopsis={this.state.episodeTemp.synopsis}
              score={this.state.episodeTemp.score}
              handleFormChange={this.handleFormChange}
              status={this.state.status}
              handleSubmit={this.handleSubmit}/>
            <LogoModal setLogo={this.setLogo}/>
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
