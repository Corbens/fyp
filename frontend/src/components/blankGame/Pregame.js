import { useState } from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import AdjectiveSettings from './gameSettings/AdjectiveSettings'
import NounSettings from './gameSettings/NounSettings';
import ParticleSettings from './gameSettings/ParticleSettings';
import VerbSettings from './gameSettings/VerbSettings';
import VocabularySettings from './gameSettings/VocabularySettings';

const Pregame = ({ callback }) => {

    const [value, setValue] = useState("Vocabulary");

    // callback function to be used by settingComponent
    const startGame = (deck, cards) => {
        callback(deck, cards) // calls the callback function from the parent component (BlankGame) to go to MidGame
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
        <div className="changeSettings">
            <h2>Game Instructions:</h2>
            <p>This is a drag and drop style game where you are tasked with dragging matching cards together. A correct match will turn green, an incorrect match red and a match that you previously had incorrect but now have correct will be orange.</p>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Select Your Game Type</FormLabel>
                <RadioGroup 
                    row 
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}>
                    <FormControlLabel value="Vocabulary" control={<Radio />} label="Vocabulary" />
                    <FormControlLabel value="Verbs" control={<Radio />} label="Verbs" />
                    <FormControlLabel value="Adjectives" control={<Radio />} label="Adjectives" />
                    <FormControlLabel value="Nouns" control={<Radio />} label="Nouns" />
                    <FormControlLabel value="Particles" control={<Radio />} label="Particles" />
                </RadioGroup>
            </FormControl>
            {settingComponent}
        </div>
        
    )
}

export default Pregame