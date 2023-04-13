import { useState } from 'react'
import axios from 'axios'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Information from './Information'
import Test from './Test'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from '@mui/material/Button';

import { useAuthContext } from '../../hooks/useAuthContext'

const Lesson = ({ callback, status, content, num }) => {
    const { user } = useAuthContext()

    const [lessonStatus, setLessonStatus] = useState(status) //get initial from props, therefore change from link method to component method. 
    const [pages] = useState(content.pages)
    const [page, setPage] = useState(0)

    const changePage = (forward) => {
        if(forward){
            setPage(page+1)
        }else{
            setPage(page-1)
        }
    }

    // instantly change on click.
    const changeLessonStatus = () => {
        axios.post("user/updatelessonstatus", { 
            email: user.email,
            lesson: num //this will change depending on props. will be given an index to determine what lesson and a function to get the lesson's data.  also pass what lessonStatus is in props.
        }).then((response) => {
        })
        setLessonStatus(!lessonStatus)
    }

    let focusedComponent
    if (pages[page].type === "Information") {
        focusedComponent = <Information slide={pages[page]}/> 
    } else { // type === "Test"
        focusedComponent = <Test slide={pages[page]}/> 
    } 

    return(
        <div>
            <h2>{content.title}</h2>
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
            <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
                <h4>Slide {page+1} of {pages.length}</h4>
                    <Stack direction="row" spacing={2}>
                        <h4>{lessonStatus ? "Status: Complete" : "Status: Incomplete"}</h4>
                        <Button variant='outlined' onClick={changeLessonStatus}>Change Status</Button>
                    </Stack>
                <Button variant='outlined' onClick={callback}>Go Back To All Lessons</Button>
            </Stack>
        </div>
    )
}

export default Lesson