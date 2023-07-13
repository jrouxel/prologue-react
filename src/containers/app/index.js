import React from 'react';
import { connect } from 'react-redux';
import { setTempTranscript, setFinalTranscript, setMicPermission, setRecordButtonState, setCarouselState } from '../../redux/actions';
//import LanguageSelection from '../../components/languageSelection';
import ShaderArea from '../../components/shaderArea';
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
    setCarouselState
}) => {

    return (

        <div className="main-page">
        <div //Shader Area
        style={{display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center'}}>
            <div 
            style={{position:'relative', width: '400px', height: '200px'}}>
                <ShaderArea/>
            </div>
        </div>
        <div>  HELLO </div>
        </div>   
        //this doesn't work

    );
};

const mapStateToProps = state => ({
    tempTranscript: state.bot.tempTranscript,
    finalTranscript: state.bot.finalTranscript,
    micPermission: state.bot.micPermission,
    recordButtonState: state.bot.recordButtonState,
    carouselState: state.bot.carouselState
});

const mapDispatchToProps = {
    setTempTranscript,
    setFinalTranscript,
    setMicPermission,
    setRecordButtonState,
    setCarouselState
};

export default connect(mapStateToProps, mapDispatchToProps)(App);