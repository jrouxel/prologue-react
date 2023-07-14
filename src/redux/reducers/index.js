import { combineReducers } from 'redux';
import { SET_TEMP_TRANSCRIPT, SET_FINAL_TRANSCRIPT, SET_MIC_PERMISSION, SET_RECORD_BUTTON_STATE, SET_CAROUSEL_STATE, SET_LANGUAGE_BUTTON_SELECTED} from '../actions';

const INITIAL_STATE = {
  tempTranscript: '',
  finalTranscript: '',
  micPermission: false,
  recordButtonState: 'Mic Permission Required', // added initial state
  carouselState: 0,
  languageButtonSelected: false,
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
    case SET_CAROUSEL_STATE:
      return {...state, carouselState: action.payload}
    case SET_LANGUAGE_BUTTON_SELECTED:
      return {...state, languageButtonSelected: action.payload}
    default:
      return state;
  }
}

export default combineReducers({
  bot: botReducer,
});