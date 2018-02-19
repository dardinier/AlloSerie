import React from 'react';
import EpisodeItem from './EpisodeItem';

const EpisodesList = ({ episodes, deleteEpisode }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Série</th>
          <th>Code</th>
          <th>Note</th>

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
            score={episode.score}
            deleteEpisode={deleteEpisode}
          />
        )
      })}
      </tbody>
    </table>
  );
};

export default EpisodesList;
