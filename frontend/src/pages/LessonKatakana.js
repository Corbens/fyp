import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Information from '../components/lessons/Information'
import Test from '../components/lessons/Test'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from '@mui/material/Button';

import { getKatakana } from '../utilities/Lessons'

const LessonKatakana = () => {
    const navigate = useNavigate()

    const [pages] = useState(getKatakana().pages)
    const [page, setPage] = useState(0)

    const changePage = (forward) => {
        if(forward){
            setPage(page+1)
        }else{
            setPage(page-1)
        }
    }

    let focusedComponent
    if (pages[page].type === "Information") {
        focusedComponent = <Information slide={pages[page]}/> 
    } else { // type === "Test"
        focusedComponent = <Test slide={pages[page]}/> 
    } 

    return(
        <div>
            <h2>{getKatakana().title}</h2>
            <br/>
            <div className="lessonContent">
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        {(page !== 0) &&
                            <Tooltip title="Previous Slide">
                                <IconButton variant="contained" onClick={() => changePage(false)}><ArrowLeftIcon sx={{ fontSize: "80px" }}/></IconButton>
                            </Tooltip>
                        }
                    </Grid>
                    <Grid item xs={10}>
                        <div className="lessonSlide">
                            {focusedComponent}
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        {(page+1 < pages.length) &&
                            <Tooltip title="Next Slide">
                                <IconButton variant="contained" onClick={() => changePage(true)}><ArrowRightIcon sx={{ fontSize: "80px" }}/></IconButton>
                            </Tooltip>
                        }
                    </Grid>
                </Grid>
            </div>
            <br/>
            <Stack direction="column" spacing={0} alignItems="center" justifyContent="center">
                <h4>Slide {page+1} of {pages.length}</h4>
                <Button variant='outlined' onClick={()=>navigate("/lessons")}>Go Back To All Lessons</Button>
            </Stack>
        </div>
    )
}

export default LessonKatakana