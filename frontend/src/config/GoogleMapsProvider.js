// frontend/src/config/GoogleMapsProvider.js
import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsProvider = ({ children }) => {
  const libraries = ['places'];

  return (
    <LoadScript googleMapsApiKey="AIzaSyAjiU4RsJfNJoVcll2oEsIaTdzw6p3Srl0" libraries={libraries}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
