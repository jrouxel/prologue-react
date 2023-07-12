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
            <div //Header Area
            style={{position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)'}} >
                <Header />
            </div>     
            <div //Bot Response Area
            style={{position: 'fixed', top: '15%', left: '50%', transform: 'translateX(-50%)'}} >
                <BotResponseArea />
            </div>            
            <div //Carousel Area
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Adjust this value as required
            }}>
                <div style={{
                    width: '300px',
                    height: '150px',
                    background: '#f9f9f9',  // or any color that you want for the background
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Carousel />
                </div>
            </div>
            <div //Shader Area
            style={{position: 'fixed', bottom: '20%', top:'20%', left: '0%', right:'0%'}} >
                <div style={{
                    top: '20%',
                    bottom: '20%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                   <ShaderArea/>
                </div>
                
            </div>
            <div //Speech Area
            style={{position: 'fixed', bottom: '25%', left: '50%', transform: 'translateX(-50%)'}} >
                <SpeechArea />
            </div>
            <div //Record Area
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
            <div //Footer Area
            style={{position: 'fixed', bottom: '0%', top:'90%', left: '0%', right:'0%'}} >
                <Footer/>
            </div>
        </div>
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