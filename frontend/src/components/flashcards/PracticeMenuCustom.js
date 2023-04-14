import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Modal from '@mui/material/Modal'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import { useAuthContext } from '../../hooks/useAuthContext'

const PracticeMenuCustom = ({ callback }) => {

    const sidesKey = ["㊁", "㊂", "㊃"]

    const { user } = useAuthContext()
    const [customDecks, setCustomDecks] = useState(null)
    const [customValue, setCustomValue] = useState(null)
    const [customList, setCustomList] = useState(null)
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
                thisCustomList.push({label: response.data.decks[deck].title + " " + sidesKey[response.data.decks[deck].maxSides - 2], pos: deck})
                returnVal.push(response.data.decks[deck])
            }
            setCustomList(thisCustomList)
            setCustomDecks(returnVal)
        }).catch((error) => {
        })
    }

    const createReducer = (state, action) => {
        switch (action.type) {
            case 'change_title':
                return {
                    ...state,
                    title: action.payload
                }
            case 'change_sides':
                return {
                    ...state,
                    sides: Number(action.payload)
                }
            case 'change_side_one':
                return {
                    ...state,
                    sideOne: action.payload
                }
            case 'change_side_two':
                return {
                    ...state,
                    sideTwo: action.payload
                }
            case 'change_side_three':
                return {
                    ...state,
                    sideThree: action.payload
                }
            case 'change_side_four':
                return {
                    ...state,
                    sideFour: action.payload
                }
            case 'change_cards':
                return {
                    ...state,
                    cards: action.payload
                }
            case 'change_cards_stage':
                return {
                    ...state,
                    error: "",
                    cardsStage: action.payload
                }
            case 'display_error':
                return {
                    ...state,
                    error: action.payload
                }
            case 'clear_all':
                return {
                    title: "",
                    sides: 2,
                    sideOne: "",
                    sideTwo: "",
                    sideThree: "",
                    sideFour: "",
                    cardsStage: false,
                    cards: [],
                    error: "",
                    newOne: "",
                    newTwo: "",
                    newThree: "",
                    newFour: ""
                }
            case 'new_card_one':
                return {
                    ...state,
                    newOne: action.payload
                }
            case 'new_card_two':
                return {
                    ...state,
                    newTwo: action.payload
                }
            case 'new_card_three':
                return {
                    ...state,
                    newThree: action.payload
                }
            case 'new_card_four':
                return {
                    ...state,
                    newFour: action.payload
                }
            case 'import_deck':
                return {
                    ...state,
                    title: action.payload.title,
                    sides: action.payload.maxSides,
                    sideOne: action.payload.sideOne,
                    sideTwo: action.payload.sideTwo,
                    sideThree: action.payload.sideThree,
                    sideFour: action.payload.sideFour,
                    cards: action.payload.cards
                }
            default: {
                return state
            }	
        }
    }

    const initialCreate = {
        title: "",
        sides: 2,
        sideOne: "",
        sideTwo: "",
        sideThree: "",
        sideFour: "",
        cardsStage: false,
        cards: [],
        error: "",
        newOne: "",
        newTwo: "",
        newThree: "",
        newFour: ""
    }

    const [createState, createDispatch] = useReducer(createReducer, initialCreate)

    const changeStage = (cardsStage) => {
        if(cardsStage){
            if(createState.title === ""){
                createDispatch({type: 'display_error', payload: "Please Fill In All Fields First"})
                return
            }
            if(createState.sides === 2){
                if(createState.sideOne === "" || createState.sideTwo === ""){
                    createDispatch({type: 'display_error', payload: "Please Fill In All Fields First"})
                    return
                }
            }else if(createState.sides === 3){
                if(createState.sideOne === "" || createState.sideTwo === "" || createState.sideThree === ""){
                    createDispatch({type: 'display_error', payload: "Please Fill In All Fields First"})
                    return
                }
            }else{
                if(createState.sideOne === "" || createState.sideTwo === "" || createState.sideTwo === "" || createState.sideFour === ""){
                    createDispatch({type: 'display_error', payload: "Please Fill In All Fields First"})
                    return
                }
            }
        }
        createDispatch({type: 'change_cards_stage', payload: cardsStage})
    }

    const addCard = () => {
        if(createState.sides === 2){
            if(createState.newOne === "" || createState.newTwo === ""){
                createDispatch({type: 'display_error', payload: "Please Fill In All Fields First"})
                return
            }
            let tempCards = createState.cards
            tempCards.push({one: createState.newOne, two: createState.newTwo})
            createDispatch({type: 'change_cards', payload: tempCards})
        }else if(createState.sides === 3){
            if(createState.newOne === "" || createState.newTwo === "" || createState.newThree === ""){
                createDispatch({type: 'display_error', payload: "Please Fill In All Fields First"})
                return
            }
            let tempCards = createState.cards
            tempCards.push({one: createState.newOne, two: createState.newTwo, three: createState.newThree})
            createDispatch({type: 'change_cards', payload: tempCards})
        }else{
            if(createState.newOne === "" || createState.newTwo === "" || createState.newThree === "" || createState.newFour === ""){
                createDispatch({type: 'display_error', payload: "Please Fill In All Fields First"})
                return
            }
            let tempCards = createState.cards
            tempCards.push({one: createState.newOne, two: createState.newTwo, three: createState.newThree, four: createState.newFour})
            createDispatch({type: 'change_cards', payload: tempCards})
        }
    }
    const removeCard = (index) => {
        let tempCards = createState.cards
        tempCards.splice(index, 1)
        createDispatch({type: 'change_cards', payload: tempCards})
    }

    const [createOpen, setCreateOpen] = useState(false)
    const handleCreateOpen = () => {
        setCreateOpen(true)
    }
    const handleCreateClose = () => {
        setCreateOpen(false)
        createDispatch({type: 'clear_all', payload: ""})
    }

    const [editOpen, setEditOpen] = useState(false)
    const handleEditOpen = () => {
        setEditOpen(true)
        let editObj = {
            title: customDecks[Number(customValue.pos)].title,
            maxSides: customDecks[Number(customValue.pos)].maxSides,
            sideOne: "",
            sideTwo: "",
            sideThree: "",
            sideFour: "",
            cards: customDecks[Number(customValue.pos)].contents
        }
        if(customDecks[Number(customValue.pos)].maxSides >= 2){
            editObj.sideOne = customDecks[Number(customValue.pos)].sideNames[0]
            editObj.sideTwo = customDecks[Number(customValue.pos)].sideNames[1]
        }
        if(customDecks[Number(customValue.pos)].maxSides >= 3){
            editObj.sideThree = customDecks[Number(customValue.pos)].sideNames[2]
        }
        if(customDecks[Number(customValue.pos)].maxSides === 4){
            editObj.sideFour = customDecks[Number(customValue.pos)].sideNames[3]
        }
        createDispatch({type: 'import_deck', payload: editObj})
    }
    const handleEditClose = () => {
        setEditOpen(false)
        createDispatch({type: 'clear_all', payload: ""})
    }

    const createDeck = () => {
        if(createState.cards.length !== 0){
            let sideNames = []
            if(createState.sides === 2){
                sideNames = [createState.sideOne, createState.sideTwo]
            }else if(createState.sides === 3){
                sideNames = [createState.sideOne, createState.sideTwo, createState.sideThree]
            }else{
                sideNames = [createState.sideOne, createState.sideTwo, createState.sideThree, createState.sideFour]
            }
            axios.post("flashcards/createDeck", { 
                email: user.email,
                title: createState.title,
                maxSides: createState.sides,
                sideNames: sideNames,
                contents: createState.cards,
            }).then((response) => {
                handleCreateClose()
                getCustomDecks()
            }).catch((error) => {
                createDispatch({type: 'display_error', payload: error.response.data.error})
            })
        }else{
            createDispatch({type: 'display_error', payload: "Can't add empty deck"})
        }
    }
    const updateDeck = () => {
        axios.post("flashcards/editDeck", {
            email: user.email,
            title: createState.title, 
            contents: createState.cards
        }).then((response) => {
            handleEditClose()
            getCustomDecks()
        }).catch((error) => {
            createDispatch({type: 'display_error', payload: error.response.data.error})
        })
    }
    const deleteDeck = () => {
        axios.post("flashcards/deleteDeck", {
            email: user.email,
            title: createState.title
        }).then((response) => {
            handleEditClose()
            getCustomDecks()
            setCustomValue(null)
        }).catch((error) => {
            createDispatch({type: 'display_error', payload: error.response.data.error})
        })
    }

    const startPractice = () => {
        callback("Practice", customDecks[Number(customValue.pos)])
    }

    return(
        <div>
            <Grid container spacing={2} align="center">
                <Grid item xs={10}>
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
                    <br/>
                    <Stack spacing={2} sx={{ width: '300px' }}> 
                        <Button variant='outlined' onClick={handleCreateOpen}>Create New Deck</Button>
                        <Button variant='outlined' disabled = {!Boolean(customValue)} onClick={handleEditOpen}>Edit Selected Deck</Button>
                        <Button variant='outlined' disabled = {!Boolean(customValue)} onClick={startPractice}>Practice Selected Deck</Button>
                        <br/>
                    </Stack>
                </Grid>
            </Grid>

            <Modal open={createOpen} onClose={handleCreateClose} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className="modalMenu">
                    <h2>Create Deck</h2>
                        { !createState.cardsStage ? 
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Stack spacing={1} sx={{marginLeft: "5%"}}>
                                    <h3>Deck Name</h3>
                                    <TextField id="outlined-basic" label="Name" variant="outlined" value={createState.title} onChange={(e) => createDispatch({type: 'change_title', payload: e.target.value})} />
                                    <FormControl>
                                        <FormLabel>Number of Sides</FormLabel>
                                        <RadioGroup 
                                            row 
                                            name="row-radio-buttons-group"
                                            value={createState.sides}
                                            onChange={(e) => createDispatch({type: 'change_sides', payload: e.target.value})} >
                                            <FormControlLabel value={2} control={<Radio />} label="Two" />
                                            <FormControlLabel value={3} control={<Radio />} label="Three" />
                                            <FormControlLabel value={4} control={<Radio />} label="Four" />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                            </Grid>
                            <Grid item xs={6} alignItems="center" justifyContent="center">
                                <Stack spacing={1} alignItems="center" justifyContent="center">
                                    <h3>Side Names</h3>
                                    <TextField id="outlined-basic" label="Side One" variant="outlined" value={createState.sideOne} onChange={(e) => createDispatch({type: 'change_side_one', payload: e.target.value})} />
                                    <TextField id="outlined-basic" label="Side Two" variant="outlined" value={createState.sideTwo} onChange={(e) => createDispatch({type: 'change_side_two', payload: e.target.value})} />
                                    { createState.sides > 2 &&
                                    <TextField id="outlined-basic" label="Side Three" variant="outlined" value={createState.sideThree} onChange={(e) => createDispatch({type: 'change_side_three', payload: e.target.value})} />}
                                    { createState.sides > 3 &&
                                    <TextField id="outlined-basic" label="Side Four" variant="outlined" value={createState.sideFour} onChange={(e) => createDispatch({type: 'change_side_four', payload: e.target.value})} />}
                                </Stack>
                            </Grid>
                        <Grid item xs={12}>
                            <div className="error">{createState.error}</div>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                <Button variant='outlined' onClick={handleCreateClose}>Cancel</Button>
                                <Button variant='outlined' onClick={() => changeStage(true)}>Continue</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    :
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <h3>Add New Card</h3>
                            <Stack item xs={6} spacing={1} alignItems="center" justifyContent="center">
                                <TextField id="outlined-basic" label={createState.sideOne} variant="outlined" value={createState.newOne} onChange={(e) => createDispatch({type: 'new_card_one', payload: e.target.value})} />
                                <TextField id="outlined-basic" label={createState.sideTwo} variant="outlined" value={createState.newTwo} onChange={(e) => createDispatch({type: 'new_card_two', payload: e.target.value})} />
                                { createState.sides > 2 &&
                                <TextField id="outlined-basic" label={createState.sideThree} variant="outlined" value={createState.newThree} onChange={(e) => createDispatch({type: 'new_card_three', payload: e.target.value})} />}
                                { createState.sides > 3 &&
                                <TextField id="outlined-basic" label={createState.sideFour} variant="outlined" value={createState.newFour} onChange={(e) => createDispatch({type: 'new_card_four', payload: e.target.value})} />}
                                <Button variant='outlined' onClick={() => addCard()}>Add Card</Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>Deck's Cards</h3>
                            {(createState.cards.length !== 0) ? createState.cards.map((value, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton onClick={() => removeCard(index)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                >
                                <ListItemText primary={String(index+1) + ": " + value.one} />
                                </ListItem>
                            )) : <h3>No Cards Yet</h3>}
                        </Grid>
                        <Grid item xs={12}>
                            <div className="error">{createState.error}</div>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                <Button variant='outlined' onClick={handleCreateClose}>Cancel</Button>
                                <Button variant='outlined' onClick={() => changeStage(false)}>Go Back</Button>
                                <Button variant='outlined' onClick={() => createDeck()}>Create Deck</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    }
                </div>
            </Modal>

            <Modal open={editOpen} onClose={handleEditClose} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className="modalMenu">
                    <h2>Edit Deck</h2>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <h3>Add New Card</h3>
                            <Stack item xs={6} spacing={1} alignItems="center" justifyContent="center">
                                <TextField id="outlined-basic" label={createState.sideOne} variant="outlined" value={createState.newOne} onChange={(e) => createDispatch({type: 'new_card_one', payload: e.target.value})} />
                                <TextField id="outlined-basic" label={createState.sideTwo} variant="outlined" value={createState.newTwo} onChange={(e) => createDispatch({type: 'new_card_two', payload: e.target.value})} />
                                { createState.sides > 2 &&
                                <TextField id="outlined-basic" label={createState.sideThree} variant="outlined" value={createState.newThree} onChange={(e) => createDispatch({type: 'new_card_three', payload: e.target.value})} />}
                                { createState.sides > 3 &&
                                <TextField id="outlined-basic" label={createState.sideFour} variant="outlined" value={createState.newFour} onChange={(e) => createDispatch({type: 'new_card_four', payload: e.target.value})} />}
                                <Button variant='outlined' onClick={() => addCard()}>Add Card</Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} >
                            <h3>Deck's Cards</h3>
                            {(createState.cards.length !== 0) ? createState.cards.map((value, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton onClick={() => removeCard(index)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                >
                                <ListItemText primary={String(index+1) + ": " + value.one} />
                                </ListItem>
                            )) : <h3>No Cards Yet</h3>}
                        </Grid>
                        <Grid item xs={12}>
                            <div className="error">{createState.error}<br/></div> 
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center"> 
                                <Button variant='outlined' onClick={handleEditClose}>Cancel</Button>
                                <Button variant='outlined' onClick={deleteDeck}>Delete Deck</Button>
                                <Button variant='outlined' onClick={updateDeck}>Update Deck</Button>
                            </Stack>  
                        </Grid>
                    </Grid>
                </div>
            </Modal>
            
        </div>
    )
}

export default PracticeMenuCustom