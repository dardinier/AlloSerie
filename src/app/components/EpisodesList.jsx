import React from 'react';
import EpisodeItem from './EpisodeItem';

const EpisodesList = ({ episodes, deleteEpisode }) => {
  return (
    <div>
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
    </div>
  );
};

export default EpisodesList;
