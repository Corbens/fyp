import { useRef } from 'react'

const Results = ({results, callback}) => {

    const getIcon = () => {
        if(results.score > 75){
            return "💮" // well done/congratulations 
        }else if(results.score > 50){
            return "🈴️" // passing grade
        }else if(results.score > 25){
            return "🉑️" // acceptable
        }else{
            return "❌" // fail
        }
    }

    const iconRef = useRef(getIcon())

    return (
        <div className="endGame">
            <div className="displayResults">
                <h2>Results</h2>
                <p>Score = {results.score} {iconRef.current}</p>
                <p>You got {results.incorrectCards.filter(i => i === 0).length} / {results.playingDeck.length} cards correct!</p> 
            </div>
            <button onClick={() => callback(true)}>Play Again</button>
        </div>
    )
    
}

export default Results