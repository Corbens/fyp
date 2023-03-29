import { useState } from 'react'

import './flashcards.css'
import Menu from '../components/flashcards/Menu'
import Practice from '../components/flashcards/Practice'
import Review from '../components/flashcards/Review'

const Flashcards = () => {

    const [mode, setMode] = useState("Menu")
    const [deck, setDeck] = useState(null)

    const switchMode = (newMode, newDeck) => {
        setMode(newMode)
        setDeck(newDeck)
    }

    let focusedComponent
    if (mode === "Menu") {
        focusedComponent = <Menu callback={switchMode}/>
    } else if (mode === "Practice"){ 
        focusedComponent = <Practice callback={switchMode} deck={deck}/> 
    } else { // mode === "Review"
        focusedComponent = <Review callback={switchMode}/> // don't need to pass a deck, can get review elements as know the user. 
    }

    return (
        <div className="flashcards">
            {focusedComponent}
        </div>
    )
}

export default Flashcards