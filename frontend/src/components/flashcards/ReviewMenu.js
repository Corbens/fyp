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



    return(
        <div className='reviewMenu'>
            <h2>Review Mode</h2>
            <div className='reviewMenuContents'>
                <Stack spacing={2} justifyContent='center' sx={{width: '50%'}} >
                    <p>{reviewMessage}</p>
                    <Button variant="outlined" onClick={startReviews} disabled={!enableReview}>Review</Button> 
                    <Button variant="outlined" onClick={handleEditOpen}>Edit SRS Enabled Decks</Button>
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
                            <p>Warning! Disabling an enabled SRS deck will cause you to lose your SRS data for that deck.</p>
                            <Button variant="outlined" onClick={updateSrs}>Update Settings</Button>
                            <Button variant="outlined" onClick={handleEditClose}>Close Settings</Button> 
                        </Stack>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default ReviewMenu