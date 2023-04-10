import { useState } from 'react'

import Menu from '../components/flashcards/Menu'
import Practice from '../components/flashcards/Practice'
import Review from '../components/flashcards/Review'

import { useSearchParams } from 'react-router-dom'

const Flashcards = () => {

    const [queryParams] = useSearchParams()
    const getState = () => {
        const q = queryParams.get('review')
        if(q !== null){
            return "Review"
        }else{
            return "Menu"
        }
    }

    const [mode, setMode] = useState(getState())
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
        focusedComponent = <Review callback={switchMode}/> 
    }

    return (
        <div>
            {focusedComponent}
        </div>
    )
}

export default Flashcards