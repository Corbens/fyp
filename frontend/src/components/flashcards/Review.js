import { useState, useEffect } from 'react'
import axios from 'axios'
import { getFlashcardDeck } from '../../utilities/Vocabulary'
import { useAuthContext } from '../../hooks/useAuthContext'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';

const Review = ({ callback }) => {

    const reviewSchedule = [1,1,3,5,10,21,60,180]
    const { user } = useAuthContext()
    const [failed, setFailed] = useState(false)
    const [reviewDeck, setReviewDeck] = useState(null)
    const [reviewNum, setReviewNum] = useState(0)
    const [revealed, setRevealed] = useState(false)
    const [numCorrect, setNumCorrect] = useState(0)
    const [finished, setFinished] = useState(false)
    const [deckTitles, setDeckTitles] = useState(null)
    const [needSave, setNeedSave] = useState(false)

    const getReviewDeck = () => {
        axios.post("srs/getsrs", { 
            email: user.email,
        }).then((response) => {
            let thisDeck = []
            let srs = response.data.srs
            let nowDate = new Date()
            nowDate.setHours(23)
            nowDate.setMinutes(59)
            let titles = []
            for(let deck in srs.decks){
                if(srs.decks[deck].enabled){
                    let srsDeck = srs.decks[deck]
                    let flashcardDeck = getFlashcardDeck(deck)
                    if(flashcardDeck.title === srsDeck.title){ // check to confirm that the decks are the same
                        titles.push(flashcardDeck.title)
                        for(let card in srsDeck.srs){
                            let cardDate = new Date(srsDeck.srs[card].date)
                            if(cardDate < nowDate){
                                let reviewCard = {
                                    deck: flashcardDeck.title,
                                    num: Number(card),
                                    front: flashcardDeck.contents[card].ja,
                                    back: flashcardDeck.contents[card].en,
                                    nextReview: null,
                                    level: srsDeck.srs[card].level
                                }
                                thisDeck.push(reviewCard)
                            }
                        }
                    }
                }
            }
            if(thisDeck.length === 0){ 
                setFailed(true)
                return
            }
            for(let i = thisDeck.length - 1; i > 0; i--){ 
                let j = Math.floor(Math.random() * (i + 1))   
                let temp = thisDeck[i];
                thisDeck[i] = thisDeck[j];
                thisDeck[j] = temp;
            }
            setDeckTitles(titles)
            setReviewDeck(thisDeck)
        }).catch((error) => {
            setFailed(true)
        })
    }

    useEffect(() => {
        if(!reviewDeck){
            getReviewDeck()
        }
    })

    const handleCorrect = () => {
        if(!needSave){
            setNeedSave(true)
        }
        if(reviewDeck[reviewNum].level !== 7){
            reviewDeck[reviewNum].level = reviewDeck[reviewNum].level + 1
        }
        let nextReview = new Date()
        nextReview.setDate(nextReview.getDate() + reviewSchedule[reviewDeck[reviewNum].level])
        reviewDeck[reviewNum].nextReview = nextReview

        setNumCorrect(numCorrect+1)
        if(reviewNum+1 === reviewDeck.length){
            handleFinish()
            return
        }
        setReviewNum(reviewNum+1)
        setRevealed(false)
    }

    const handleIncorrect = () => {
        if(!needSave){
            setNeedSave(true)
        }
        if(reviewDeck[reviewNum].level !== 0){
            reviewDeck[reviewNum].level = reviewDeck[reviewNum].level - 1
        }
        let nextReview = new Date()
        nextReview.setDate(nextReview.getDate() + reviewSchedule[reviewDeck[reviewNum].level])
        reviewDeck[reviewNum].nextReview = nextReview

        if(reviewNum+1 === reviewDeck.length){
            handleFinish()
            return
        }
        setReviewNum(reviewNum+1)
        setRevealed(false)
    }

    const handleFinish = () => {
        updateSrs()
        setFinished(true)
    }

    const handleExit = () => {
        if(!finished && needSave){
            updateSrs()
        }
        callback("Menu", null)
    }

    const updateSrs = () => {
        let updateDeck = []
        for(let title in deckTitles){
            let thisDeck = []
            for(let card in reviewDeck){
                if(reviewDeck[card].deck === deckTitles[title]){
                    thisDeck.push(reviewDeck[card])
                }
            }
            thisDeck.sort((a, b) => a.num - b.num)
            updateDeck.push(thisDeck)
        }

        axios.post("srs/updatesrs", { 
            email: user.email,
            srs: updateDeck
        }).then((response) => {
            let score = !finished ? Math.round((numCorrect / reviewNum) * 100) : Math.round((numCorrect / (reviewNum + 1)) * 100)
            if(isNaN(score)){
                score = 0
            }
            axios.post("user/addhistory", { 
                email: user.email,
                type: "SRS Reviews",
                score: score
            }).then((response) => {
            }).catch((error) => {
            })
        }).catch((error) => {
        })
    }



    return(
        <div className='reviewContents'>
            <br></br>
            {(failed) ? <p>Error Loading Reviews. Please Retry.</p> :
                (reviewDeck === null) ? <p>Loading...</p> :
                    <div className="reviewLoaded"> 
                        <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <h2>Review Mode</h2>
                            <h3>Card {reviewNum+1} of {reviewDeck.length}</h3>
                            <h3>Correct: {!finished ? numCorrect + " / " + reviewNum : numCorrect + " / " + (reviewNum+1)}</h3>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="flashcard">
                                <h4>{!revealed ? "JAPANESE" : "ENGLISH"}</h4>
                                <h1>{!revealed ? reviewDeck[reviewNum].front : reviewDeck[reviewNum].back}</h1>
                                {!finished ? 
                                    !revealed ? 
                                        <Button variant='outlined' onClick={() => setRevealed(true)}>Reveal Answer</Button>
                                        :
                                        <Stack direction='row' justifyContent='center' spacing={2} sx={{width: '100 %'}}> 
                                            <Button variant='outlined' onClick={() => handleCorrect()}>Correct</Button>
                                            <Button variant='outlined' onClick={() => handleIncorrect()}>Incorrect</Button>
                                        </Stack>
                                    :
                                    <h3>You have finished all your reviews!</h3>
                                }
                            </div>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={9} justifyContent='right'>
                            <Stack direction='row' justifyContent='center' spacing={2} sx={{width: '100 %'}}>
                                <Button variant='outlined' onClick={() => handleExit()}>Go Back To Menu</Button>
                            </Stack>
                        </Grid>
                    </Grid> 
                </div>
            }
        </div>
    )
}

export default Review