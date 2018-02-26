import React from 'react';

class EpisodeDetail extends React.Component {

  constructor() {
    super();
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
    this.state = {
      episode: {},
      episodeTemp: {},
      status: null
    }
  }

  componentDidMount() {
    $('#editModal').on('hidden.bs.modal', () => this.onCloseModal());
    fetch('/api/episodes/' + this.props.match.params.id)
      .then(response => response.json())
      .then(episode => {
        this.setState({ episode: episode, episodeTemp: episode });
      });
  }

  onCloseModal() {
    this.setState({ status: null, episodeTemp: this.state.episode });
  }

  handleSubmit() {
    const episodeTemp = {
      name: this.state.episodeTemp.name,
      code: this.state.episodeTemp.code,
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
      })
      .catch(() => this.setState({ status: 'error' }));
  }

  onNameChange(event) {
    let episodeTemp = Object.assign({}, this.state.episodeTemp);
    episodeTemp.name = event.target.value;
    this.setState({ episodeTemp });
  }

  onCodeChange(event) {
    let episodeTemp = Object.assign({}, this.state.episodeTemp);
    episodeTemp.code = event.target.value;
    this.setState({ episodeTemp });
  }

  onScoreChange(event) {
    let episodeTemp = Object.assign({}, this.state.episodeTemp);
    episodeTemp.score = Number(event.target.value);
    this.setState({ episodeTemp });
  }

  render() {
    return (
      <div>
        {this.state.episode.id !== null
          ?
          <div>
            <h1>{this.state.episode.name} - {this.state.episode.code}</h1>
            <h5>Note : {this.state.episode.score}/10</h5>
            <button
              type="button"
              className="btn btn-outline-primary"
              data-toggle="modal"
              data-target="#editModal"
            >
              Editer cet épisode
            </button>

            <div
              className="modal fade"
              id="editModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Editer l'épisode
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>

                      <div className="form-group">
                        <label>Série</label>
                        <input type="text" className="form-control" value={this.state.episodeTemp.name} onChange={this.onNameChange}/>
                      </div>

                      <div className="form-group">
                        <label>Code</label>
                        <input type="text" className="form-control" value={this.state.episodeTemp.code} onChange={this.onCodeChange}/>
                      </div>

                      <div className="form-group">
                        <label>Note</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="10"
                          step="0.1"
                          value={this.state.episodeTemp.score}
                          onChange={this.onScoreChange}
                        />
                      </div>

                    </form>
                  </div>

                  {this.state.status === 'error' &&
                  <div className="alert alert-danger" role="alert">
                    Une erreur s'est produite !
                  </div>}

                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">
                      Annuler
                    </button>
                    <button type="button" className="btn btn-outline-success" onClick={this.handleSubmit}>
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
