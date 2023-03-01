//use the handleCorrect function to demonstrate what you learned about react updating useState.
//don't mutate variable (i.e. the array) as it doesn't detect the change, hence we have to use map
//https://stackoverflow.com/questions/64982593/react-doesnt-rerender-on-an-array-state-update


import { useState, useEffect } from 'react'

const Midgame = (props) => {

    const getPlayingDeck = () => { //gets the playing deck
        let decksArr = JSON.parse(props.deck)["decks"]
        let combinedDeck = []
        let playingDeck = []
        let cards = 5 //get number of cards you're playing with from props which will be able to be set in the settings component(s)
        
        for(let i = 0; i < decksArr.length; i++){ //combine the decks into one
            for(let j = 0; j < decksArr[i]["contents"].length; j++){ 
                combinedDeck.push(decksArr[i]["contents"][j])
            }
        }
        
        for(let i = combinedDeck.length - 1; i > 0; i--){ //shuffle the order of the combined deck
            var j = Math.floor(Math.random() * (i + 1));   
            var temp = combinedDeck[i];
            combinedDeck[i] = combinedDeck[j];
            combinedDeck[j] = temp;
        }
        for(let i = 0; i < cards; i++){ //get the first cards number of cards and put into the playing deck
            playingDeck.push(combinedDeck[i])
        }
        return playingDeck
    }

    const [playingDeck] = useState(() => getPlayingDeck())

    const handleCorrect = (index) => {
        console.log("correct")

        let newBlock = [...englishBlock]
        console.log(newBlock)
        for(let div in newBlock){
            if(String(div) === String(index)){
                newBlock[index] = (<div id={"dr" + index} style={{color: "green"}} >{playingDeck[index]["en"]}</div>)
            }
        }
        console.log(newBlock)
        setEnglishBlock(newBlock)
        
        console.log("Dropblock: ")
        console.log(dropBlock)
        newBlock = [...dropBlock]
        console.log(newBlock)
        for(let div in newBlock){
            if(String(div) === String(index)){
                newBlock[index] = (<div id={"dr" + index} style={{color: "green"}} >{playingDeck[index]["ja"]}</div>)
            }
        }
        console.log(newBlock)
        setDropBlock([...newBlock])

        newBlock = []
        for(let div in japaneseBlock){
            let thisId = japaneseBlock[div].props.id.substring(2)
            if(String(thisId) === String(index)){
                newBlock.push(<div id={"ja" + index} style={{color: "green"}}> {playingDeck[index]["ja"]}</div>)
            }else{
                newBlock.push(japaneseBlock[div])
            }
        }
        setJapaneseBlock(newBlock)

    }

    const handleIncorrect = (index) => {
        console.log("incorrect")
    }

    const onDragStart = (ev, index) => {
        ev.dataTransfer.setData("index", index)
    }

    const onDragOver = (ev) => {
        ev.preventDefault()
    }

    const onDrop = (ev, index) => {
        let draggingId = ev.dataTransfer.getData("index")
        if(String(index) === String(draggingId)){
            handleCorrect(index)
        }else{
            handleIncorrect(index)
        }
    }

    const initializeEnglish = () => {
        return playingDeck.map((item, index) => <div id={"en" + index}> {item["en"]} </div>)
    }

    const initializeDrop = () => {
        console.log("test")
        return playingDeck.map((item, index) => <div id={"dr" + index} onDrop = {(e) => onDrop(e, index)} onDragOver = {(e) => onDragOver(e, index)} >?㊙️?</div>)
    }

    const initializeJapanese = () => {
        let ja = playingDeck.map((item, index) => <div id={"ja" + index} onDragStart = {(e) => onDragStart(e, index)} draggable> {item["ja"]} </div>)
        for(let i = ja.length - 1; i > 0; i--){ //shuffle the order of the japanese cards
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

    useEffect(() => {
        console.log(englishBlock)
    }, [englishBlock])


    return (
        <div className="midGame">
            <div className="english">
                {englishBlock}
            </div>
            <div className="dropzone">
                {dropBlock}
            </div>
            <div className="japanese">
                {japaneseBlock}
            </div>
        </div>
    )

}

export default Midgame