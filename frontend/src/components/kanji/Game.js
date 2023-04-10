import { useState } from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal'
import Tooltip from '@mui/material/Tooltip'


const Game = ({ theKanji, kanjiNum, callback }) => {

    const [neededComponents, setNeededComponents] = useState(null)

    const shuffleKanjiComponents = () => {
        let theKanjiComponents = theKanji.components
        for(let i = theKanjiComponents.length -1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1))
            var temp = theKanjiComponents[i]
            theKanjiComponents[i] = theKanjiComponents[j]
            theKanjiComponents[j] = temp
        }
        let returnKanji = theKanji
        returnKanji.components = theKanjiComponents
        let theNeededComponents = []
        for(let comp in returnKanji.components){
            theNeededComponents.push(returnKanji.components[comp].present)
        }
        setNeededComponents(theNeededComponents)
        return returnKanji
    }

    const [kanji] = useState(() => shuffleKanjiComponents()) 
    const [showKanji, setShowKanji] = useState(false)
    const [selectedComponents, setSelectedComponents] = useState([false, false, false, false, false, false, false, false, false])
    const [amountShown, setAmountShown] = useState(null)
    const [incorrectShown, setIncorrectShown] = useState(false)
    const [success, setSuccess] = useState(false)
    const [checked, setChecked] = useState(false)
    const [moveOnMessage] = useState(kanjiNum !== 4 ? "Next Kanji" : "Results")

    const handleClick = (index) => { 
        if(!finished){
            setSelectedComponents((prev) => 
                prev.map((value, num) => {
                    if(index === num){
                        return !value
                    }else{
                        return value
                    }
                })
            )
        }
        if(incorrectShown){
            setIncorrectShown(false)
        }
    }

    const showIncorrect = () => {
        setIncorrectShown(true)
    }

    const displayAmount = () => {
        let count = 0
        for(let x in neededComponents){
            if(neededComponents[x]){
                count = count + 1
            }
        }
        setAmountShown("There are " + count + " components needed to create this Kanji!")
    }

    const [finished, setFinished] = useState(false)
    const checkCorrect = () => {
        if(selectedComponents.every((val, index) => val === neededComponents[index])){
            setFinished(true)
            setSuccess(true)
        }else{
            setChecked(true)
        }
    }

    const giveup = () => {
        setFinished(true)
        setSelectedComponents((prev) => 
            prev.map((value, num) => {
                return neededComponents[num]
            })
        )
    }

    const [showInfo, setShowInfo] = useState(false)
    const handleInfoOpen = () => {
        setShowInfo(true)
    }
    const handleInfoClose = () => {
        setShowInfo(false)
    }

    return(
        <div className="kanjiContents">
            <div className="targetKanji">
                <Grid container spacing={2} >
                    <Grid item xs={9}>
                        <Stack direction="column" spacing={1} justifyContent="center">
                            <p>Given the English translation of a Kanji, select only the components necessary to create the given Kanji. A component is indicated as selected if it is in blue. If you are stuck, use the hints below!</p>
                            <h1>Kanji: {kanji.english} {showKanji && kanji.kanji}</h1>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} alignItems="center" justifyContent="center">
                        <h2>Kanji {kanjiNum+1} of 5</h2>
                    </Grid>
                </Grid>
            </div>
            <br/>
                <Grid container spacing={0} >
                    <Grid item xs={9}>
                        <div className="components">
                        <Grid container spacing={0}>
                            {kanji.components.map((value, index) => (
                                <Grid item xs={4}>
                                    <div onClick={() => handleClick(index)} className='kanjiComponent'>
                                        {incorrectShown && (selectedComponents[index] && !neededComponents[index]) ? 
                                            <h1 style={{'color': 'red'}}>{value.char}</h1>
                                            :
                                            <h1 style={{'color':` ${selectedComponents[index] ? 'blue' : 'black'}`}}>{value.char}</h1>
                                        }
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="hints">
                            <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" > 
                                <h1>Hints</h1>
                                {amountShown ? amountShown : <Button variant='outlined' disabled={amountShown} onClick={() => displayAmount()}>How Many Components Are There?</Button>}
                                <Button variant='outlined' onClick={() => showIncorrect()}>Show Incorrect Selections</Button>
                                {!showKanji ? <Button variant='outlined' onClick={() => setShowKanji(true)}>Show what the Kanji looks like!</Button> : <p>The Kanji is shown at the top!</p>}
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            <div className="endSection">
                {finished ? 
                    <Grid container spacing={0}>
                        <Grid item xs={9}>
                            {success ? 
                                <Tooltip title="This circle is used similarly to a tick in western countries indicating something that is correct. However, a tick in Japan can often be used to indicate that something is incorrect!">
                                    <h1>⭕ Well Done!</h1> 
                                </Tooltip>
                                : 
                                <div>
                                    <Tooltip title="This cross is used similarly to how it is used in western countries, indicating that an answer is incorrect.">
                                        <h1>❌ Better Luck Next Time!</h1>
                                    </Tooltip>
                                    <p>The correct components have now been selected</p>
                                </div>
                            }
                            <Button variant='outlined' onClick={() => handleInfoOpen()}>Learn more about this Kanji!</Button>
                            <Button variant='outlined' onClick={() => callback(success)}>{moveOnMessage}</Button>
                        </Grid>
                    </Grid>
                    : 
                    <Grid container spacing={0}>
                        <Grid item xs={9}>
                            <Stack spacing={2} justifyContent="center">
                                <br/>
                                <Button variant='outlined' onClick={() => checkCorrect()}>Check If All Correct</Button> 
                                <Button variant='outlined' onClick={() => giveup()}>Give Up</Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={3}>
                            {checked && <h2>Not Yet Correct!</h2>}
                        </Grid>
                    </Grid>
                }
            </div>
            <Modal open={showInfo} onClose={handleInfoClose} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className="informationModal">
                    <Stack spacing={1}> 
                        <br/>
                        <h4>Kanji - {kanji.kanji}</h4>
                        <h4>English - {kanji.english}</h4>
                        <h4>Kunyomi Reading - {kanji.kunReading}</h4>
                        <h4>Onyomi Reading - {kanji.onReading}</h4>
                        <h4>More Information - {kanji.description}</h4>
                        <br/>
                        <Button variant='outlined' onClick={() => handleInfoClose()}>Close</Button>
                    </Stack>
                </div>
            </Modal>
        </div>
    )
}

export default Game