import React, { useRef, useEffect } from 'react';



const Map = props => {
    const mapRef = useRef();
    const center = props.marker || { lat: 46.4992011, lng: 18.4157431 };
    const zoom = 16;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
        });
        new window.google.maps.Marker({ position: center, map: map })
    }, [center, zoom])
    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        ></div>
    );

}

export default Map;

