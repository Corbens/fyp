import { useState, useEffect } from 'react'
import axios from 'axios'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import Lesson from '../components/lessons/Lesson'
import { getHiragana, getKatakana, getNumbers } from '../utilities/Lessons'
import { useAuthContext } from '../hooks/useAuthContext'

const Lessons = () => {
    const { user } = useAuthContext()
    const lessonContent = [getHiragana(), getKatakana(), getNumbers()] 

    const [lessonStatus, setLessonStatus] = useState(null)
    const [lesson, setLesson] = useState(null)

    const startLesson = (lessonNum) => {
        setLesson(<Lesson callback={callback} status={lessonStatus[lessonNum]} content={lessonContent[lessonNum]} num={lessonNum}/>)
    }

    const callback = () => {
        setLesson(null)
        getLessonStatus()
    }

    const getLessonStatus = () => {
        axios.post("user/getlessonstatus", { 
            email: user.email,
        }).then((response) => {
            setLessonStatus(response.data.lessonStatus)
        })
    }

    useEffect(() => {
        if(!lessonStatus){
            getLessonStatus()
        }
    })

    return(
        <div>
            {!lesson ? 
                <div className="preLessonsDiv">
                    <div className="preLessonsTitle">
                        <h2>Lessons</h2>
                        <p>Lessons allow you to learn an introduction to the topic stated. Navigate through a series of slides and learn about a topic, test your knowledge and see where you can practice further. To start, click on a lesson from the table</p>
                    </div>

                    <div className='lessonsList'>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ 'th' : { background: "#b9a4ff", borderBottom: "thin solid black"}, 'th:first-child': { borderTopLeftRadius: "20px"}, 'th:last-child': { borderTopRightRadius: "20px" } }}>
                                    <TableCell><h2>Lesson Number</h2></TableCell>
                                    <TableCell><h2>Lesson Name</h2></TableCell>
                                    <TableCell><h2>Completed?</h2></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow className='lessonEntry' onClick={() => startLesson(0)} key="hiragana" sx={{ '&:last-child td': { border: 0 }, 'td': {borderBottom: "thin solid black"} }}>
                                    <TableCell><p>1</p></TableCell>
                                    <TableCell><p>Hiragana</p></TableCell>
                                    <TableCell>{lessonStatus && (lessonStatus[0] ? <h2>⭕</h2> : <h2>❌</h2>)}</TableCell>
                                </TableRow>
                                <TableRow className='lessonEntry' onClick={() => startLesson(1)} key="katakana" sx={{ '&:last-child td': { border: 0 }, 'td': {borderBottom: "thin solid black"} }}>
                                    <TableCell>2</TableCell>
                                    <TableCell>Katakana</TableCell>
                                    <TableCell >{lessonStatus && (lessonStatus[1] ? <h2>⭕</h2> : <h2>❌</h2>)}</TableCell>
                                </TableRow>
                                <TableRow className='lessonEntry' onClick={() => startLesson(2)} key="numbers" sx={{ '&:last-child td': { border: 0 }, 'td': {borderBottom: "thin solid black"} }}>
                                    <TableCell>3</TableCell>
                                    <TableCell>Kanji</TableCell>
                                    <TableCell>{lessonStatus && (lessonStatus[2] ? <h2>⭕</h2> : <h2>❌</h2>)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            :
                <div>
                    {lesson}
                </div>
            }
        </div>
    )
}

export default Lessons