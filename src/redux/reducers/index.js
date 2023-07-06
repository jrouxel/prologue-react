import { combineReducers } from 'redux';
import { SET_TEMP_TRANSCRIPT, SET_FINAL_TRANSCRIPT, SET_MIC_PERMISSION, SET_RECORD_BUTTON_STATE } from '../actions';

const INITIAL_STATE = {
  tempTranscript: '',
  finalTranscript: '',
  micPermission: false,
  recordButtonState: '',
};

const botReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TEMP_TRANSCRIPT:
      return {...state, tempTranscript: action.payload}
    case SET_FINAL_TRANSCRIPT:
      return {...state, finalTranscript: action.payload}
    case SET_MIC_PERMISSION:
      return {...state, micPermission: action.payload}
    case SET_RECORD_BUTTON_STATE:
      return {...state, recordButtonState: action.payload}
    default:
      return state;
  }
}

export default combineReducers({
  bot: botReducer,
});