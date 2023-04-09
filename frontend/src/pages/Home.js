import Today from '../components/Today'
import Maps from '../components/Maps'
import HistoryBar from '../components/HistoryBar'
import Leaderboard from '../components/Leaderboard'
import './home.css'

const Home = () => {
    return (
        <div className="home">
            <Today/>
            <Maps/>
            <HistoryBar/>
            <Leaderboard />
        </div>
    )
}

export default Home