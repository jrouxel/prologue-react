import React, { useState } from 'react';
import LanguageSelection from './components/LanguageSelection';
import BotResponseArea from './components/BotResponseArea';
import AudioPlayer from './components/AudioPlayer';
import Carousel from './components/Carousel';
import RecordButton from './components/RecordButton';
import SpeechArea from './components/SpeechArea';
import * as AzureSpeechToText from './components/AzureSpeechToText';

const App = () => {
    const [tempTranscript, setTempTranscript] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');

    return (
        <div>
            <LanguageSelection />
            <BotResponseArea />
            <AudioPlayer />
            <Carousel />
            <RecordButton 
                onStart={() => {
                    setFinalTranscript('');
                    setTempTranscript('');
                    AzureSpeechToText.startSpeechRecognition(setTempTranscript, setFinalTranscript)();
                }} 
                onStop={AzureSpeechToText.stopSpeechRecognition} 
            />
            <SpeechArea tempTranscript={tempTranscript} finalTranscript={finalTranscript} />
        </div>
    );
};

export default App;