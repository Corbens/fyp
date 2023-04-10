const Information = ({ slide }) => {

    return(
        <div className="slideDiv">
            <div className="slideTitle">
                <h2>{slide.title}</h2>
            </div>
            <div className="slideContents">
                <p>{slide.content}</p>
            </div>
        </div>
    )
}

export default Information