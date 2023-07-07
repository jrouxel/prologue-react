import lottieRecording from "./img/lottieRecording.json";

export const buttonStyles = {
    fontSize: '16px',
    border: 'none',
    background: 'none',
    padding: '0px',
    outline: 'none',
};

export const disabledButtonStyles = {...buttonStyles, display: 'none'};

export const recordingAnimOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieRecording,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};