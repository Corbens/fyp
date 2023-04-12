import { useNavigate } from 'react-router-dom'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Lessons = () => {
    const navigate = useNavigate()

    return(
        <div className="preLessonsDiv">
            <div className="preLessonsTitle">
                <h2>Lessons</h2>
                <p>Click on a lesson to begin!</p>
            </div>

            <div className='lessonsList'>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ 'th' : { background: "#b9a4ff", borderBottom: "thin solid black" }, 'h4' : { marginTop: 0, marginBottom: 0} }}>
                                <TableCell><h4>Lesson Number</h4></TableCell>
                                <TableCell><h4>Lesson Name</h4></TableCell>
                                <TableCell><h4>Completed?</h4></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow className='lessonEntry' onClick={() => navigate("hiragana")} key="hiragana" sx={{ '&:last-child td': { border: 0 }, 'td': {borderBottom: "thin solid black"} }}>
                                <TableCell>1</TableCell>
                                <TableCell>Hiragana</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow className='lessonEntry' sx={{ '&:last-child td': { border: 0 }, 'td': {borderBottom: "thin solid black"} }}>
                                <TableCell>2</TableCell>
                                <TableCell>Katakana</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow className='lessonEntry' sx={{ '&:last-child td': { border: 0 }, 'td': {borderBottom: "thin solid black"} }}>
                                <TableCell>3</TableCell>
                                <TableCell>Kanji</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                { // toggle button (mui) to select or sort by filter. 
                    // have autocomplete box where user can search for a lesson too. 
                    // have a clickable bar. this bar should include the tags, the title, and any other necessary information.
                }

            </div>
        </div>
    )
}

export default Lessons