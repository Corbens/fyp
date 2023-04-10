import { useState } from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import AdjectiveSettings from './pregame/AdjectiveSettings'
import NounSettings from './pregame/NounSettings';
import ParticleSettings from './pregame/ParticleSettings';
import VerbSettings from './pregame/VerbSettings';
import VocabularySettings from './pregame/VocabularySettings';

const Pregame = ({ callback }) => {

    const [value, setValue] = useState("Vocabulary");

    // callback function to be used by settingComponent
    const startGame = (deck, cards) => {
        callback(deck, cards, value) // calls the callback function from the parent component (BlankGame) to go to MidGame
    }

    let settingComponent;
    if (value === "Adjectives") {
        settingComponent = <AdjectiveSettings callback={startGame}/>
    } else if (value === "Nouns") {
        settingComponent = <NounSettings callback={startGame} />
    } else if (value === "Particles") { 
        settingComponent = <ParticleSettings callback={startGame} />
    } else if (value === "Verbs") {
        settingComponent = <VerbSettings callback={startGame} />
    } else {
        settingComponent = <VocabularySettings callback={startGame} />
    }

    return (
        <div>
            <div className="instructionsDiv">
                <div className="instructionsTitle">
                    <h2>Game Instructions:</h2>
                </div>
                <div className="instructionsContents">
                    <p>This is a drag and drop style game where you are tasked with dragging matching cards together. A correct match will turn green, an incorrect match red and a match that you previously had incorrect but now have correct will be orange.</p>
                </div>
            </div>
            <div className="settingsDiv">
                <div className="settingsTitle">
                    <h2>Select Your Game Settings</h2>
                </div>
                <div className="settingsContents">
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Game Type</FormLabel>
                    <RadioGroup 
                        row 
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}>
                        <FormControlLabel value="Vocabulary" control={<Radio />} label="Vocabulary" />
                        <FormControlLabel value="Verbs" control={<Radio />} label="Verb Endings" />
                        <FormControlLabel value="Adjectives" control={<Radio />} label="Adjectives" />
                        <FormControlLabel value="Nouns" control={<Radio />} label="Nouns" />
                        <FormControlLabel value="Particles" control={<Radio />} label="Particles" />
                    </RadioGroup>
                </FormControl>
                {settingComponent}
                </div>
            </div>
        </div>
        
    )
}

export default Pregame