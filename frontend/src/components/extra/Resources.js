import { useState } from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'

import KanaTable from './KanaTable'
import Numbers from './Numbers'

const Resources = () => {

    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false)
    }

    return(
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "70vh",
            overflow: "hidden",
            overflowY: "scroll",
            padding: "10px"
        }}>
            <div className="resources">
                <Accordion expanded={expanded === 'hiraganaTable'} onChange={handleChange('hiraganaTable')} disableGutters>
                    <AccordionSummary sx={{backgroundColor: "#E5E4E2"}} expandIcon={<ExpandMoreIcon />} id="hiraganaTableHeader"><h4>Hiragana Table</h4></AccordionSummary>
                    <AccordionDetails sx={{backgroundColor: "#F6F6F6"}}>
                        <KanaTable katakana={false}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'katakanaTable'} onChange={handleChange('katakanaTable')} disableGutters>
                    <AccordionSummary sx={{backgroundColor: "#E5E4E2"}} expandIcon={<ExpandMoreIcon />} id="katakanaTableHeader"><h4>Katakana Table</h4></AccordionSummary>
                    <AccordionDetails sx={{backgroundColor: "#F6F6F6"}}>
                        <KanaTable katakana={true}/>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'numbers'} onChange={handleChange('numbers')} disableGutters>
                    <AccordionSummary sx={{backgroundColor: "#E5E4E2"}} expandIcon={<ExpandMoreIcon />} id="numbersHeader"><h4>Numbers</h4></AccordionSummary>
                    <AccordionDetails sx={{backgroundColor: "#F6F6F6"}}>
                        <Numbers/>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Box>
    )
}

export default Resources