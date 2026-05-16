
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'


type MapData = {
    name?: string,
    flag?: string,
    coordinates: [number, number],
    openStreetMap?: string,
    country: string

}



const Map = ({country, coordinates}: MapData) => {

 function FlyMapToCountry({ coordinates }: MapData) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(coordinates, 5);
  }, [coordinates]);

  return null;
}
 
  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: '500px',
        width: '100%',
      }}
    >
      <FlyMapToCountry coordinates={coordinates} />
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
      <Marker position={coordinates}>
        <Popup>
         {country}
        </Popup>
      </Marker>

    </MapContainer>
  )
}

export default Map