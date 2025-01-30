const axios = require("axios");

/**
 * Function to get longitude and latitude for a given address using Nominatim
 * @param {string} address - The address to geocode
 * @returns {Promise<{latitude: number, longitude: number}>} - An object containing latitude and longitude
 */
const getAddressCoordinates = async (address) => {
  if(!address) throw new Error("Address is required!!")
  const endpoint = "https://nominatim.openstreetmap.org/search";

  try {
    const response = await axios.get(endpoint, {
      params: {
        q: address,
        format: "json",
        limit: 1, // Increase limit to get multiple possible results
      },
      headers: {
        "User-Agent": "GlideGo/1.0 (ritamdevs2004@gmail.com)", // Replace with your email or app name
      },
    });

    // Check if the response is successful and contains valid data
    if (response.status === 200 && response.data.length > 0) {
      const location = response.data[0]; // Get the most relevant result
      return {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      };
    } else {
      throw new Error(`Geocoding failed: No results found or invalid response status`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};

/**
 * Function to calculate the shortest route distance and time using OSRM
 * @param {string} origin - The starting address
 * @param {string} destination - The destination address
 * @returns {Promise<{distance: number, duration: string}>} - Distance (km) and duration (formatted as HH:MM)
 */
const displacementTime = async (origin, destination) => {
  try {
    if (!origin || !destination) throw new Error("Both origin and destination are required");

    // Get coordinates for origin and destination
    const originCoords = await getAddressCoordinates(origin);
    const destinationCoords = await getAddressCoordinates(destination);

    // Check if we received valid coordinates
    if (!originCoords || !destinationCoords) {
      throw new Error("Geocoding failed: Invalid coordinates received");
    }

    // Step 2: Get the shortest path using OSRM
    const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${originCoords.longitude},${originCoords.latitude};${destinationCoords.longitude},${destinationCoords.latitude}?overview=false`;

    const response = await axios.get(osrmUrl);

    if (response.status === 200 && response.data.routes.length > 0) {
      const route = response.data.routes[0];

      // Convert distance to kilometers
      const distanceKm = route.distance / 1000;

      // Convert duration to hours and minutes
      const totalMinutes = Math.round(route.duration / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedDuration = `${hours}h ${minutes}m`;

      return {
        distance: distanceKm.toFixed(2), // Keep 2 decimal places
        duration: formattedDuration,
        status: "OK"
      };
    } else {
      throw new Error("Routing failed: No valid route found");
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};


const getLocationSuggestions = async (input)=>{
  if(!input) throw new Error("Address is required!!")

  const endpoint = "https://nominatim.openstreetmap.org/search";

  try {
    const response = await axios.get(endpoint, {
      params: {
        q: input,
        format: "json",
        limit: 5,  // Number of suggestions to return
      },
      headers: {
        "User-Agent": "GlideGo/1.0 (ritamdevs2004@gmail.com)", // Your User-Agent
      },
    });

    // Check if the response is successful and contains valid data
    if (response.status === 200 && response.data.length > 0) {
      // Return a list of location suggestions
      return response.data.map(location => ({
        display_name: location.display_name,
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      }));
    } else {
      throw new Error(`No suggestions found for input: ${input}`);
    }
  } catch (error) {
    console.error("Error fetching location suggestions:", error.message);
    throw error;
  }
}

module.exports = { getAddressCoordinates, displacementTime ,getLocationSuggestions };
