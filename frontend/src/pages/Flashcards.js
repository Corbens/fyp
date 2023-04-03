import { useState } from 'react'

import './flashcards.css'
import Menu from '../components/flashcards/Menu'
import PracticeCustom from '../components/flashcards/PracticeCustom'
import PracticePremade from '../components/flashcards/PracticePremade'
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
    } else if (mode === "PracticeCustom"){ 
        focusedComponent = <PracticeCustom callback={switchMode} deck={deck}/> 
    } else if (mode === "PracticePremade"){
        focusedComponent = <PracticePremade callback={switchMode} deck={deck}/> 
    } else { // mode === "Review"
        focusedComponent = <Review callback={switchMode}/> 
    }

    return (
        <div className="flashcards">
            {focusedComponent}
        </div>
    )
}

export default Flashcards