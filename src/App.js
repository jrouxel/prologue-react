import React, { Component } from 'react';
import LanguageSelection from './components/LanguageSelection';
import Carousel from './components/Carousel';
import RecordButton from './components/RecordButton';
import SpeechArea from './components/SpeechArea';
import BotResponseArea from './components/BotResponseArea';
import AudioPlayer from './components/AudioPlayer';

class App extends Component {
  render() {
    return (
      <div>
        <LanguageSelection />
        <BotResponseArea />
        <AudioPlayer />
        <Carousel />
        <SpeechArea />
        <RecordButton />
      </div>
    );
  }
}

export default App;