import React from 'react';
import EpisodeItem from './EpisodeItem';

const EpisodesList = ({ episodes }) => {
  return (
    <div>
      <h4>Liste des épisodes :</h4>
      <hr/>
      <div className="row">
        {episodes.map((episode) => {
          return (
            <EpisodeItem
              key={episode.id}
              id={episode.id}
              name={episode.name}
              code={episode.code}
              logo={episode.logo}
              score={episode.score}
            />
          )
        })}
      </div>
    </div>
  );
};

export default EpisodesList;
