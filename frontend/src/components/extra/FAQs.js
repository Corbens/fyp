import { useState } from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

import { getGeneral, getHome, getLessons, getDragdrop, getFlashcards, getKanji } from '../../utilities/FAQs'

const FAQs = () => {

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
            <Accordion expanded={expanded === 'general'} onChange={handleChange('general')} disableGutters>
                <AccordionSummary sx={{backgroundColor: "#E5E4E2"}} expandIcon={<ExpandMoreIcon />} id="generalHeader"><h4>General</h4></AccordionSummary>
                <AccordionDetails sx={{backgroundColor: "#F6F6F6"}}>
                    {getGeneral().map((qa) => (
                        <div>
                            {qa.question}
                            {qa.answer}
                            <Divider/>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'home'} onChange={handleChange('home')} disableGutters>
                <AccordionSummary sx={{backgroundColor: "#E5E4E2"}} expandIcon={<ExpandMoreIcon />} id="homeHeader"><h4>Home</h4></AccordionSummary>
                <AccordionDetails sx={{backgroundColor: "#F6F6F6"}}>
                    {getHome().map((qa) => (
                        <div>
                            {qa.question}
                            {qa.answer}
                            <Divider/>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'lessons'} onChange={handleChange('lessons')} disableGutters>
                <AccordionSummary sx={{backgroundColor: "#E5E4E2"}} expandIcon={<ExpandMoreIcon />} id="lessonsHeader"><h4>Lessons</h4></AccordionSummary>
                <AccordionDetails sx={{backgroundColor: "#F6F6F6"}}>
                    {getLessons().map((qa) => (
                        <div>
                            {qa.question}
                            {qa.answer}
                            <Divider/>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'dragdrop'} onChange={handleChange('dragdrop')} disableGutters>
                <AccordionSummary sx={{backgroundColor: "#E5E4E2"}} expandIcon={<ExpandMoreIcon />} id="dragdropHeader"><h4>Drag & Drop</h4></AccordionSummary>
                <AccordionDetails sx={{backgroundColor: "#F6F6F6"}}>
                    {getDragdrop().map((qa) => (
                        <div>
                            {qa.question}
                            {qa.answer}
                            <Divider/>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'flashcards'} onChange={handleChange('flashcards')} disableGutters>
                <AccordionSummary sx={{backgroundColor: "#E5E4E2"}} expandIcon={<ExpandMoreIcon />} id="flashcardsHeader"><h4>Flashcards</h4></AccordionSummary>
                <AccordionDetails sx={{backgroundColor: "#F6F6F6"}}>
                    {getFlashcards().map((qa) => (
                        <div>
                            {qa.question}
                            {qa.answer}
                            <Divider/>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'kanji'} onChange={handleChange('kanji')} disableGutters>
                <AccordionSummary sx={{backgroundColor: "#E5E4E2"}} expandIcon={<ExpandMoreIcon />} id="kanjiHeader"><h4>Kanji</h4></AccordionSummary>
                <AccordionDetails sx={{backgroundColor: "#F6F6F6"}}>
                    {getKanji().map((qa) => (
                        <div>
                            {qa.question}
                            {qa.answer}
                            <Divider/>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default FAQs