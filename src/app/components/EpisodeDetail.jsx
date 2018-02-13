import React from 'react';

const EpisodeDetail = ({ match }) => {
  return (
    <div>Salut {match.params.id}</div>
  );
};

export default EpisodeDetail;
