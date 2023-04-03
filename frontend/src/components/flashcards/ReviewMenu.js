import { useState, useEffect } from 'react'
import axios from 'axios'

import { useAuthContext } from '../../hooks/useAuthContext'
import { getDate } from '../../utilities/HandleDate'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ReviewMenu = ({ callback }) => {

    const { user } = useAuthContext()

    const [enableReview, setEnableReview] = useState(false)
    const [srsDecks, setSrsDecks] = useState(null)
    const [srsEnabled, setSrsEnabled] = useState([])
    const [srsTitles, setSrsTitles] = useState([])
    const getSrsElems = (srs) => {
        let enabled = []
        let titles = []
        for(let deck in srs.decks){
            enabled.push(srs.decks[deck].enabled)
            titles.push(srs.decks[deck].title)
        }
        setSrsEnabled(enabled)
        setSrsTitles(titles)
    }
    useEffect(() => {
        if(!srsDecks){
            getSrsDecks()
        }
    })
    const getSrsDecks = () => {
        axios.post("srs/getsrs", { 
            email: user.email,
        }).then((response) => {
            setSrsDecks(response.data.srs)
            getSrsElems(response.data.srs)
            updateReviewMessage(response.data.srs)
        }).catch((error) => {
        })
    }

    const [reviewMessage, setReviewMessage] = useState("No SRS Decks Enabled") 

    const [editOpen, setEditOpen] = useState(false)
    const handleEditOpen = () => {
        setEditOpen(true)
    }
    const handleEditClose = () => {
        setEditOpen(false)
        getSrsElems(srsDecks)

    }

    const startReviews = () => {
        callback("Review", null)
    }

    const updateSrs = () => {
        axios.post("srs/togglesrs", { 
            email: user.email,
            values: srsEnabled
        }).then((response) => {
            getSrsDecks()
            handleEditClose()
        }).catch((error) => {
        })
    }

    const updateEnabled = (index) => {
        setSrsEnabled((prev) => 
            prev.map((val, i) => {
                if(i === index){
                    return !val
                }else{
                    return val
                }
            })
        )
    }

    const updateReviewMessage = (srs) => {
        let count = 0
        let anyEnabled = false
        let soonestDate = new Date("2038-01-01") // one of the latest dates possible in unix just for comparison (rather than using null where can't compare)
        let nowDate = new Date()
        nowDate.setHours(23)
        nowDate.setMinutes(59)
        for(let deck in srs.decks){
            if(srs.decks[deck].enabled){
                anyEnabled = true
                for(let card in srs.decks[deck].srs){
                    let thisDate = new Date(srs.decks[deck].srs[card].date)
                    if(srs.decks[deck].srs[card].date === null || thisDate < nowDate){ 
                        count = count + 1
                    }
                    if(count === 0){
                        if(thisDate < soonestDate){
                            soonestDate = thisDate
                        }
                    }
                }
            }
        }
        if(count === 0){
            if(anyEnabled){
                setReviewMessage("0 cards to review. Next reviews due on " + getDate(soonestDate, true))
            }else{

                setReviewMessage("No SRS Decks Enabled")
            }
            setEnableReview(false)
        }else{
            setReviewMessage("You have " + count + " cards to review!")
            setEnableReview(true)
        }
    }

    const [resetOpen, setResetOpen] = useState(false)
    const handleResetOpen = () => {
        setResetOpen(true)
    }
    const handleResetClose = () => {
        setResetOpen(false)
    }
    const [reset, setReset] = useState([false, false, false, false]) // maybe make dynamic, so depending on how many SRS decks, have that many false. (rather than hard coding amount) 
    const updateReset = (index) => {
        setReset((prev) => 
            prev.map((val, i) => {
                if(i === index){
                    return !val
                }else{
                    return val
                }
            })
        )
    }
    const resetSrs = () => {
        axios.post("srs/resetsrs", { 
            email: user.email,
            values: reset
        }).then((response) => {
            setReset([false, false, false, false]) // maybe make dynamic, so depending on how many SRS decks, have that many false. (rather than hard coding amount)
            getSrsDecks()
            handleResetClose()
            // also need to get srs decks so new updates are received and everything is rendered

        }).catch((error) => {
            // display error somewhere
        })

    }



    return(
        <div className='reviewMenu'>
            <h2>Review Mode</h2>
            <p>Review mode makes use of a Spaced Repetition Schedule (SRS) to show you flashcards at spaced intervals with the goal of testing you just as you are likely to forget.
                Getting cards correct increases the interval between the next showing of that card, and getting cards incorrect decreases the interval between the next showing of that card. 
            </p>
            <div className='reviewMenuContents'>
                <Stack spacing={2} justifyContent='center' sx={{width: '50%'}} >
                    <p>{reviewMessage}</p>
                    <Button variant="outlined" onClick={startReviews} disabled={!enableReview}>Review</Button> 
                    <Button variant="outlined" onClick={handleEditOpen}>Edit SRS Enabled Decks</Button>
                    <Button variant="outlined" onClick={handleResetOpen}>Reset A Deck's Progress</Button>
                </Stack>
                <Modal open={editOpen} onClose={handleEditClose} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="modalMenu">
                        <h2>SRS Enabled Decks</h2>
                        <Stack spacing={1}> 
                            {(!srsDecks) ? <h2>Loading Decks...</h2> : 
                                <FormGroup>
                                {srsDecks.decks.map((deck, index) => (
                                    <FormControlLabel control={<Checkbox checked={srsEnabled[index]} onChange={() => updateEnabled(index)} />} label={srsTitles[index]} />
                                ))}
                                </FormGroup>
                            }
                            <p>Disabling a deck pauses your reviews until you enable them again. Your progress is saved (Warning: doing this effects the way SRS works, read more here)</p>
                            <Button variant="outlined" onClick={updateSrs}>Update Settings</Button>
                            <Button variant="outlined" onClick={handleEditClose}>Close Settings</Button> 
                        </Stack>
                    </div>
                </Modal>

                <Modal open={resetOpen} onClose={handleResetClose} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="modalMenu">
                        <h2>SRS Decks</h2>
                        <h4>WARNING: Resetting a deck's progress is a permanent change and cannot be reversed!</h4>
                        <Stack spacing={1}> 
                            {(!srsDecks) ? <h2>Loading Decks...</h2> : 
                                <FormGroup>
                                {srsDecks.decks.map((deck, index) => (
                                    <FormControlLabel control={<Checkbox onChange={() => updateReset(index)} />} label={srsTitles[index]} />
                                ))}
                                </FormGroup>
                            }
                            <Button variant="outlined" onClick={resetSrs}>Reset Selected Decks</Button>
                            <Button variant="outlined" onClick={handleResetClose}>Cancel</Button> 
                        </Stack>
                    </div>
                </Modal>

            </div>
        </div>
    )
}

export default ReviewMenu