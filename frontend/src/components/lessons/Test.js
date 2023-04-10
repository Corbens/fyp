import { useState } from 'react'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Test = ({ slide }) => {

    const [testNum, setTestNum] = useState(0)
    const [testAnswer, setTestAnswer] = useState(null)
    const [answered, setAnswered] = useState(false)

    const handleAnswerClick = (correct) => {
        if(correct){
            setTestAnswer(
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <h2>Correct!</h2>
                    {(testNum+1 < slide.content.length) &&
                    <Button variant="outlined" onClick={nextQuestion}>Next Question</Button>}
                </Stack>
            )
        }else{
            setTestAnswer(
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <h2>Incorrect!</h2>
                    {(testNum+1 < slide.content.length) &&
                    <Button variant="outlined" onClick={nextQuestion}>Next Question</Button>}
                </Stack>
            )
        }
        setAnswered(true)
    }

    const nextQuestion = () => {
        setTestNum(testNum+1)
        setAnswered(false)
        setTestAnswer(null)
    }



    return(
        <div className="slideDiv">
            <div className="slideTitle">
                <h2>{slide.title}</h2>
            </div>
            <div className="slideContents">
                <p>{slide.content[testNum].task}</p>
                <h1>{slide.content[testNum].display}</h1>
                <Stack direction="row" spacing = {5} alignItems="center" justifyContent="center" >
                    {!answered ? 
                        slide.content[testNum].choices.map((value, index) => (
                            <div onClick={() => handleAnswerClick(value.right)}>
                                <h2>{value.value}</h2>
                            </div>
                        ))
                    :
                        slide.content[testNum].choices.map((value, index) => (
                            <div> 
                                <h2 style={{'color':` ${value.right ? 'blue' : 'red'}`}}>{value.value}</h2>
                            </div>
                        ))
                    }
                </Stack>
                {testAnswer}
                <h3>Question {testNum+1} of {slide.content.length}</h3>
            </div>
        </div>
    )
}

export default Test