import React, { useEffect, useState } from 'react'; // <--- Added useState import
import { connect } from 'react-redux';
import { setMicPermission, setRecordButtonState } from '../../redux/actions';
import { RecordButtonStates } from './constants.js';
import { buttonStyles, disabledButtonStyles, recordButtonStyles} from './styles.js';
import store from '../../redux/store';
import './styles.css';
import Lottie from "lottie-react";
import lottieRecording from "./img/lottieRecording.json";
import lottieElypsis from "./img/lottieElypsis.json";
import lottieMicPermission from "./img/micPermission.json";
import logo from './img/record-video-animation.gif'

const RecordArea = ({ 
    micPermission, 
    setMicPermission,
    onStart, // changed
    onStop, // changed
    onCancel // changed
}) => {
    const [isLoading, setIsLoading] = useState(false); // <--- Added useState for isLoading
    const [isCancelButtonPressed, setIsCancelButtonPressed] = useState(false);
    const [isRecordButtonPressed, setIsRecordButtonPressed] = useState(false);
    const [isSendButtonPressed, setIsSendButtonPressed] = useState(false);

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
    <div className="record-area">
        <button //Cancel Button        
        style={store.getState().bot.recordButtonState !== RecordButtonStates.READY_TO_SEND ? disabledButtonStyles : buttonStyles}  
        disabled={store.getState().bot.recordButtonState !== RecordButtonStates.READY_TO_SEND} 
        onClick={onCancel}  
        className={isCancelButtonPressed ? 'pressed' : ''}
        onMouseDown={() => setIsCancelButtonPressed(true)}
        onMouseUp={() => setIsCancelButtonPressed(false)}
        onMouseLeave={() => setIsCancelButtonPressed(false)}
        >
            <svg
            className="cancel"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <circle cx="15.5956" cy="15.778" r="15.0927" stroke="#4C4D58" />
            <path
                d="M10.6509 11.1117C10.502 10.9628 10.2606 10.9628 10.1117 11.1117C9.96277 11.2606 9.96277 11.502 10.1117 11.6509L14.6583 16.1976L10.1117 20.7442C9.96277 20.8931 9.96277 21.1345 10.1117 21.2834C10.2606 21.4323 10.502 21.4323 10.6509 21.2834L15.1976 16.7368L19.7442 21.2834C19.8931 21.4323 20.1345 21.4323 20.2834 21.2834C20.4323 21.1345 20.4323 20.8931 20.2834 20.7442L15.7368 16.1976L20.2834 11.6509C20.4323 11.502 20.4323 11.2606 20.2834 11.1117C20.1345 10.9628 19.8931 10.9628 19.7442 11.1117L15.1976 15.6583L10.6509 11.1117Z"
                fill="#414141"
                stroke="#414141"
                strokeWidth="0.649695"
                strokeLinecap="round"
            />
            </svg>
        </button>
        <button //Record Button
        style={buttonStyles} 
        className={isRecordButtonPressed ? 'pressed' : ''}
        onMouseDown={() => {
            setIsRecordButtonPressed(true)
            handleRecordButtonClick()
        }}
        onMouseUp={() => {
            setIsRecordButtonPressed(false)
            handleRecordButtonRelease()
        }}
        onMouseLeave={() => setIsRecordButtonPressed(false)}
        >
            <div //Microphone Permission State animation
                style={store.getState().bot.recordButtonState === RecordButtonStates.REQUIRED ? recordButtonStyles : disabledButtonStyles}
            >
                
                <img 
                src={logo} 
                alt="loading..." 
                className="mic"
                width="65"
                height="65"
                fill="none"
                />
                <Lottie 
                animationData={lottieMicPermission}
                style={{position: 'absolute', width: '35px', height: '35px', top: 20, left: 15}}        
                />
            </div>
            <div //Recording State animation
                style={store.getState().bot.recordButtonState === RecordButtonStates.RECORDING ? recordButtonStyles : disabledButtonStyles}
            > 
                <img 
                src={logo} 
                alt="loading..." 
                className='mic'
                style={{width: '110px', height: '110px', alignSelf: 'center', marginBottom: '-10px'}}
                />
                <img 
                src={logo} 
                alt="loading..." 
                className='mic'
                width="95"
                height="95"
                style={{position: 'absolute', top: -12, right: -16.5}}
                />
                <svg
                width="95"
                height="95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{position: 'absolute', top: -12, right: -16.5}}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M46.8672 36C43.2519 36 40.321 38.9308 40.321 42.5462V47.6896C40.321 51.3049 43.2519 54.2358 46.8672 54.2358C50.4826 54.2358 53.4134 51.3049 53.4134 47.6896V42.5462C53.4134 38.9308 50.4826 36 46.8672 36ZM44.2385 42.26C45.3621 41.8012 46.159 41.6051 46.9158 41.6111C47.6733 41.6171 48.4364 41.8258 49.4954 42.2598C49.7343 42.3578 50.0074 42.2435 50.1054 42.0045C50.2033 41.7656 50.089 41.4925 49.8501 41.3945C48.7509 40.944 47.8574 40.6834 46.9232 40.676C45.9884 40.6686 45.0589 40.9149 43.8849 41.3943C43.6459 41.4919 43.5312 41.7649 43.6288 42.004C43.7265 42.243 43.9994 42.3577 44.2385 42.26ZM45.1776 43.9126C45.918 43.6024 46.4257 43.4776 46.8983 43.4814C47.3715 43.4853 47.8572 43.6184 48.5563 43.9124C48.7944 44.0124 49.0685 43.9006 49.1686 43.6626C49.2687 43.4245 49.1568 43.1504 48.9188 43.0503C48.1792 42.7393 47.5604 42.5516 46.9059 42.5463C46.2507 42.5409 45.6074 42.7186 44.8162 43.0501C44.578 43.1499 44.4658 43.4238 44.5656 43.662C44.6654 43.9002 44.9394 44.0124 45.1776 43.9126Z"
                        fill="white"
                    />
                    <path
                        d="M56.6847 44.3665C56.6571 43.9802 56.3215 43.6893 55.9351 43.7169C55.5488 43.7445 55.2579 44.0801 55.2855 44.4665C55.5671 48.409 54.5367 51.2857 52.9311 53.1667C51.3224 55.0513 49.0942 55.9892 46.8672 55.9892C44.6402 55.9892 42.412 55.0513 40.8034 53.1667C39.1978 51.2857 38.1673 48.409 38.4489 44.4665C38.4765 44.0801 38.1857 43.7445 37.7993 43.7169C37.4129 43.6893 37.0773 43.9802 37.0497 44.3665C36.7469 48.6067 37.8498 51.8671 39.7364 54.0774C41.6201 56.2842 44.243 57.3919 46.8672 57.3919C49.4914 57.3919 52.1144 56.2842 53.998 54.0774C55.8847 51.8671 56.9876 48.6067 56.6847 44.3665Z"
                        fill="white"
                    />
                </svg>
            </div>
            <div // Ready to Record State animation
            style={
                (
                    store.getState().bot.recordButtonState === RecordButtonStates.READY_TO_RECORD ||
                    store.getState().bot.recordButtonState === RecordButtonStates.PROCESSING ||
                    store.getState().bot.recordButtonState === RecordButtonStates.RELEASED 
                )? recordButtonStyles : disabledButtonStyles}
            > 
                <img 
                src={logo} 
                alt="loading..." 
                className='mic'
                style={{width: '65px', height: '65px', alignSelf: 'center', marginBottom: '15px'}}
                />
                <svg
                width="95"
                height="95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{position: 'absolute', top: -12, right: -16.5}}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M46.8672 36C43.2519 36 40.321 38.9308 40.321 42.5462V47.6896C40.321 51.3049 43.2519 54.2358 46.8672 54.2358C50.4826 54.2358 53.4134 51.3049 53.4134 47.6896V42.5462C53.4134 38.9308 50.4826 36 46.8672 36ZM44.2385 42.26C45.3621 41.8012 46.159 41.6051 46.9158 41.6111C47.6733 41.6171 48.4364 41.8258 49.4954 42.2598C49.7343 42.3578 50.0074 42.2435 50.1054 42.0045C50.2033 41.7656 50.089 41.4925 49.8501 41.3945C48.7509 40.944 47.8574 40.6834 46.9232 40.676C45.9884 40.6686 45.0589 40.9149 43.8849 41.3943C43.6459 41.4919 43.5312 41.7649 43.6288 42.004C43.7265 42.243 43.9994 42.3577 44.2385 42.26ZM45.1776 43.9126C45.918 43.6024 46.4257 43.4776 46.8983 43.4814C47.3715 43.4853 47.8572 43.6184 48.5563 43.9124C48.7944 44.0124 49.0685 43.9006 49.1686 43.6626C49.2687 43.4245 49.1568 43.1504 48.9188 43.0503C48.1792 42.7393 47.5604 42.5516 46.9059 42.5463C46.2507 42.5409 45.6074 42.7186 44.8162 43.0501C44.578 43.1499 44.4658 43.4238 44.5656 43.662C44.6654 43.9002 44.9394 44.0124 45.1776 43.9126Z"
                        fill="white"
                    />
                    <path
                        d="M56.6847 44.3665C56.6571 43.9802 56.3215 43.6893 55.9351 43.7169C55.5488 43.7445 55.2579 44.0801 55.2855 44.4665C55.5671 48.409 54.5367 51.2857 52.9311 53.1667C51.3224 55.0513 49.0942 55.9892 46.8672 55.9892C44.6402 55.9892 42.412 55.0513 40.8034 53.1667C39.1978 51.2857 38.1673 48.409 38.4489 44.4665C38.4765 44.0801 38.1857 43.7445 37.7993 43.7169C37.4129 43.6893 37.0773 43.9802 37.0497 44.3665C36.7469 48.6067 37.8498 51.8671 39.7364 54.0774C41.6201 56.2842 44.243 57.3919 46.8672 57.3919C49.4914 57.3919 52.1144 56.2842 53.998 54.0774C55.8847 51.8671 56.9876 48.6067 56.6847 44.3665Z"
                        fill="white"
                    />
                </svg>
            </div>
            <div //Ready to Send State animation
                style={store.getState().bot.recordButtonState === RecordButtonStates.READY_TO_SEND ? recordButtonStyles : disabledButtonStyles}
            > 
                <img 
                src={logo} 
                alt="loading..." 
                className='mic'
                style={{width: '65px', height: '65px', alignSelf: 'center', marginBottom: '15px'}}
                />
                <Lottie 
                animationData={lottieElypsis}
                style={{position: 'absolute', width: '70px', height: '70px', top: 0, left: -2}}        
                />
            </div>
        </button>
        <button // Send Button
        style={store.getState().bot.recordButtonState !== RecordButtonStates.READY_TO_SEND ? disabledButtonStyles : buttonStyles}  
        disabled={store.getState().bot.recordButtonState !== RecordButtonStates.READY_TO_SEND} 
        className={isSendButtonPressed ? 'pressed' : ''}
        onMouseDown={() => setIsSendButtonPressed(true)}
        onMouseUp={() => setIsSendButtonPressed(false)}
        onMouseLeave={() => setIsSendButtonPressed(false)}
        >
            <svg
            className="send"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <circle cx="15.8544" cy="15.778" r="15.0927" stroke="#4C4D58" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.7335 10.4904C15.1403 10.0836 15.7998 10.0836 16.2066 10.4904L20.3733 14.6571C20.7801 15.0639 20.7801 15.7234 20.3733 16.1302C19.9665 16.537 19.3069 16.537 18.9001 16.1302L16.5117 13.7418L16.5117 21.6436C16.5117 22.2189 16.0453 22.6853 15.4701 22.6853C14.8948 22.6853 14.4284 22.2189 14.4284 21.6436L14.4284 13.7418L12.04 16.1302C11.6332 16.537 10.9736 16.537 10.5668 16.1302C10.16 15.7234 10.16 15.0639 10.5668 14.6571L14.7335 10.4904Z"
                fill="#414040"
            />
            </svg>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecordArea);