import { useState } from 'react'

import Pregame from '../components/dragdrop/Pregame';
import Midgame from '../components/dragdrop/Midgame';
import './dragdrop.css'

const BlankGame = () => {

    const [value, setValue] = useState("Pregame")
    const [deck, setDeck] = useState()
    const [cards, setCards] = useState()
    const [type, setType] = useState()
    const [playCount, setPlayCount] = useState(0)

    let focusedComponent

    // callback function ran from pregame, receives a deck and number of cards which it saves and sets the value of the next state to be midgame
    const preGame = (deck, cards, type) => {
        setValue("Midgame")
        setDeck(deck) 
        setCards(cards)
        setType(type)
    }

    // callback function ran from midgame, receives a newValue determining the next state and a resultObj displaying the results of the game
    const midGame = (playAgain) => {
        if(playAgain){ 
            setPlayCount(playCount + 1) //update playCount state to force rerender and change key of MidGame component
        }else{
            setValue("Pregame")
        }
    }   

    if (value === "Midgame") {
        focusedComponent = <Midgame key={playCount} deck={deck} cards={cards} type={type} callback={midGame}/> // key is playCount so on update it is rerendered to its initial state
    } else { // value === "Pregame"
        focusedComponent = <Pregame callback={preGame}/> 
    } 

    return (
        <div className="blankGame">
            {focusedComponent}
        </div> 
    )
}

export default BlankGame