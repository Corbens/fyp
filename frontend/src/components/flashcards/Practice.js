import { useState } from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import { useAuthContext } from '../../hooks/useAuthContext'

const Practice = ({ callback, deck }) => {
    const { user } = useAuthContext()
    
    const [displaySide, setDisplaySide] = useState(0)
    const [displaySideObj, setDisplaySideObj] = useState("one")
    const [cards, setCards] = useState(deck)
    const [cardNum, setCardNum] = useState(0)

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
        if(displaySide === 0){
            setDisplaySide(1)
            setDisplaySideObj("two")
        }else{
            setDisplaySide(0)
            setDisplaySideObj("one")
        }
    }

    const changeSide = (index) => {
        setDisplaySide(index)
        switch(index) {
            case 0:
                setDisplaySideObj("one")
                break;
            case 1:
                setDisplaySideObj("two")
                break;
            case 2:
                setDisplaySideObj("three")
                break;
            case 3:
                setDisplaySideObj("four")
                break;
            default:
                setDisplaySideObj("one")
        } 
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
                        <Grid container spacing={2}>
                            <Grid item xs={9}>

                                <h2>{deck.sideNames[displaySide]}</h2>
                                    {(cards.contents[cardNum][displaySideObj].ruby) ?
                                        ((user.ruby) ? <div>
                                            <h1>
                                                {cards.contents[cardNum][displaySideObj].raw.map((value, index) => (

                                                    <ruby>
                                                    {value} <rt> {cards.contents[cardNum][displaySideObj].ruby[index]} </rt>
                                                    </ruby> 

                                                ))}
                                            </h1>
                                        </div>
                                        :
                                        <div>
                                            <h1>{cards.contents[cardNum][displaySideObj].raw}</h1>
                                        </div>
                                        )
                                    :
                                    <div>
                                         <h1>{cards.contents[cardNum][displaySideObj]}</h1>
                                    </div>
                                    }                   
    
                                <Stack direction='row' justifyContent='center' spacing={0} sx={{width: '100 %'}}> 
                                    <Tooltip title="Previous Card">
                                        <IconButton variant="contained" onClick={() => changeCard(false)}><ArrowLeftIcon sx={{ fontSize: "80px" }}/></IconButton>
                                    </Tooltip>
                                    <Tooltip title="Next Card">
                                        <IconButton variant="contained" onClick={() => changeCard(true)}><ArrowRightIcon sx={{ fontSize: "80px" }}/></IconButton>
                                    </Tooltip>
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack direction='column' justifyContent='center' spacing={2} sx={{width: '100 %'}}>
                                    <h2>Select Card Side</h2>
                                    {deck.sideNames.map((value, index) => (
                                        <Button variant='outlined' onClick={() => changeSide(index)}>{value}</Button>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
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