const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
  'Content-Type': 'application/json',
  'X-Goog-Api-Key': 'AIzaSyAjiU4RsJfNJoVcll2oEsIaTdzw6p3Srl0',
  'X-Goog-FieldMask': 'places.photos,places.displayName,places.id',
};

export const getPlaceDetails = async (data) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: config,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Log and throw an error if the request fails
      const errorText = await response.text();
      console.error('Error fetching place details:', response.status, errorText);
      throw new Error(`Failed to fetch place details: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching place details:', error.message);
    throw error;
  }
};
