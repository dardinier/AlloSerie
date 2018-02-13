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
        <div>
          <label>Série :</label>
          <input type="text" ref={this.setNameInputRef}/>
        </div>
        <div>
          <label>Code :</label>
          <input type="text" ref={this.setCodeInputRef}/>
        </div>
        <div>
          <label>Note :</label>
          <input type="number" min="0" max="10" step="0.1" ref={this.setScoreInputRef}/>
        </div>
        <div>
          <button type="submit" onClick={this.submitForm}>Ajouter cet épisode</button>
        </div>
      </div>
    );
  }
}

export default EpisodeForm;
