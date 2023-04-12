import {useState, useEffect} from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Leaderboard = () => {

    const { user } = useAuthContext() 

    const [data, setData] = useState(null)

    useEffect(() => {
        if (!data) {
            axios.get("user/getleaderboard", { 
            }).then((response) => {
                setData(response.data.leaderboard)
            }).catch((error) => {
            })
        }
    });


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
                        {data.map((value, index) => (
                            <TableRow key={index} sx={{ '&:last-child td': { border: 0 }, 'td': {borderBottom: "thin solid black"} }}>
                                <TableCell align="left">{index+1}</TableCell>
                                <TableCell align="left">{(user.email === value.email) ? "* " +  value.username + " (" + value.email + ")" : value.username + " (" + value.email + ")" }</TableCell>
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