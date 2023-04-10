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
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Lesson Number</TableCell>
                                <TableCell>Lesson Name</TableCell>
                                <TableCell>Completed?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                            className='lessonEntry'
                            onClick={() => navigate("hiragana")}
                            key="hiragana"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell>1</TableCell>
                            <TableCell>Hiragana</TableCell>
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