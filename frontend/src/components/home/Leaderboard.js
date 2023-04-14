import {useState, useEffect} from 'react'
import axios from 'axios'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAuthContext } from '../../hooks/useAuthContext'

const Leaderboard = () => {

    const { user } = useAuthContext() 

    const [data, setData] = useState(null)
    const [userPos, setUserPos] = useState(0)

    useEffect(() => {
        if (!data) {
            axios.get("user/getleaderboard", { 
            }).then((response) => {
                setData(response.data.leaderboard)
                setUserPos(response.data.leaderboard.indexOf(response.data.leaderboard.find(value => value.email === user.email)))
            }).catch((error) => {
            })
        }
    })

    return(
        <div>
            {data &&
            <div className="homeComponent">
                <div className="homeTitle">
                    <h2>Leaderboard</h2>
                </div>
                <div className='homeContents'>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ 'th': {borderBottom: "thin solid black"} }}>
                                <TableCell><h3>Rank</h3></TableCell>
                                <TableCell><h3>User</h3></TableCell>
                                <TableCell><h3>Experience Points</h3></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={"logged"} sx={{ '&:last-child td': { border: 0 }, 'td': {borderBottom: "thin solid black", background: "#b9a4ff"} }}>
                                <TableCell align="left"><h4>{userPos + 1}</h4></TableCell>
                                <TableCell align="left"><h4>{data[userPos].username + " (" + data[userPos].email + ")"}</h4></TableCell>
                                <TableCell align="left"><h4>{data[userPos].experience}</h4></TableCell>
                            </TableRow>
                            {data.slice(0, 5).map((value, index) => (
                            <TableRow key={index} sx={{ '&:last-child td': { border: 0 }, 'td': {borderBottom: "thin solid black"} }}>
                                <TableCell align="left">{index+1}</TableCell>
                                <TableCell align="left">{value.username}</TableCell>
                                <TableCell align="left">{value.experience}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            }
        </div>
    )
}

export default Leaderboard