import React from 'react';
import { connect } from 'react-redux';
import { setTempTranscript, setFinalTranscript, setMicPermission, setRecordButtonState } from '../../redux/actions';
import LanguageSelection from '../../components/languageSelection';
import BotResponseArea from '../../components/botResponseArea';
import Carousel from '../../components/carousel';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { startSpeechRecognition, stopSpeechRecognition, cancelSpeechRecognition } from '../../utils/speechToText';
import RecordArea from '../../components/recordArea';
import SpeechArea from '../../components/speechArea';
import { RecordButtonStates } from '../../components/recordArea/constants';
import store from '../../redux/store';
import './styles.css';

const App = ({
    micPermission, 
    recordButtonState, 
    setTempTranscript, 
    setFinalTranscript, 
    setRecordButtonState,
}) => {

    return (
        <div class="main-page">
            <div //Bot Response Area
            style={{position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)'}} >
                <Header />
            </div>     
            <div //Bot Response Area
            style={{position: 'fixed', top: '15%', left: '50%', transform: 'translateX(-50%)'}} >
                <BotResponseArea />
            </div>            
            <div //Record button 
            style={{position: 'fixed', bottom: '40%', left: '50%', transform: 'translateX(-50%)'}} >
                <Carousel />
            </div>
            <div //Speech Area
            style={{position: 'fixed', bottom: '25%', left: '50%', transform: 'translateX(-50%)'}} >
                <SpeechArea />
            </div>
            <div //Record button 
            style={{position: 'fixed', bottom: '10%', left: '50%', transform: 'translateX(-50%)'}} >
                <RecordArea 
                        //anchor to the center bottom of the screen
                        micPermission={micPermission}
                        onStart={() => startSpeechRecognition()(store.dispatch, store.getState)}
                        onStop={() => stopSpeechRecognition(setRecordButtonState)}
                        onCancel={() => {
                            setRecordButtonState(RecordButtonStates.READY_TO_RECORD);
                            setFinalTranscript('');
                            setTempTranscript('');
                            cancelSpeechRecognition();
                        }}
                        recordButtonState={recordButtonState}
                /> 
            </div>
            <div //Record button 
            style={{position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)'}} >
                <Footer />
                <LanguageSelection />
            </div>
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