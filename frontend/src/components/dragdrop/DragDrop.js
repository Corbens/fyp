import { useState, useRef } from 'react'
import axios from 'axios'

import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import { useAuthContext } from '../../hooks/useAuthContext'
import Results from './Results'


const DragDrop = ({deck, cards, filler, callback, instructions}) => {
    const { user } = useAuthContext()

    const initializeIncorrectIndexes = () => {
        let arr = []
        for(let i = 0; i < cards; i++){
            arr.push(0)
        }
        return arr
    }

    const incorrectIndexes = useRef(initializeIncorrectIndexes())
    const correctRef = useRef(0)
    const incorrectRef = useRef(0) 

    const endGame = () => {
        let resultsObj = {
            score: Math.round((correctRef.current / (correctRef.current + incorrectRef.current)) * 100),
            playingDeck: deck,
            incorrectCards: incorrectIndexes.current
        }
        setResultsComponent(<Results results={resultsObj} callback={callback}/>)
        axios.post("user/addhistory", { 
            email: user.email,
            type: "Drag & Drop",
            score: Math.round((correctRef.current / (correctRef.current + incorrectRef.current)) * 100)
        }).then((response) => {
            setResultsOpen(true)
        }).catch((error) => {
        })
    }

    // adjust the properties of each relevant div upon correct drag and dorp
    const handleCorrect = (index, draggingId) => {
        let color = "green"
        if(incorrectIndexes.current[index] === 1){
            color = "orange"
        }
        correctRef.current = correctRef.current + 1
        if(correctRef.current === cards){ 
            endGame("Endgame")
        }

        // looks at each div inside the static block and updates it if it matches the card that was just dropped onto 
        setStaticBlock((prev) => 
            prev.map((div, i) => {
                if(String(i) === String(index)){
                    return <div key={index} className ='staticDivs' id={"st" + index} style={{color: color}} >{deck[index]["en"]}</div>
                }else{
                    return div
                }
            })
        )

        // looks at each div inside the drop block and updates it if it is the div that was just dropped onto
        setDropBlock((prev) =>
            prev.map((div, i) => {
                if(String(i) === String(index)){
                    let x = ''
                    if(filler.append){
                        x = filler.filler + deck[index]["ja"]
                    }else{
                        x = deck[index]["ja"]
                    }
                    return <div key={index} className='dropDivs' id={"dp" + index} style={{color: color}} >{x}</div>
                }else{
                    return div
                }
            })
        )

        // looks at each div inside the drag block and updates it if it is the div that was dragged
        setDragBlock((prev) => 
            prev.map((div, i) => {
                let jaIndex = dragBlock[i].props.id.substring(2) // index is in different order as has been shuffled
                if(String(jaIndex) === String(index)){
                    return <div key={index} className="dragDivs" id={"dg" + index} style={{color: color}}> {deck[index]["ja"]}</div>
                }else{
                    return div
                }
            })
        )
    }

    const handleIncorrect = (index) => {
        incorrectRef.current = incorrectRef.current + 1
        let tempIncorrectIndexes = incorrectIndexes.current
        tempIncorrectIndexes[index] = 1
        incorrectIndexes.current = tempIncorrectIndexes
        
        setDragBlock((prev) => 
            prev.map((div, i) => {
                let jaIndex = dragBlock[i].props.id.substring(2) 
                if(String(jaIndex) === String(index)){
                    return <div key={index} className="dragDivs" id={"dg" + index} style={{color: "red"}} onDragStart = {(e) => onDragStart(e, index)} draggable> {deck[index]["ja"]}</div>
                }else{
                    return div
                }
            })
        )
    }

    // saves the index of the japanese div that is being dragged
    const onDragStart = (ev, index) => {
        ev.dataTransfer.setData("index", index)
    }

    // prevents the default behavior of a dragOver as otherwise it doesn't work
    const onDragOver = (ev) => {
        ev.preventDefault()
    }

    const onDrop = (ev, index) => {
        let draggingId = ev.dataTransfer.getData("index")
        if(String(index) === String(draggingId)){
            handleCorrect(index, draggingId)
        }else{ 
            handleIncorrect(draggingId)
        }
    }

    const initializeStatic = () => {
        return deck.map((item, index) => <div key={index} className ='staticDivs' id={"st" + index}> {item["en"]} </div>)
    }

    const initializeDrop = () => {
        return deck.map((item, index) => <div key={index} className='dropDivs' id={"dp" + index} onDrop = {(e) => onDrop(e, index)} onDragOver = {(e) => onDragOver(e, index)} style={{outline: "0.01em solid black"}} > {filler.filler} </div>)
    }

    const initializeDrag = () => {
        let ja = deck.map((item, index) => <div key={index} className='dragDivs' id={"dg" + index} onDragStart = {(e) => onDragStart(e, index)} draggable> {item["ja"]} </div>)
        for(let i = ja.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1)) 
            var temp = ja[i];
            ja[i] = ja[j];
            ja[j] = temp;
        }
        return ja
    }

    const [staticBlock, setStaticBlock] = useState(() => initializeStatic()) 
    const [dropBlock, setDropBlock] = useState(() => initializeDrop()) 
    const [dragBlock, setDragBlock] = useState(() => initializeDrag()) 
    const [resultsComponent, setResultsComponent] = useState(null)
    const [resultsOpen, setResultsOpen] = useState(false)

    return (
        <div>
            <div className="gameDiv">
                <div className="gameInstructions">
                    <h2>Game Instructions:</h2>
                    <p>{instructions}</p>
                </div>
                <div className="gameContents">
                <Grid container>
                    <Grid container>
                        <Grid item xs={4}>
                            <h2>English</h2>
                        </Grid>
                        <Grid item xs={4}>
                            <h2>Drop Zone</h2>
                        </Grid>
                        <Grid item xs={4}>
                            <h2>Japanese</h2>
                        </Grid>
                        <Grid item xs={12}><br/></Grid>
                    </Grid>
                    {staticBlock.map((value, index) => (
                    <Grid container>
                        <Grid item xs={4}>
                            {staticBlock[index]}
                        </Grid>
                        <Grid item xs={4}>
                            {dropBlock[index]}
                        </Grid>
                        <Grid item xs={4}>
                            {dragBlock[index]}
                        </Grid>
                    </Grid>
                    ))}
                </Grid>
                </div>
            </div>
            {resultsComponent &&
                <div>
                    <Modal open={resultsOpen} onClose={() => setResultsOpen(false)} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>{resultsComponent}</Modal>
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <Button variant="outlined" onClick={() => callback(true)}>Play Again</Button>
                        <Button variant="outlined" onClick={() => setResultsOpen(true)}>View Results</Button>
                    </Stack>
                </div>
            }
        </div>
    )
}

export default DragDrop