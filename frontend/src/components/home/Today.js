import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { useAuthContext } from '../../hooks/useAuthContext'
import { getSpecialDay } from '../../utilities/AnniversaryDates'
import { getDate } from '../../utilities/HandleDate'

const Today = () => {
    const { user } = useAuthContext()
    const date = new Date()
    const specialDay = getSpecialDay(date)

    const [srsDecks, setSrsDecks] = useState(null)
    const [reviewMessage, setReviewMessage] = useState("0 Cards To Review.")
    const [reviewsAvailable, setReviewsAvailable] = useState(false)
    useEffect(() => {
        if(!srsDecks){
            getSrsDecks()
        }
    })
    const getSrsDecks = () => {
        axios.post("srs/getsrs", { 
            email: user.email,
        }).then((response) => {
            setSrsDecks(response.data.srs)
            updateReviewMessage(response.data.srs)
        }).catch((error) => {
        })
    }
    const updateReviewMessage = (srs) => {
        let count = 0
        let anyEnabled = false
        let soonestDate = new Date("2038-01-01") // one of the latest dates possible in unix just for comparison (rather than using null where can't compare)
        let nowDate = new Date()
        nowDate.setHours(23)
        nowDate.setMinutes(59)
        for(let deck in srs.decks){
            if(srs.decks[deck].enabled){
                anyEnabled = true
                for(let card in srs.decks[deck].srs){
                    let thisDate = new Date(srs.decks[deck].srs[card].date)
                    if(srs.decks[deck].srs[card].date === null || thisDate < nowDate){ 
                        count = count + 1
                    }
                    if(count === 0){
                        if(thisDate < soonestDate){
                            soonestDate = thisDate
                        }
                    }
                }
            }
        }
        if(count === 0){
            setReviewsAvailable(false)
            if(anyEnabled){
                setReviewMessage("0 cards to review. Next reviews due on " + getDate(soonestDate, true))
            }else{

                setReviewMessage("No SRS Decks Enabled")
            }
        }else{
            setReviewsAvailable(true)
            setReviewMessage("You have " + count + " cards to review!")
        }
    }

    return(
        <div className="homeComponent">
            <div className="homeTitle">
                <h2>Welcome</h2>
            </div>
            <div className="homeContents">
                <p>こんにちは {user.username}! </p> 
                { (specialDay.ja === "") ? <p>Today there is no special day!</p> :  
                <div className="specialDay">
                    <p> Today's date is {date.getMonth()}月{date.getDate()}日 which is {specialDay.ja} in Japan. It means {specialDay.en}. <a href="https://ja.wikipedia.org/wiki/日本の記念日一覧">Find out about more Special Days here.</a></p>
                </div>}
                <p>{reviewMessage} {(reviewsAvailable) && <Link to={window.location.href + "flashcards?review"}>Go to Reviews.</Link>} </p>
                <p>Try a new { <Link to={window.location.href + "lessons"}>Lesson!</Link>}</p>
            </div>
        </div>
    )
}

export default Today