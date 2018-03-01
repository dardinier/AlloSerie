import React from 'react';
import EpisodeItem from './EpisodeItem';

const EpisodesList = ({ episodes, deleteEpisode }) => {
  return (
    <div>
      <h4>Liste des épisodes :</h4>
      <hr/>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Série</th>
            <th>Code</th>
            <th>Note</th>
            <th/>
            <th/>
          </tr>
        </thead>
        <tbody>
        {episodes.map((episode) => {
          return (
            <EpisodeItem
              key={episode.id}
              id={episode.id}
              name={episode.name}
              code={episode.code}
              logo={episode.logo}
              score={episode.score}
              deleteEpisode={deleteEpisode}
            />
          )
        })}
        </tbody>
      </table>
    </div>
    );
};

export default EpisodesList;
