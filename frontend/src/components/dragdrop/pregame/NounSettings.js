import { useState, useRef } from 'react'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'

const NounSettings = () => {

    const [onePlusDecks] = useState(false)
    const cardsRef = useRef(5)

    const startGame = () => {

    }

    return (
        <div className="nounSettings">
            <h3>Noun Settings</h3>
            <FormGroup sx={{display: "inline"}}>
                <FormControlLabel control={<Checkbox disabled/>} label="Deck 1" />
                <FormControlLabel control={<Checkbox disabled/>} label="Deck 2" />
                <FormControlLabel control={<Checkbox disabled/>} label="Deck 3" />
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

export default NounSettings