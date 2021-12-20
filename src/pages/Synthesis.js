import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LanguageSelection from '../components/LanguageSelection.js';

function Synthesis() {
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('auto');
    const [url, setUrl] = useState('');

    const handleTextFieldChange = (e) => {
        setText(e.target.value);
    };

    const handleButtonClick = (e) => {
        let new_text = text;
        if (new_text.trim() !== '' && language) {
            let newUrl = '/api/1.0/tts?text=' + new_text + '&language=' + language;
            if (newUrl !== url) {
                setUrl(newUrl);
            } else {
                let ttsAudio = document.getElementById('tts-audio');
                ttsAudio.play();
            }
        }
    };

    return (
        <div>
            <form noValidate autoComplete="off">
                <LanguageSelection language={language} setLanguage={setLanguage} />
                <p />
                <TextField id="tts-text" onChange={handleTextFieldChange} label="TTS Text" multiline rows={3} fullWidth />
                <p />
                <Button variant="contained" color="primary" onClick={handleButtonClick} fullWidth>
                    Text To Speech
                </Button>
                <audio controls id="tts-audio" autoPlay src={url} type="audio/wav" hidden>
                    Your browser does not support the audio element.
                </audio>
            </form>
        </div>
    );
}

export default Synthesis;
