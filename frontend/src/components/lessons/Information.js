//import HiraganaTable from '../HiraganaTable'

const Information = ({ slide }) => {

    return(
        <div className="slideDiv">
            <div className="slideTitle">
                <h2>{slide.title}</h2>
            </div>
            <div className="slideContents">
                {slide.content.map((value, index) => (
                    <div>
                        {slide.content[index]}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Information