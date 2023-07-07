import React, { useEffect, useState } from 'react'; // <--- Added useState import
import { connect } from 'react-redux';
import { setMicPermission, setRecordButtonState } from '../../redux/actions';
import { RecordButtonStates } from './constants.js';
import { buttonStyles, disabledButtonStyles } from './styles.js';
import store from '../../redux/store';

const RecordButton = ({ 
    micPermission, 
    setMicPermission,
    onStart, // changed
    onStop, // changed
    onCancel // changed
}) => {
    const [isLoading, setIsLoading] = useState(false); // <--- Added useState for isLoading

    useEffect(() => {
        navigator.permissions.query({name: 'microphone'}).then(result => {
            setMicPermission(result.state === 'granted');
            if(result.state === 'granted'){
                store.dispatch(setRecordButtonState(RecordButtonStates.READY_TO_RECORD));
            }
        });
    }, [setMicPermission]);

    const requestMicPermission = async () => {
        try {
            setIsLoading(true);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            setMicPermission(true);
            store.dispatch(setRecordButtonState(RecordButtonStates.READY_TO_RECORD));
            setIsLoading(false);
        } catch (err) {
            alert('User needs to approve mic permission.');
            console.log(err);
            setMicPermission(false);
            setIsLoading(false); 
        }
    };

    const handleRecordButtonClick = () => {
        if (!micPermission) return requestMicPermission();
        else if(store.getState().bot.recordButtonState === RecordButtonStates.READY_TO_RECORD && !isLoading) return onStart();
    };

    const handleRecordButtonRelease = () => {
        if (store.getState().bot.recordButtonState === RecordButtonStates.RECORDING && !isLoading) onStop(); 
        else if (store.getState().bot.recordButtonState === RecordButtonStates.PROCESSING){
            store.dispatch(setRecordButtonState(RecordButtonStates.RELEASED));
        }
    };

    return (
        <div>
            <button 
                style={store.getState().bot.recordButtonState !== RecordButtonStates.READY_TO_SEND ? disabledButtonStyles : buttonStyles} 
                disabled={store.getState().bot.recordButtonState !== RecordButtonStates.READY_TO_SEND} 
                onClick={onCancel}>
                Cancel
            </button>
            <button 
                style={buttonStyles} 
                onMouseDown={handleRecordButtonClick} 
                onMouseUp={handleRecordButtonRelease}>
                { micPermission ? (isLoading ? 'Loading...' : store.getState().bot.recordButtonState) : RecordButtonStates.REQUIRED }
            </button>
            <button 
                style={store.getState().bot.recordButtonState !== RecordButtonStates.READY_TO_SEND ? disabledButtonStyles : buttonStyles} 
                disabled={store.getState().bot.recordButtonState !== RecordButtonStates.READY_TO_SEND}>
                Send
            </button>
            <button className="mainpage-record-button">
                <img
                    src="/external/send8632-4698.svg"
                    alt="send8632"
                    className="mainpage-send"
                />
                <img
                    src="/external/mic8632-14b.svg"
                    alt="mic8632"
                    className="mainpage-mic"
                />
                <img
                    src="/external/cancel8632-zgrb.svg"
                    alt="cancel8632"
                    className="mainpage-cancel"
                />
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