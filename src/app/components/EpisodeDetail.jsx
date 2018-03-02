import React from 'react';
import EditModal from './EditModal';
import { Link } from 'react-router-dom';

class EpisodeDetail extends React.Component {

  constructor() {
    super();
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.deleteEpisode = this.deleteEpisode.bind(this);
    this.state = {
      episode: {},
      episodeTemp: {},
      logo: {},
      status: null,
      iconStatus: "pending"
    }
  }

  componentDidMount() {
    $('#editModal').on('hidden.bs.modal', () => this.onCloseModal());
    fetch('/api/episodes/' + this.props.match.params.id)
      .then(response => response.json())
      .then(episode => {
        this.setState({ episode: episode, episodeTemp: episode });
        fetch('/api/logos/' + episode.logo)
          .then(response => response.json())
          .then(logo => this.setState({ logo, iconStatus: "done" }))
          .catch(() => this.setState({ iconStatus: "fail" }));
      });
  }

  onCloseModal() {
    this.setState({ status: null, episodeTemp: this.state.episode });
  }

  handleSubmit() {
    if (!isNaN(parseFloat(this.state.episodeTemp.score))) {
      const episodeTemp = {
        name: this.state.episodeTemp.name,
        code: this.state.episodeTemp.code,
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
          this.setState({ episode: episode, episodeTemp: episode });
          $('#editModal').modal('hide');
        });
    } else {
      this.setState({status: 'error'});
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
    fetch('/api/episodes/' + this.state.episode.id, { method: 'DELETE' });
  }

  renderBannerStyle() {
    switch(this.state.iconStatus) {
      case "pending":
        return { backgroundImage: "linear-gradient(135deg, #fee140 0%, #fa709a 100%)" };
      case "done":
        return { backgroundImage: `url(data:image/jpg;base64,${this.state.logo.image64})` };
      case "fail":
        return { backgroundImage: "url(\"assets/images/no-display.jpg\")" };
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
                      <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#editModal">
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
              synopsis={this.state.episodeTemp.synopsis}
              score={this.state.episodeTemp.score}
              handleFormChange={this.handleFormChange}
              status={this.state.status}
              handleSubmit={this.handleSubmit}/>
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
