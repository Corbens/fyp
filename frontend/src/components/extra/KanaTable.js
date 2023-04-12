import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const KanaTable = ({ katakana }) => {

    const rows = !katakana ? [
        ["∅", "あ", "い", "う", "え", "お"],
        ["k", "か", "き", "く", "け", "こ"],
        ["s", "さ", "し", "す", "せ", "そ"],
        ["t", "た", "ち", "つ", "て", "と"],
        ["n", "な", "に", "ぬ", "ね", "の"],
        ["h", "は", "ひ", "ふ", "へ", "ほ"],
        ["m", "ま", "み", "む", "め", "も"],
        ["y", "や", "", "ゆ", "", "よ"],
        ["r", "ら", "り", "る", "れ", "ろ"],
        ["w", "わ", "", "", "", "を"],
    ] :
    [
        ["∅", "ア", "イ", "ウ", "エ", "オ"],
        ["k", "カ", "キ", "ク", "ケ", "コ"],
        ["s", "サ", "シ", "ス", "セ", "ソ"],
        ["t", "タ", "チ", "ツ", "テ", "ト"],
        ["n", "ナ", "ニ", "ヌ", "ネ", "ノ"],
        ["h", "ハ", "ヒ", "フ", "ヘ", "ホ"],
        ["m", "マ", "ミ", "ム", "メ", "モ"],
        ["y", "ヤ", "", "ユ", "", "ヨ"],
        ["r", "ラ", "リ", "ル", "レ", "ロ"],
        ["w", "ワ", "", "", "", "ヲ"],
    ] 

    const theme = createTheme({
        palette: {
            background: { paper: "#b9a4ff"},
        }
    })
      
    return(
        <div className="kanaTable">
            <Box display="flex" justifyContent="center" alignItems="center">
                <ThemeProvider theme={theme}>
                    <TableContainer component={Paper} sx={{ width: 600 }}>
                        <Table size="small" sx={{ 'h4': {fontSize: 16} }}>
                            <TableHead>
                                <TableRow sx={{ 'th': {borderBottom: "thin solid black", borderRight: "thin solid black"}, 'th:last-of-type': {borderRight: 0} }}>
                                    <TableCell></TableCell>
                                    <TableCell align="center"><h4>a</h4></TableCell>
                                    <TableCell align="center"><h4>i</h4></TableCell>
                                    <TableCell align="center"><h4>u</h4></TableCell>
                                    <TableCell align="center"><h4>e</h4></TableCell>
                                    <TableCell align="center"><h4>o</h4></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index} sx={{ 'td, th': {borderBottom: "thin solid black", borderRight: "thin solid black"}, '&:last-child td, &:last-child th': { borderBottom: 0 }, 'td:last-of-type': {borderRight: 0} }}>
                                    <TableCell align="center" component="th" scope="row"><h4>{row[0]}</h4></TableCell>
                                    <TableCell align="center">{row[1]}</TableCell>
                                    <TableCell align="center">{row[2]}</TableCell>
                                    <TableCell align="center">{row[3]}</TableCell>
                                    <TableCell align="center">{row[4]}</TableCell>
                                    <TableCell align="center">{row[5]}</TableCell>
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

export default KanaTable