import Today from '../components/Today'
import Maps from '../components/Maps'
import HistoryBar from '../components/HistoryBar'
import './home.css'

const Home = () => {
    return (
        <div className="home">
            <Today/>
            <Maps/>
            <HistoryBar/>

            

        </div>
    )
}

export default Home