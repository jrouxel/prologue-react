import * as sdk from "microsoft-cognitiveservices-speech-sdk";

let recognizer = null;

export const startSpeechRecognition = (setTempTranscript, setFinalTranscript) => async () => {
  // If a recognizer is already running, stop it
  if (recognizer) {
    await new Promise(resolve => {
      recognizer.stopContinuousRecognitionAsync(resolve);
    });
    recognizer.dispose();
    recognizer = null;
  }

  const response = await fetch('https://crimetrip-backend.azurewebsites.net/azure_chatbot/oauth');
  const data = await response.json();
  const token = data.token;
  const serviceRegion = "eastus";
  const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(token, serviceRegion);
  speechConfig.speechRecognitionLanguage = "en-US";
  const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

  // Create new recognizer instance
  recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizing = (s, e) => {
    setTempTranscript(e.result.text + '...');
  };
  
  recognizer.recognized = (s, e) => {
    if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
      setFinalTranscript(prevTranscript => `${prevTranscript}${e.result.text}\n`);
      setTempTranscript('');
    }
  };

  recognizer.startContinuousRecognitionAsync();
};

export const stopSpeechRecognition = () => {
  if (recognizer) {
    recognizer.stopContinuousRecognitionAsync();
    recognizer.dispose();
    recognizer = null;
  }
};