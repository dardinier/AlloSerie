import React from "react";
import EpisodeForm from "./EpisodeForm";

const EditModal = ({name, code, synopsis, score, handleFormChange, status, handleSubmit}) => {
  return (
    <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-hidden="true">
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
            <EpisodeForm name={name} code={code} synopsis={synopsis} score={score} handleFormChange={handleFormChange} />
          </div>

          {status === 'error' &&
          <div className="alert alert-danger" role="alert">
            Une erreur s'est produite !
          </div>}

          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">
              Annuler
            </button>
            <button type="button" className="btn btn-outline-success" onClick={handleSubmit}>
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
