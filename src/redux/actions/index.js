// Define constants
export const SET_TEMP_TRANSCRIPT = 'SET_TEMP_TRANSCRIPT';
export const SET_FINAL_TRANSCRIPT = 'SET_FINAL_TRANSCRIPT';
export const SET_MIC_PERMISSION = 'SET_MIC_PERMISSION';
export const SET_RECORD_BUTTON_STATE = 'SET_RECORD_BUTTON_STATE';

// Define actions
export const setTempTranscript = (transcript) => {
  return {
    type: SET_TEMP_TRANSCRIPT,
    payload: transcript
  }
}

export const setFinalTranscript = (transcript) => {
  return {
    type: SET_FINAL_TRANSCRIPT,
    payload: transcript
  }
}

export const setMicPermission = (isGranted) => {
  return {
    type: SET_MIC_PERMISSION,
    payload: isGranted
  }
}

export const setRecordButtonState = (state) => {
  return {
    type: SET_RECORD_BUTTON_STATE,
    payload: state
  }
}