import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { getFlashcardDeck, getFlashcardList } from '../../utilities/Vocabulary';

const PracticeMenu = ({ callback }) => {

    const { user } = useAuthContext()
    const [premadeValue, setPremadeValue] = useState(null)
    const [customValue, setCustomValue] = useState(null)
    const [customList, setCustomList] = useState(null)
    const [errorMsg, setErrorMsg] = useState("")
    const [title, setTitle] = useState("")
    const [frontCard, setFrontCard] = useState("")
    const [backCard, setBackCard] = useState("")

    const [customDecks, setCustomDecks] = useState(null)
    const [inUseCustomDeck, setInUseCustomDeck] = useState({title: "", contents: []})
    useEffect(() => {
        if(!customDecks){
            getCustomDecks()
        }
    })
    const getCustomDecks = () => {
        axios.post("flashcards/getDecks", { 
            email: user.email,
        }).then((response) => {
            let returnVal = []
            let thisCustomList = [] 
            for(let deck in response.data.decks){
                thisCustomList.push({label: response.data.decks[deck].title, pos: deck})
                returnVal.push(response.data.decks[deck])
            }
            setCustomList(thisCustomList)
            setCustomDecks(returnVal)
        }).catch((error) => {
        })
    }

    const [createOpen, setCreateOpen] = useState(false)
    const handleCreateOpen = () => {
        setCreateOpen(true)
        let customDeck = {
            title: "",
            contents: []
        }
        setInUseCustomDeck(customDeck)
    }
    const handleCreateClose = () => {
        setCreateOpen(false)
        setErrorMsg("")
        setTitle("")
        setFrontCard("")
        setBackCard("")
        setInUseCustomDeck({title: "", contents: []})
    }
    const [editOpen, setEditOpen] = useState(false)
    const handleEditOpen = () => {
        setEditOpen(true)
        setTitle(customDecks[customValue.pos].title)
        let customDeck = {
            title: "",
            contents: []
        }
        customDeck.title = customDecks[customValue.pos].title
        customDeck.contents = customDecks[customValue.pos].contents
        setInUseCustomDeck(customDeck)
    }
    const handleEditClose = () => {
        getCustomDecks()
        setEditOpen(false)
        setErrorMsg("")
        setTitle("")
        setFrontCard("")
        setBackCard("")
        setInUseCustomDeck({title: "", contents: []})
    }

    const practicePremade = () => {
        callback("Practice", getFlashcardDeck(premadeValue.pos))
    }
    const practiceCustom = () => {
        callback("Practice", customDecks[customValue.pos])
    }

    const addCard = () => {
        if(frontCard === "" || backCard === ""){
            setErrorMsg("Cannot add blank card")
            return
        }
        let tempDeck = inUseCustomDeck
        let tempDeckContents = tempDeck.contents
        tempDeckContents.push({en: frontCard, ja: backCard})
        tempDeck.contents = tempDeckContents
        setInUseCustomDeck(tempDeck)
        setFrontCard("")
        setBackCard("")
        setErrorMsg("")
    }
    const removeCard = (index) => {
        let tempDeck = {title: inUseCustomDeck.title, contents: inUseCustomDeck.contents}
        tempDeck.contents.splice(index, 1)
        setInUseCustomDeck(tempDeck)
    }

    const createDeck = () => {
        axios.post("flashcards/createDeck", { 
            email: user.email,
            title: title,
            contents: inUseCustomDeck.contents,
        }).then((response) => {
            handleCreateClose()
            setCustomDecks(getCustomDecks())
        }).catch((error) => {
            setErrorMsg(error.response.data.error)
        })
    }
    const updateDeck = () => {
        axios.post("flashcards/editDeck", {
            email: user.email,
            title: title, 
            contents: inUseCustomDeck.contents
        }).then((response) => {
            handleEditClose()
        }).catch((error) => {
            setErrorMsg(error.response.data.error)
        })
    }
    const deleteDeck = () => {
        axios.post("flashcards/deleteDeck", {
            email: user.email,
            title: title
        }).then((response) => {
            setCustomValue(null) //deselect deleted option to avoid any errors
            handleEditClose()
        }).catch((error) => {
            setErrorMsg(error.response.data.error)
        })
    }
    

   
    return(
        <div className='practiceMenu'>
            <h2>Practice Mode</h2>
            <div className='practiceMenuContents'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                            <br></br>
                            <Button variant='outlined' disabled = {!Boolean(premadeValue)} onClick={practicePremade}>Practice Selected Deck</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>Custom Decks</h3>
                            <Autocomplete
                                isOptionEqualToValue={(option, value) => option.pos === value.pos}
                                value={customValue}
                                onChange={(event, newValue) => {
                                    setCustomValue(newValue);
                                }}
                                disablePortal
                                id="customInput"
                                options={customList}
                                sx={{ width: '400px' }}
                                renderInput={(params) => <TextField {...params} label="Deck" />}
                            />
                            <br></br>
                            <Stack spacing={2} sx={{width: '50%'}} > {/* look into having max width and min width. make more responsive.*/}
                                <Button variant='outlined' onClick={handleCreateOpen}>Create New Deck</Button>
                                <Button variant='outlined' disabled = {!Boolean(customValue)} onClick={handleEditOpen}>Edit Selected Deck</Button>
                                <Button variant='outlined' disabled = {!Boolean(customValue)} onClick={practiceCustom}>Practice Selected Deck</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <Modal open={createOpen} onClose={handleCreateClose} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className="modalMenu">
                    <h2>Create Deck</h2>
                    <Grid container spacing={2}>
                        <Stack item xs={6} spacing={1} sx={{marginLeft: "5%"}}>
                            <h3>Deck Name</h3>
                            <TextField id="outlined-basic" label="Name" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <h3>New Card</h3>
                            <TextField id="outlined-basic" label="Front" variant="outlined" value={frontCard} onChange={(e) => setFrontCard(e.target.value)} />
                            <TextField id="outlined-basic" label="Back" variant="outlined" value={backCard} onChange={(e) => setBackCard(e.target.value)} />
                            <Button variant='outlined' onClick={addCard}>Add Card</Button>
                        </Stack>
                        <Grid item xs={6}>
                            <h3>Deck's Cards</h3>
                            {(inUseCustomDeck.contents.length !== 0) ? inUseCustomDeck.contents.map((value, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton onClick={() => removeCard(index)}>
                                           <DeleteIcon/>
                                      </IconButton>
                                    }
                                >
                                <ListItemText primary={value.en + " ・ " + value.ja} />
                                </ListItem>
                            )) : <h4>No Cards Yet</h4>}
                        </Grid>
                        <Grid item xs={12}>
                            <div className="error">{errorMsg}</div>
                            <Button variant='outlined' onClick={createDeck}>Save Deck</Button>
                            <Button variant='outlined' onClick={handleCreateClose}>Discard Deck</Button>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
            <Modal open={editOpen} onClose={handleEditClose} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className="modalMenu">
                    <h2>Edit Deck</h2>
                    <Grid container spacing={2}>
                        <Stack item xs={6} spacing={1} sx={{marginLeft: "5%"}}>
                            <h3>Deck Name</h3>
                            <p>{title}</p>
                            <h3>New Card</h3>
                            <TextField id="outlined-basic" label="Front" variant="outlined" value={frontCard} onChange={(e) => setFrontCard(e.target.value)} />
                            <TextField id="outlined-basic" label="Back" variant="outlined" value={backCard} onChange={(e) => setBackCard(e.target.value)} />
                            <Button variant='outlined' onClick={addCard}>Add Card</Button>
                        </Stack>
                        <Grid item xs={6}>
                            <h3>Deck's Cards</h3>
                            {(inUseCustomDeck.contents.length !== 0) ? inUseCustomDeck.contents.map((value, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton onClick={() => removeCard(index)}>
                                           <DeleteIcon/>
                                      </IconButton>
                                    }
                                >
                                <ListItemText primary={value.en + " ・ " + value.ja} />
                                </ListItem>
                            )) : <h4>No Cards Yet</h4>}
                        </Grid>
                        <Grid item xs={12}>
                            <div className="error">{errorMsg}</div>
                            <Button variant='outlined' onClick={updateDeck}>Update Deck</Button>
                            <Button variant='outlined' onClick={deleteDeck}>Delete Deck</Button>
                            <Button variant='outlined' onClick={handleEditClose}>Discard Changes</Button>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </div>
    )
}

export default PracticeMenu