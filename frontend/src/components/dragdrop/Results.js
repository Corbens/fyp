import { useRef } from 'react'

import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

const Results = ({results, callback}) => {

    const getIcon = () => {
        if(results.score >= 80){
            return ["💮", "This white flower can be used to signify celebration, praise or success on a job well done!"] 
        }else if(results.score >= 60){
            return ["🈴️", "This emoji features the kanji symbolizing a passing grade or passing an exam!"]
        }else if(results.score >= 40){
            return ["🉐️", "This emoji is used regarding a gain or sometimes a loss. In this case it symbolizes the opportunity to work hard and improve!"]
        }else{
            return ["❌", "Fail!"] 
        }
    }

    const iconRef = useRef(getIcon())

    return (
        <div className="displayResults">
            <h2>Results</h2>
            <Tooltip title={iconRef.current[1]}>
                <h1>{iconRef.current[0]}</h1>
            </Tooltip>
            <p>Score: {results.score}</p>
            <p>You got {results.incorrectCards.filter(i => i === 0).length} / {results.playingDeck.length} cards correct!</p> 
            <Button variant="outlined" onClick={() => callback(true)}>Play Again</Button>
        </div>
    )
    
}

export default Results