import { useState, useRef } from 'react'
import axios from 'axios'

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

const VocabularySettings = ({ callback }) => {

    const [selectedDecks, setSelectedDecks] = useState({"countries": true, "food": false, "numbers": false});
    const [onePlusDecks, setOnePlusDecks] = useState(true)
    const cardsRef = useRef(5)

    // checks that at least one deck has been selected
    const checkDecks = () => { 
        let selected = false
        for(let deck in selectedDecks){
            if(selectedDecks[deck]){
                selected = true
                break
            }
        }
        setOnePlusDecks(selected)
    }

    // updates relevant states and variables if countries checkbox is toggled
    const handleChangeCountries = () => {
        let tDeck;
        tDeck = selectedDecks
        tDeck['countries'] = !selectedDecks['countries']
        setSelectedDecks(tDeck)
        checkDecks()
    }

    // updates relevant states and variables if food checkbox is toggled
    const handleChangeFood = () => {
        let tDeck;
        tDeck = selectedDecks
        tDeck['food'] = !selectedDecks['food']
        setSelectedDecks(tDeck)
        checkDecks()
    }

    // updates relevant states and variables if food checkbox is toggled
    const handleChangeNumbers = () => {
        let tDeck;
        tDeck = selectedDecks
        tDeck['numbers'] = !selectedDecks['numbers']
        setSelectedDecks(tDeck)
        checkDecks()
    }

    // starts the game and passes relevant data to parent 
    const startGame = async () => {
        axios.post("vocabulary/getDecks", { // first get the deck from the database
            data: selectedDecks
        }).then((response) => {
            callback(response.data, cardsRef.current) // once have decks, run callback function to go back to parent component and pass this deck
        }).catch((error) => {
            console.log(error) 
        })
    }

    return (
        <div className="vocabSettings">
            <h3>Vocabulary Settings</h3>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeCountries}/>} label="Countries" />
                <FormControlLabel control={<Checkbox onChange={handleChangeFood} />} label="Food" />
                <FormControlLabel control={<Checkbox onChange={handleChangeNumbers} />} label="Numbers" />
            </FormGroup>
            <Box sx={{ width: 300 }}>
                <h4>Number of Cards</h4>
                <Slider
                    aria-label="Cards"
                    defaultValue={5}
                    step={null}
                    marks={[
                        {value: 3, label: "3"},
                        {value: 4, label: "4"},
                        {value: 5, label: "5"},
                        {value: 6, label: "6"},
                        {value: 7, label: "7"},
                        {value: 8, label: "8"}]}
                    min={3}
                    max={8}
                    onChange={(e, value) => cardsRef.current = value}
                />
            </Box>
            <Button
                variant = "outlined"
                disabled = {!onePlusDecks}
                onClick={startGame}>
                Start Game
            </Button>
        </div>
    )
}

export default VocabularySettings