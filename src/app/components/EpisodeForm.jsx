import React from 'react';

class EpisodeForm extends React.Component {

  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.setNameInputRef = this.setNameInputRef.bind(this);
    this.setCodeInputRef = this.setCodeInputRef.bind(this);
    this.setScoreInputRef = this.setScoreInputRef.bind(this);
  }

  submitForm() {
    this.props.submitForm(this.nameInputRef.value, this.codeInputRef.value, this.scoreInputRef.value);
    this.nameInputRef.value = '';
    this.codeInputRef.value = '';
    this.scoreInputRef.value = '';
  }

  setNameInputRef(element) {
    this.nameInputRef = element;
  }

  setCodeInputRef(element) {
    this.codeInputRef = element;
  }

  setScoreInputRef(element) {
    this.scoreInputRef = element;
  }

  render() {
    return (
      <div>
        <h4>Ajouter un épisode :</h4>
        <hr/>
        <div className="form-group">
          <label>Série</label>
          <input type="text" className="form-control" ref={this.setNameInputRef}/>
        </div>
        <div className="form-group">
          <label>Code</label>
          <input type="text" className="form-control" ref={this.setCodeInputRef}/>
        </div>
        <div className="form-group">
          <label>Note</label>
          <input type="number" className="form-control" min="0" max="10" step="0.1" ref={this.setScoreInputRef}/>
        </div>
        <hr/>
        <div className="form-group">
          <button type="submit" className="btn btn-block btn-outline-success" onClick={this.submitForm}>Ajouter cet épisode</button>
        </div>
      </div>
    );
  }
}

export default EpisodeForm;
