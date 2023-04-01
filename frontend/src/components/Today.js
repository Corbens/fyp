import { useAuthContext } from '../hooks/useAuthContext'
import { getSpecialDay } from '../utilities/AnniversaryDates'

const Today = () => {
    const { user } = useAuthContext()
    const date = new Date()
    const specialDay = getSpecialDay(date)

    // const dateTime = () => {
    //     const d = new Date();
    //     let diff = d.getTimezoneOffset();
    //     d.setHours(d.getHours() - diff/60)
    //     return d
    // }
    // get user timezone
    // compare date at that timezone to our timezone to calculate hours shift
    // have a current date object which you update by the timezone shift
    // get the date of this time object

    return(
        <div className="today">
            <h2>Welcome</h2>
            <div className="todayContents">
            <p>こんにちは {user.username}! </p> 
                { (specialDay.ja === "") ? <p>Today there is no special day!</p> :  
                <div className="specialDay">
                    <p> Today's date is {date.getMonth()}月{date.getDate()}日 which is  
                    <ruby>
                         {specialDay.ja} <rt> {specialDay.fu} </rt>
                    </ruby> 
                    in Japan. It means {specialDay.en}. <a href="https://ja.wikipedia.org/wiki/日本の記念日一覧">Find more here.</a></p>
                </div>
            }
            </div>
        </div>
    )

}

export default Today