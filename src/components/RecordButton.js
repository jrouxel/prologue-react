import React, { useEffect, useState } from 'react';

const RecordButton = ({ onStart, onStop }) => {
    const [recording, setRecording] = useState(false);
    const [micPermission, setMicPermission] = useState();

    useEffect(() => {
        navigator.permissions.query({name: 'microphone'})
        .then(result => setMicPermission(result.state));
    }, []);

    const requestMicPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            return Promise.resolve();
        } catch (err) {
            console.error('Mic permission denied');
            return Promise.reject();
        }
    };


    const handleMouseDown = async () => {
        if (micPermission !== 'granted') {
            try {
                await requestMicPermission();
                setMicPermission('granted');
            } catch (err) {
                console.error("Mic permission denied or not available.");
            }
        } else if (!recording) {
            setRecording(true);
            onStart();
        }
    };

    const handleMouseUp = () => {
        if (recording) {
            setRecording(false);
            onStop();
        }
    };

    return (
        <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            Press and Hold to Record
        </button>
    );
};

export default RecordButton;