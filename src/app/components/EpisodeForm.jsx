import React from 'react';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const EpisodeForm = ({ name, code, synopsis, score, handleFormChange }) => {
  return (
    <div>
      <div className="form-group">
        <label>Série</label>
        <input type="text" name="name" className="form-control" value={name} onChange={handleFormChange}/>
      </div>

      <div className="form-group">
        <label>Code</label>
        <input type="text" name="code" className="form-control" value={code} onChange={handleFormChange}/>
      </div>

      <div className="form-group">
        <label>Synopsis</label>
        <textarea name="synopsis" className="form-control" value={synopsis} rows="5" onChange={handleFormChange}/>
      </div>

      <div className="form-group">
        <label>Note</label>

        <div className="row">
          <div className="col-6">
            <MuiThemeProvider>
              <Slider min={0} max={10} step={0.1} value={score} onChange={handleFormChange} sliderStyle={{'margin':'10px 0px'}}/>
            </MuiThemeProvider>
          </div>
          <div className="col-6">
            <input type="number" className="form-control" name="score" min="0" max="10" step="0.1" value={score} onChange={handleFormChange}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeForm;
