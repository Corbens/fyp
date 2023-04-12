import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Numbers = () => {

    const rows = [
        ["1", "一", "いち", "ひと"],
        ["2", "二", "に", "ふた"],
        ["3", "三", "さん", "みっ"],
        ["4", "四", "し", "よん"],
        ["5", "五", "ご", "いつ"],
        ["6", "六", "ろく", "むっ"],
        ["7", "七", "しち", "なな"],
        ["8", "八", "はち", "やっ"],
        ["9", "九", "きゅう", "ここの"],
        ["10", "十", "じゅう", "とお"],
        ["100", "百", "ひゃく", ""],
        ["1,000", "千", "せん", ""],
        ["10,000", "万", "まん", ""],
    ]

    const theme = createTheme({
        palette: {
            background: { paper: "#b9a4ff"},
        }
    })

    return(
        <div>
            <Box display="flex" justifyContent="center" alignItems="center">
                <ThemeProvider theme={theme}>
                    <TableContainer component={Paper} sx={{ width: 600 }}>
                        <Table size="small" sx={{ 'h4': {fontSize: 16} }}>
                            <TableHead>
                                <TableRow sx={{ 'th': {borderBottom: "thin solid black", borderRight: "thin solid black"}, 'th:last-of-type': {borderRight: 0} }}>
                                    <TableCell align="center"><h4>Numeral</h4></TableCell>
                                    <TableCell align="center"><h4>Kanji Character</h4></TableCell>
                                    <TableCell align="center"><h4>On Reading</h4></TableCell>
                                    <TableCell align="center"><h4>Kun Reading</h4></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index} sx={{ 'td': {borderBottom: "thin solid black", borderRight: "thin solid black"}, '&:last-child td': { borderBottom: 0 }, 'td:last-of-type': {borderRight: 0} }}>
                                    <TableCell align="center">{row[0]}</TableCell>
                                    <TableCell align="center">{row[1]}</TableCell>
                                    <TableCell align="center">{row[2]}</TableCell>
                                    <TableCell align="center">{row[3]}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ThemeProvider>
            </Box>
        </div>
    )
}

export default Numbers