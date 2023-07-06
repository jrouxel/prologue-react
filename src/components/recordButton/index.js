import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setMicPermission, setRecordButtonState } from '../../redux/actions';
import { RecordButtonStates } from './constants.js';
import { buttonStyles, disabledButtonStyles } from './styles.js';

const RecordButton = ({ 
    micPermission, 
    recordButtonState, 
    startSpeechRecognition,
    stopSpeechRecognition,
    cancelSpeechRecognition
}) => {
    useEffect(() => {
        navigator.permissions.query({name: 'microphone'}).then(result => setMicPermission(result.state === 'granted'));
    }, []);

    const requestMicPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            setMicPermission(true);
            setRecordButtonState(RecordButtonStates.READY_TO_RECORD);
        } catch (err) {
            alert('User needs to approve mic permission.');
            console.log(err);
            setMicPermission(false);
        }
    };

    const handleRecordButtonClick = () => {
        if (!micPermission) return requestMicPermission();
        if (recordButtonState === RecordButtonStates.READY_TO_RECORD) startSpeechRecognition(setTempTranscript, setFinalTranscript, setRecordButtonState);
    };

    const handleRecordButtonRelease = () => {
        if (recordButtonState === RecordButtonStates.RECORDING) stopSpeechRecognition(setRecordButtonState);
    };

    return (
        <div>
            <button style={recordButtonState !== RecordButtonStates.READY_TO_SEND ? disabledButtonStyles : buttonStyles} 
                    disabled={recordButtonState !== RecordButtonStates.READY_TO_SEND} 
                    onClick={cancelSpeechRecognition}>
                Cancel
            </button>
            <button style={buttonStyles} 
                    onMouseDown={handleRecordButtonClick} 
                    onMouseUp={handleRecordButtonRelease}>
                {micPermission ? recordButtonState : RecordButtonStates.REQUIRED}
            </button>
            <button style={recordButtonState !== RecordButtonStates.READY_TO_SEND ? disabledButtonStyles : buttonStyles} 
                    disabled={recordButtonState !== RecordButtonStates.READY_TO_SEND}>
                Send
            </button>
        </div>
    );
};

const mapStateToProps = state => ({
    micPermission: state.bot.micPermission,
    recordButtonState: state.bot.recordButtonState
});

const mapDispatchToProps = {
    setMicPermission,
    setRecordButtonState
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordButton);