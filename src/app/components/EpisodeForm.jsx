import React from 'react';

const EpisodeForm = ({ name, code, score, handleFormChange }) => {
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
        <label>Note</label>
        <input type="number" className="form-control" name="score" min="0" max="10" step="0.1" value={score} onChange={handleFormChange}/>
      </div>
    </div>
  );
};

export default EpisodeForm;
