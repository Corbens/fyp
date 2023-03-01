import { useState, useRef } from 'react'

import Results from './Results';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import IconButton from '@mui/material/IconButton';

const Midgame = ({deck, cards, callback}) => {
    // gets a playing deck of length cards from the decks that the user selected previously
    const getPlayingDeck = () => { 
        let decksArr = deck["decks"]
        let combinedDeck = []
        let playingDeck = []
        
        for(let i = 0; i < decksArr.length; i++){ // combines the individual decks into one deck
            for(let j = 0; j < decksArr[i]["contents"].length; j++){ 
                combinedDeck.push(decksArr[i]["contents"][j])
            }
        }
        
        for(let i = combinedDeck.length - 1; i > 0; i--){ // shuffles the order of the combined deck
            var j = Math.floor(Math.random() * (i + 1));   
            var temp = combinedDeck[i];
            combinedDeck[i] = combinedDeck[j];
            combinedDeck[j] = temp;
        }
        for(let i = 0; i < cards; i++){ // gets the first cards number of cards and puts them into the playing deck
            playingDeck.push(combinedDeck[i])
        }
        return playingDeck
    }

    const [playingDeck] = useState(() => getPlayingDeck()) 

    // creates an array of length cards where by default the index of a set of cards will have 0 but if a mistake has been made then will be set to 1
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

    const goBack = (playAgain) => {
        callback(playAgain)
    }

    const endGame = () => {
        let resultsObj = {
            score: Math.round((correctRef.current / (correctRef.current + incorrectRef.current)) * 100),
            playingDeck: playingDeck,
            incorrectCards: incorrectIndexes.current
        }
        setResultsComponent(<Results results={resultsObj} callback={goBack}/>)
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

        // looks at each element/div inside the English div and updates it if it matches the card that was just dropped onto 
        setEnglishBlock((prev) => 
            prev.map((div, i) => {
                if(String(i) === String(index)){
                    return <div key={index} id={"en" + index} style={{color: color}} >{playingDeck[index]["en"]}</div>
                }else{
                    return div
                }
            })
        )

        // looks at each element/div inside the Drop div and updates it if it is the div that was just dropped onto
        setDropBlock((prev) =>
            prev.map((div, i) => {
                if(String(i) === String(index)){
                    return <div key={index} className='dropDivs' id={"dr" + index} style={{color: color}} >{playingDeck[index]["ja"]}</div>
                }else{
                    return div
                }
            })
        )

        // looks at each element/div inside the Japanese div and updates it if it is the div that was dragged
        setJapaneseBlock((prev) => 
            prev.map((div, i) => {
                let jaIndex = japaneseBlock[i].props.id.substring(2) // need to get different index from above as Japanese block is in randomized order unlike the English and Drop Blocks
                if(String(jaIndex) === String(index)){
                    return <div key={index} className="japaneseDivs" id={"ja" + index} style={{color: color}}> {playingDeck[index]["ja"]}</div>
                }else{
                    return div
                }
            })
        )
    }

    // adjusts the properties of each div related to an incorrect drag and drop
    const handleIncorrect = (index) => {
        incorrectRef.current = incorrectRef.current + 1
        let tempIncorrectIndexes = incorrectIndexes.current
        tempIncorrectIndexes[index] = 1
        incorrectIndexes.current = tempIncorrectIndexes
        
        // looks at each element/div inside the Japanese div and updates if it was the div that was dragged 
        setJapaneseBlock((prev) => 
            prev.map((div, i) => {
                let jaIndex = japaneseBlock[i].props.id.substring(2) 
                if(String(jaIndex) === String(index)){
                    return <div key={index} className="japaneseDivs" id={"ja" + index} style={{color: "red"}} onDragStart = {(e) => onDragStart(e, index)} draggable> {playingDeck[index]["ja"]}</div>
                }else{
                    return div
                }
            })
        )
    }

    // saves the index of the Japanese div that is being dragged
    const onDragStart = (ev, index) => {
        ev.dataTransfer.setData("index", index)
    }

    // prevents the default behavior of a dragOver as otherwise it doesn't work
    const onDragOver = (ev) => {
        ev.preventDefault()
    }

    // retrieves the index of the dragged div and handle appropriately depending on if it matches the index of the div it was dragged onto or not
    const onDrop = (ev, index) => {
        let draggingId = ev.dataTransfer.getData("index")
        if(String(index) === String(draggingId)){
            handleCorrect(index, draggingId)
        }else{ 
            handleIncorrect(draggingId)
        }
    }

    const initializeEnglish = () => {
        return playingDeck.map((item, index) => <div key={index} id={"en" + index}> {item["en"]} </div>)
    }

    const initializeDrop = () => {
        return playingDeck.map((item, index) => <div key={index} className='dropDivs' id={"dr" + index} onDrop = {(e) => onDrop(e, index)} onDragOver = {(e) => onDragOver(e, index)} style={{outline: "0.01em solid black"}} >- - -</div>)
    }

    const initializeJapanese = () => {
        let ja = playingDeck.map((item, index) => <div key={index} className='japaneseDivs' id={"ja" + index} onDragStart = {(e) => onDragStart(e, index)} draggable> {item["ja"]} </div>)
        for(let i = ja.length - 1; i > 0; i--){ // shuffles the order of the japanese cards
            var j = Math.floor(Math.random() * (i + 1));   
            var temp = ja[i];
            ja[i] = ja[j];
            ja[j] = temp;
        }
        return ja
    }

    const [englishBlock, setEnglishBlock] = useState(() => initializeEnglish()) 
    const [dropBlock, setDropBlock] = useState(() => initializeDrop()) 
    const [japaneseBlock, setJapaneseBlock] = useState(() => initializeJapanese()) 
    const [resultsComponent, setResultsComponent] = useState(null)

    return (
        <div className="midGame">
            <p>Drag the Japanese Word to the Drop Zone that matches the English Word!</p>
            <div className="gameContents">
                <div className="english">
                    <h2>English</h2>
                    {englishBlock}
                </div>
                <div className="dropzone">
                    <h2>Drop Zone</h2>
                    {dropBlock}
                </div>
                <div className="japanese">
                    <h2>Japanese</h2>
                    {japaneseBlock}
                </div>
            </div>
            {resultsComponent}
            <h4>Return to game settings</h4>
            <IconButton variant="contained" onClick={() => goBack(false)}><KeyboardBackspaceIcon/></IconButton>
        </div>
    )
}

export default Midgame