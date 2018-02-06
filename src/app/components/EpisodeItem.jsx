import React from 'react';

const EpisodeItem = ({ name, code, score }) => {
  return (
    <div>{name}, {code} : {score}</div>
  );
};

export default EpisodeItem;
