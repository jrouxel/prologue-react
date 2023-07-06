import React from 'react';
import { connect } from 'react-redux';

const SpeechArea = ({ finalTranscript, tempTranscript }) => {
  return (
    <div>{finalTranscript} {tempTranscript}</div>
  );
};

const mapStateToProps = ({ bot }) => ({
  finalTranscript: bot.finalTranscript,
  tempTranscript: bot.tempTranscript
})

export default connect(mapStateToProps)(SpeechArea);