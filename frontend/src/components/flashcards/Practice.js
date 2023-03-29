import { useState } from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LoopIcon from '@mui/icons-material/Loop';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Practice = ({ callback, deck }) => {

    const [cards, setCards] = useState(deck)
    const [cardNum, setCardNum] = useState(0)
    const [front, setFront] = useState(true)

    const changeCard = (add) => {
        if(add){
            if(cardNum === cards.contents.length-1){
                setCardNum(0)
            }else{
                setCardNum(cardNum+1)
            }
        }else{
            if(cardNum === 0){
                setCardNum(cards.contents.length-1)
            }else{
                setCardNum(cardNum-1)
            }
        }
    }

    const shuffleCards = () => {
        let newDeck = deck
        let newCards = newDeck.contents
        for(let i = newCards.length - 1; i > 0; i--){ 
            let j = Math.floor(Math.random() * (i + 1))   
            let temp = newCards[i];
            newCards[i] = newCards[j];
            newCards[j] = temp;
        }
        newDeck.contents = newCards
        setCardNum(0)
        setCards(newDeck)
        setFront(!front)
    }

    return(
        <div className='practiceContents'>
            <br></br>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <h2>Practice Mode</h2>
                    <h3>Deck: {cards.title}</h3>
                    <h3>Card {cardNum+1} of {cards.contents.length}</h3>
                </Grid>
                <Grid item xs={9}>
                    <div className="flashcard">
                        <h4>{front ? "FRONT" : "BACK"}</h4>
                        <h1>{front ? cards.contents[cardNum].en : cards.contents[cardNum].ja}</h1>
                        <Stack direction='row' justifyContent='center' spacing={2} sx={{width: '100 %'}}> 
                            <Tooltip title="Previous Card">
                                <IconButton variant="contained" onClick={() => changeCard(false)}><ArrowLeftIcon/></IconButton>
                            </Tooltip>
                            <Tooltip title="Flip Card">
                                <IconButton variant="contained" onClick={() => setFront(!front)}><LoopIcon/></IconButton>
                            </Tooltip>
                            <Tooltip title="Next Card">
                                <IconButton variant="contained" onClick={() => changeCard(true)}><ArrowRightIcon/></IconButton>
                            </Tooltip>
                        </Stack>
                    </div>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={9} justifyContent='right'>
                    <Stack direction='row' justifyContent='center' spacing={2} sx={{width: '100 %'}}>
                        <Button variant='outlined' onClick={() => callback("Menu", null)}>Go Back To Menu</Button>
                        <Button variant='outlined' onClick={() => shuffleCards()}>Shuffle Cards</Button>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default Practice