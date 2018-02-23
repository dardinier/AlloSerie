import React from 'react';

const EpisodeDetail = ({match}) => {
  return (
    <div className="container">
      Salut {match.params.id}
    </div>
  );
};

export default EpisodeDetail;
