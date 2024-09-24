import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const AddressInput = ({
  onSelect,
  searchBox,
  setSearchBox,
  address,
  setAddress,
}) => {
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

      // console.log(place, "BASTIEN");

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
    <StandaloneSearchBox
      onLoad={handleLoad}
      onPlacesChanged={handlePlacesChanged}
    >
      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(event) => {
          console.log(event);
          setAddress(event.target.value);
        }}
        className="address-input"
      />
    </StandaloneSearchBox>
  );
};

export default AddressInput;
