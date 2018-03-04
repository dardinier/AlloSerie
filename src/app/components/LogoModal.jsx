import React from "react";

class LogoModal extends React.Component {

  constructor() {
    super();
    this.selectLogo = this.selectLogo.bind(this);
    this.submitLogo = this.submitLogo.bind(this);
    this.state = {
      logos: [],
      selectedLogo: {},
      logosStatus: 'pending'
    }
  }

  componentDidMount() {
    $('#logoModal').on('hidden.bs.modal', () => this.onCloseModal());
    fetch('/api/logos')
      .then(response => response.json())
      .then(logos => this.setState({ logos, logosStatus: 'done' }))
      .catch(() => this.setState({logosStatus: 'fail' }));
  }

  onCloseModal() {
    this.setState({ selectedLogo: {} });
  }

  selectLogo(selectedLogo) {
    this.setState({selectedLogo});
  }

  renderCardStyle(logo) {
    const defaultStyle = {
      marginBottom: '25px',
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: "0.25rem"
    };
    if (this.state.selectedLogo === logo) {
      return {
        ...defaultStyle,
        borderColor: "#007bff"
      }
    } else {
      return {
        ...defaultStyle,
        borderColor: "rgba(0, 0, 0, 0.125)"
      }
    }
  }

  renderLogos() {
    switch (this.state.logosStatus) {
      case 'done':
        return (
          <div className="row">
            {this.state.logos.map((logo) => {
              return (
                <div className="col-lg-6 col-sm-12 portfolio-item" key={logo.id}>
                  <a className="card" style={this.renderCardStyle(logo)} onClick={() => this.selectLogo(logo)}>
                    <div className="logo__icon" style={{ height: "200px", backgroundImage: `url(data:image/jpg;base64,${logo.image64})` }}/>
                  </a>
                </div>
              );
            })}
          </div>
        );
      case 'pending':
        return <div>Chargement des logos ...</div>;
      case 'fail':
        return <div>Erreur lors du chargement des logos</div>
    }
  }

  submitLogo() {
    this.props.setLogo(this.state.selectedLogo.id);
    $('#logoModal').modal('hide');
  }

  render() {
    return (
      <div className="modal fade" id="logoModal" tabIndex="-1" role="dialog" aria-labelledby="logoModal" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Choisir un logo
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <ul className="nav justify-content-center tool-bar">
                  <li className="nav-item tool-button">
                    <button type="button" className="btn btn-outline-success">
                      Ajouter un nouveau logo
                    </button>
                  </li>
                </ul>
                {this.renderLogos()}
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">
                Annuler
              </button>
              <button type="button" className="btn btn-outline-success" onClick={this.submitLogo}>
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogoModal;
