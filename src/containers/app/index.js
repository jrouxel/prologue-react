import React from 'react';
import { connect } from 'react-redux';
import { setTempTranscript, setFinalTranscript, setMicPermission, setRecordButtonState } from '../../redux/actions';
import LanguageSelection from '../../components/languageSelection';
import BotResponseArea from '../../components/botResponseArea';
import AudioPlayer from '../../components/audioPlayer';
import Carousel from '../../components/carousel';
import { startSpeechRecognition, stopSpeechRecognition, cancelSpeechRecognition } from '../../utils/speechToText';
import RecordButton from '../../components/recordButton';
import SpeechArea from '../../components/speechArea';

const App = (props) => {
    // Redux store state is now available as props
    const { tempTranscript, finalTranscript, micPermission, recordButtonState } = props;

    return (
        <div>
            <LanguageSelection />
            <BotResponseArea />
            <AudioPlayer />
            <Carousel />
            <RecordButton 
                micPermission={micPermission}
                onStart={startSpeechRecognition(setTempTranscript, setFinalTranscript, setRecordButtonState)} 
                onStop={stopSpeechRecognition(setRecordButtonState)}
                onCancel={() => {
                    setRecordButtonState(RecordButtonStates.READY_TO_RECORD);
                    setFinalTranscript('');
                    setTempTranscript('');
                    cancelSpeechRecognition();
                }}
                recordButtonState={recordButtonState}
            />
            <SpeechArea />
        </div>
    );
};

const mapStateToProps = state => ({
    tempTranscript: state.bot.tempTranscript,
    finalTranscript: state.bot.finalTranscript,
    micPermission: state.bot.micPermission,
    recordButtonState: state.bot.recordButtonState
});

const mapDispatchToProps = {
    setTempTranscript,
    setFinalTranscript,
    setMicPermission,
    setRecordButtonState
};

export default connect(mapStateToProps, mapDispatchToProps)(App);