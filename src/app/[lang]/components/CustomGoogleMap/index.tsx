// @ts-nocheck
"use client"
import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

type GoogleMapsProps = {
    lat: string;
    lng: string;
    markerTitle: string;
    infoWindowText: string;
    mapId: string;
    zoom?: number;
}

function GoogleMaps({ lat, lng, markerTitle, infoWindowText, mapId, zoom = 16 }: GoogleMapsProps) {
    const [infowindowOpen, setInfowindowOpen] = useState(true);
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <Map
                mapTypeControlOptions={{
                    mapTypeIds: [],
                }}
                streetViewControl={false}
                center={{
                    lat: Number.parseFloat(lat),
                    lng: Number.parseFloat(lng),
                }}
                zoom={zoom}
                mapId={mapId}
            >
                <AdvancedMarker
                    ref={markerRef}
                    onClick={() => setInfowindowOpen(!infowindowOpen)}
                    position={{
                        lat: Number.parseFloat(lat),
                        lng: Number.parseFloat(lng),
                    }}
                    title={markerTitle}
                />
                {infowindowOpen && (
                    <InfoWindow
                        anchor={marker}
                        maxWidth={200}
                        onCloseClick={() => setInfowindowOpen(false)}
                    >
                        {infoWindowText}
                    </InfoWindow>
                )}
            </Map>
        </APIProvider>
    );
}

export default GoogleMaps;