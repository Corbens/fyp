import { useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import PracticeMenuCustom from './PracticeMenuCustom'
import { getFlashcardDeck, getFlashcardList } from '../../utilities/Flashcards'

const PracticeMenu = ({ callback }) => {

    const [premadeValue, setPremadeValue] = useState(null)

    const practicePremade = () => {
        callback("Practice", getFlashcardDeck(premadeValue.pos))
    }
    
    return(
        <div className='menuDiv'>
            <div className='menuInstructions'>
                <h2>Practice Mode</h2>
                <p>Practice mode allows you to test your knowledge with complete freedom. Choose what flashcard deck to practice and test yourself at your own pace. Choose from your own custom made decks where you can add your own cards and pre-made decks. Some pre-made decks contain multi-sided flashcards so you can practice more than just the direct English and Japanese meanings but other information such as the readings!</p>
            </div>
            <div className='menuContents'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} align="center">
                            <h3>Premade Decks</h3>
                            <Autocomplete
                                isOptionEqualToValue={(option, value) => option.pos === value.pos}
                                value={premadeValue}
                                onChange={(event, newValue) => {
                                    setPremadeValue(newValue);
                                }}
                                disablePortal
                                id="premadeInput"
                                options={getFlashcardList()}
                                sx={{ width: '400px' }}
                                renderInput={(params) => <TextField {...params} label="Deck" />}
                            />
                            <br/>
                            <Button variant='outlined' disabled = {!Boolean(premadeValue)} onClick={practicePremade}>Practice Selected Deck</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <PracticeMenuCustom callback={callback}/>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
}

export default PracticeMenu