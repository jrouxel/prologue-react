import React from 'react';

const SpeechArea = ({ finalTranscript, tempTranscript }) => {
  return (
    <div>{finalTranscript} {tempTranscript}</div>
  );
};

export default SpeechArea;