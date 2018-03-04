import React from 'react';
import EpisodeItem from './EpisodeItem';

const EpisodesList = ({ episodes }) => {

  console.log(episodes.length);
  return (
    <div>
      <h4>Liste des épisodes :</h4>
      <hr/>
      <div>
        {episodes.length !== 0 ?
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
        :
        <div>
          Aucun épisode ...
        </div>}
      </div>
    </div>
  );
};

export default EpisodesList;
