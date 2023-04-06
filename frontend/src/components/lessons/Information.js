const Information = ({ slide }) => {

    return(
        <div>
            <h2>{slide.title}</h2>
            <p>{slide.content}</p>
        </div>
    )
}

export default Information