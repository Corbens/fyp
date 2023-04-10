import { useState } from 'react'

import DragDrop from './DragDrop'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const Midgame = ({deck, cards, type, callback}) => {

    const getFiller = () => {
        if(type === "Vocabulary"){
            return({filler: "- - -", append: false})
        }else if(type === "Verbs"){
            return({filler: deck[num]["verb"], append: true})
        }
    }

    const getPlayingDeck = () => {
        if(type === "Vocabulary"){
            let combinedDeck = []
            let returnDeck = []
            for(let i = 0; i < deck.length; i++){ 
                for(let j = 0; j < deck[i]["contents"].length; j++){ 
                    combinedDeck.push(deck[i]["contents"][j])
                }
            }
            for(let i = combinedDeck.length - 1; i > 0; i--){ 
                let j = Math.floor(Math.random() * (i + 1));   
                let temp = combinedDeck[i];
                combinedDeck[i] = combinedDeck[j];
                combinedDeck[j] = temp;
            }
            for(let i = 0; i < cards; i++){ 
                returnDeck.push(combinedDeck[i])
            }
            return returnDeck
        }else if(type === "Verbs"){
            let verbDeck = []
            let returnDeck = []
            for(let i = 0; i < deck[num]["conjugations"].length; i++){
                verbDeck.push(deck[num]["conjugations"][i])
            }
            for(let i = verbDeck.length - 1; i > 0; i--){ 
                let j = Math.floor(Math.random() * (i + 1));   
                let temp = verbDeck[i];
                verbDeck[i] = verbDeck[j];
                verbDeck[j] = temp;
            }
            for(let i = 0; i < cards; i++){ 
                returnDeck.push(verbDeck[i])
            }
            return(returnDeck)
        }
    }

    const getHelpMessage = () => {
        if(type === "Vocabulary"){
            return 'Drag the Japanese card on the right to the drop zone that matches the English card on the left!'
        }else if(type === "Verbs"){
            return 'Drag the verb ending card on the right to the drop zone that matches the conjugation on the left!'
        }
    }

    const [num] = useState(() => Math.floor(Math.random()*3))
    const [filler] = useState(() => getFiller())
    const [playingDeck] = useState(() => getPlayingDeck())
    const [helpMessage] = useState(() => getHelpMessage())

    return (
        <div className="midgameDiv">
            <DragDrop deck={playingDeck} cards={cards} filler={filler} callback={callback} instructions={helpMessage}/>
            <Tooltip title="Go Back">
                <IconButton variant="contained" onClick={() => callback(false)}><KeyboardBackspaceIcon/></IconButton>
            </Tooltip>
            {/* <Tooltip title={helpMessage}>
                <IconButton><HelpOutlineIcon/></IconButton>
            </Tooltip> */}
        </div>
    )
}

export default Midgame