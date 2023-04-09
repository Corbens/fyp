import ReviewMenu from './ReviewMenu'
import PracticeMenu from './PracticeMenu'

const Menu = ({ callback }) => {
    return(
        <div className='flashcardsSettings'>
            <h2>Instructions:</h2>
            <p>Choose from two game modes: Practice and Review! Practice allows you to flip flashcards and test your knowledge at your own pace. Review shows you cards following a Spaced Repetition Schedule just before you are likely to forget them. This strengthens the association in your brain!</p>
            <PracticeMenu callback={callback}/>
            <ReviewMenu callback={callback}/>
        </div>
    )
}

export default Menu