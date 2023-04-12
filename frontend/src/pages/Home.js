import Today from '../components/home/Today'
import Maps from '../components/home/Maps'
import HistoryBar from '../components/home/HistoryBar'
import Leaderboard from '../components/home/Leaderboard'

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