import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";

function FlyToCafe({ selectedCafe }) {
  const map = useMap();

  useEffect(() => {
    if (selectedCafe) {
      map.flyTo(
        [selectedCafe.lat, selectedCafe.lon],
        17,
        {
          duration: 1.5,
        }
      );
    }
  }, [selectedCafe, map]);

  return null;
}

function Map({
  setCafes,
  selectedCafe,
}) {
  const [position, setPosition] = useState([
    19.8762,
    75.3433,
  ]);

  const [nearbyCafes, setNearbyCafes] =
    useState([]);

  useEffect(() => {
    const fetchNearbyCafes = async (
      lat,
      lon
    ) => {
      try {
        const query = `
          [out:json];

          (
            node["amenity"="cafe"](around:5000,${lat},${lon});
            node["amenity"="restaurant"](around:5000,${lat},${lon});
            node["amenity"="fast_food"](around:5000,${lat},${lon});
            node["shop"="bakery"](around:5000,${lat},${lon});
          );

          out;
        `;

        const response = await fetch(
          "https://overpass-api.de/api/interpreter",
          {
            method: "POST",
            body: query,
          }
        );

        const data = await response.json();

        const calculateDistance = (
          lat1,
          lon1,
          lat2,
          lon2
        ) => {
          const R = 6371;

          const dLat =
            ((lat2 - lat1) * Math.PI) / 180;

          const dLon =
            ((lon2 - lon1) * Math.PI) / 180;

          const a =
            Math.sin(dLat / 2) *
              Math.sin(dLat / 2) +
            Math.cos(
              (lat1 * Math.PI) / 180
            ) *
              Math.cos(
                (lat2 * Math.PI) / 180
              ) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);

          const c =
            2 *
            Math.atan2(
              Math.sqrt(a),
              Math.sqrt(1 - a)
            );

          return (R * c).toFixed(1);
        };

        const cafes = data.elements
          .filter(
            (place) =>
              place.tags &&
              place.tags.name
          )
          .map((place) => ({
            name: place.tags.name,
            lat: place.lat,
            lon: place.lon,
            rating: "N/A",
            distance: calculateDistance(
              lat,
              lon,
              place.lat,
              place.lon
            ),
            aestheticScore: (
              Math.random() * 3 +
              7
            ).toFixed(1),
          }));

        setNearbyCafes(cafes);
        setCafes(cafes);
      } catch (error) {
        console.log(error);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat =
          pos.coords.latitude;

        const lon =
          pos.coords.longitude;

        setPosition([lat, lon]);

        fetchNearbyCafes(lat, lon);
      },
      (err) => console.log(err)
    );
  }, [setCafes]);

  return (
    <MapContainer
      center={position}
      zoom={14}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <FlyToCafe
        selectedCafe={selectedCafe}
      />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          You are here 📍
        </Popup>
      </Marker>

      {nearbyCafes.map(
        (cafe, index) => (
          <Marker
            key={index}
            position={[
              cafe.lat,
              cafe.lon,
            ]}
          >
            <Popup>
              <strong>
                {cafe.name}
              </strong>
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
}

export default Map;