import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_PLACES_API;

const libraries = ["places"];

const AddressAutocomplete = ({ onSelect }) => {
  const [searchBox, setSearchBox] = useState(null);
  const [address, setAddress] = useState("");

  const handleLoad = (ref) => {
    setSearchBox(ref);
  };

  const handlePlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    setAddress(place.formatted_address);

    if (onSelect) {
      const addressComponents = place.address_components;
      const selectedAddress = {
        street: "",
        city: "",
        postalCode: "",
        country: "",
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      };

      addressComponents.forEach((component) => {
        const types = component.types;
        if (types.includes("street_number")) {
          selectedAddress.street = `${component.long_name} ${selectedAddress.street}`;
        }
        if (types.includes("route")) {
          selectedAddress.street += component.long_name;
        }
        if (types.includes("locality")) {
          selectedAddress.city = component.long_name;
        }
        if (types.includes("postal_code")) {
          selectedAddress.postalCode = component.long_name;
        }
        if (types.includes("country")) {
          selectedAddress.country = component.long_name;
        }
      });

      onSelect(selectedAddress);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <StandaloneSearchBox
        onLoad={handleLoad}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-input"
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default AddressAutocomplete;
