import { useAuthContext } from '../hooks/useAuthContext'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { getDate } from '../utilities/HandleDate';

const HistoryBar = () => {
    const { user } = useAuthContext()

    const [component, setComponent] = useState()

    const firstRender = useRef(true)
    useEffect(() => {
        // actually, store the history in the user object when saved to local storage so don't have to keep requesting backend for this data.
        if (firstRender.current) {
            firstRender.current = false
            axios.post("user/gethistory", { 
                email: user.email,
            }).then((response) => {
                let history = response.data.history
                if(history.length !== 0){
                    setComponent(history.slice(0, 5).map((item, index) => <div className="historyCard" key={index}> {item.type} - {item.score} <br/> {getDate(item.dateTime, true)} </div>))
                }else{
                    setComponent(<div>No Match History</div>)
                }
            }).catch((error) => {
                setComponent(<div>No Match History</div>)
            })
        }
    });

    return(
        <div className="homeComponent">
            <div className="homeTitle">
                <h2>Recent Game History</h2>
            </div>
            <div className="homeContents historyCards">
            {component}
            </div>
        </div>
    )
}

export default HistoryBar