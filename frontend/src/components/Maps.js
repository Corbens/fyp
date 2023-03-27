import { useState, useEffect } from 'react'

const Maps = () => {
    const [mapUrl, setMapUrl] = useState("https://www.google.com/maps/embed/v1/view?key=AIzaSyCZMzEZQWGRbE5CjilT091qdUHaKoFUekY&center=35.6587301,139.7457922&zoom=13&language=ja")

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setMapUrl("https://www.google.com/maps/embed/v1/view?key=AIzaSyCZMzEZQWGRbE5CjilT091qdUHaKoFUekY&center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=13&language=ja")
                //console.log(position.coords.latitude, position.coords.longitude)
            })
        }
    }, []);

    return(
        <div className='maps'>
            <h2>Explore The World With Japanese Names</h2>
            <div className='mapsContents'>
                <iframe
                    title='mapFrame'
                    width="600"
                    height="300"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapUrl}
                >
                </iframe>
            </div>
        </div>
    )
}

export default Maps