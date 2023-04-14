import ReviewMenu from './ReviewMenu'
import PracticeMenu from './PracticeMenu'

const Menu = ({ callback }) => {
    return(
        <div className='flashcardsMenu'>
            <PracticeMenu callback={callback}/>
            <ReviewMenu callback={callback}/>
        </div>
    )
}

export default Menu