import { useState, useRef } from 'react'
import { getDecks } from '../../../utilities/Verbs';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

const VerbSettings = ({ callback }) => {

    const cardsRef = useRef(5)
    const [selectedDeck, setSelectedDeck] = useState("Godan")

    const startGame = () => {
        callback(getDecks(selectedDeck), cardsRef.current) 
    }

    return (
        <div className="verbSettings">
        <h3>Verb Settings</h3>
        <p>This game mode is about matching the correct verb conjugation to the English version of the verb. Choose from one of the three categories of verbs and test your conjugation skills! </p>
            <RadioGroup defaultValue="Godan" name="radio-buttons-group" onChange={(e) => setSelectedDeck(e.target.value)}>
                <FormControlLabel value="Godan" control={<Radio />} label="Godan Verbs" />
                <FormControlLabel value="Ichidan" control={<Radio />} label="Ichidan Verbs" />
                <FormControlLabel value="Irregular" control={<Radio />} label="Irregular Verbs" />
            </RadioGroup>
            <Box sx={{ width: 300 }}>
                <h4>Number of Cards</h4>
                <Slider
                    aria-label="Cards"
                    defaultValue={5}
                    step={null}
                    marks={[
                        {value: 3, label: "3"},
                        {value: 4, label: "4"},
                        {value: 5, label: "5"}]}
                    min={3}
                    max={5}
                    onChange={(e, value) => cardsRef.current = value}
                />
            </Box>
            <Button
                variant = "outlined"
                onClick={startGame}>
                Start Game
            </Button>
        </div>
    )
}

export default VerbSettings