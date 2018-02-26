import React from 'react';

class EpisodeDetail extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
    this.state = {
      id: null,
      name: null,
      code: null,
      score: null,
      nameTemp: null,
      codeTemp: null,
      scoreTemp: null,
    }
  }

  componentDidMount() {
    fetch('/api/episodes/' + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        this.setState({
          id: data.id,
          name: data.name,
          code: data.code,
          score: data.score,
          nameTemp: data.name,
          codeTemp: data.code,
          scoreTemp: data.score
        });
      });
  }

  handleSubmit() {
    const newEpisode = {
      name: this.state.nameTemp,
      code: this.state.codeTemp,
      score: this.state.scoreTemp
    };

    fetch('/api/episodes/' + this.state.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEpisode)
    })
      .then(response => response.json())
      .then(episode => {
        this.setState({
          id: episode.id,
          name: episode.name,
          code: episode.code,
          score: episode.score,
          nameTemp: episode.name,
          codeTemp: episode.code,
          scoreTemp: episode.score
        });
        $('#editModal').modal('hide');
      })
      .catch(() => this.setState({ status: 'error' }));
  }

  onNameChange(event) {
    this.setState({ nameTemp: event.target.value });
  }

  onCodeChange(event) {
    this.setState({ codeTemp: event.target.value });
  }

  onScoreChange(event) {
    this.setState({ scoreTemp: event.target.value });
  }

  render() {
    return (
      <div>
        {this.state.id !== null
          ?
          <div>
            <h1>{this.state.name} - {this.state.code}</h1>
            <h5>Note : {this.state.score}/10</h5>
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
                        <input type="text" className="form-control" value={this.state.nameTemp} onChange={this.onNameChange}/>
                      </div>

                      <div className="form-group">
                        <label>Code</label>
                        <input type="text" className="form-control" value={this.state.codeTemp} onChange={this.onCodeChange}/>
                      </div>

                      <div className="form-group">
                        <label>Note</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="10"
                          step="0.1"
                          value={this.state.scoreTemp}
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
