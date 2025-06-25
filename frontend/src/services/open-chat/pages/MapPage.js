import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { fetchPostsByLocation } from "../api";
import { useTripContext } from "../../../hooks/useTripContext";

const MapPage = ({ onPostClick }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Track the selected post for InfoWindow
  const { tripData } = useTripContext();

  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const defaultCenter = {
    lat: 7.8731, // Default center (Sri Lanka)
    lng: 80.7718,
  };

  // Fetch posts based on trip data
  useEffect(() => {
    if (!tripData || !tripData.destinations || tripData.destinations.length === 0) {
      console.log("Trip data is not yet available");
      return;
    }

    const currentDestination = tripData.destinations[0];
    const { lat, lng } = currentDestination.position;

    console.log("Fetching posts for location:", lat, lng);

    fetchPostsByLocation(lat, lng)
      .then((data) => {
        setPosts(data);
        console.log("Fetched posts:", data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [tripData]);

  const handleMarkerClick = (post) => {
    setSelectedPost(post);
    if (onPostClick) {
      onPostClick(post._id); // Notify the parent component to scroll the relevant post into view
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={7}
    >
      {/* Render markers for posts */}
      {posts.map((post) => (
        <Marker
          key={post._id}
          position={{ lat: post.location.lat, lng: post.location.lng }}
          onClick={() => handleMarkerClick(post)}
        />
      ))}

      {/* InfoWindow for selected marker */}
      {selectedPost && (
        <InfoWindow
          position={{ lat: selectedPost.location.lat, lng: selectedPost.location.lng }}
          onCloseClick={() => setSelectedPost(null)}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={selectedPost.image}
              alt={selectedPost.content}
              style={{ width: "100px", height: "100px", borderRadius: "8px" }}
            />
            <p style={{ margin: "10px 0", fontWeight: "bold" }}>{selectedPost.content}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapPage;
