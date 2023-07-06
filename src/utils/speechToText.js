import { RecordButtonStates } from '../components/recordButton/constants';
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { setTempTranscript, setFinalTranscript, setRecordButtonState} from '../redux/actions';
import store from '../redux/store';

let recognizer = null;
let token = null;

// Define a function to fetch token
const fetchToken = async () => {
    const response = await fetch('https://crimetrip-backend.azurewebsites.net/azure_chatbot/oauth');
    const data = await response.json();
    token = data.token;
}

// Call it immediately & setup setInterval to fetch it every 10 minutes
fetchToken();
setInterval(fetchToken, 1000 * 60 * 10); // 1000ms * 60s * 10m

export const startSpeechRecognition = () => async() => {

    // If a recognizer is already running, stop it
    if (recognizer) {
        recognizer.stopContinuousRecognitionAsync(() => {
          recognizer.dispose();
          recognizer = null;
        });
    }
    store.dispatch(setRecordButtonState(RecordButtonStates.PROCESSING));
    const serviceRegion = "eastus";
    const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(token, serviceRegion);
    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

    // Create new recognizer instance
    recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (s, e) => {
        if (e.result.reason === sdk.ResultReason.NoMatch) {
          alert("Squeeze and speak, and release when you have finished")
        }
        else if (e.result.reason === sdk.ResultReason.RecognizingSpeech) {
          store.dispatch(setTempTranscript(e.result.text + '...'));
        }
    };
  
    recognizer.recognized = (s, e) => {
        if (e.result.reason === sdk.ResultReason.RecognizingSpeech) {
            store.dispatch(setFinalTranscript(prevTranscript => `${prevTranscript}${e.result.text}\n`));
            store.dispatch(setTempTranscript(''));
        } else if (e.result.reason === sdk.ResultReason.NoMatch) {
            store.dispatch(setRecordButtonState(RecordButtonStates.RECORDING));
        }
    };

    //recognizer.startContinuousRecognitionAsync(() => store.dispatch(setRecordButtonState(RecordButtonStates.RECORDING)));
    //wait 0.5 seconds before starting to record
    

    recognizer.startContinuousRecognitionAsync(() => {
      console.log(store.getState().bot.recordButtonState)
      if(store.getState().bot.recordButtonState === RecordButtonStates.PROCESSING){
        store.dispatch(setRecordButtonState(RecordButtonStates.RECORDING))
      }else if(store.getState().bot.recordButtonState === RecordButtonStates.RELEASED){
        console.log("released, so we need to cancel")
        cancelSpeechRecognition();
        store.dispatch(setRecordButtonState(RecordButtonStates.READY_TO_RECORD));
      }
    });

};

export const stopSpeechRecognition = () => {
  if (recognizer) {
    recognizer.stopContinuousRecognitionAsync(() => {
      store.dispatch(setRecordButtonState(RecordButtonStates.READY_TO_SEND));
      recognizer.dispose();
      recognizer = null;
    });
  }
};

export const cancelSpeechRecognition = () => {
  if(recognizer){
    console.log("canceling")
    recognizer.stopContinuousRecognitionAsync(() => {});
    recognizer.dispose();
    recognizer = null;
  }
}