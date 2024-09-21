import React, { useState } from "react";
import poster from "../../assets/img/life_is_a_party.jpg";
import { MdInsertPhoto } from "react-icons/md";
import "./Poster.css";

const Poster = ({ picture, setPicture }) => {
  {
    console.log("---->", picture);
  }
  return (
    <div className="poster-container">
      <input
        id="picture"
        style={{ display: "none" }}
        type="file"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file) {
            setPicture(file);
          }
        }}
      />
      <img
        className="preview"
        src={picture ? URL.createObjectURL(picture) : poster}
        // picture ? URL.createObjectURL(picture) :
        alt="Preview"
      />
      <label htmlFor="picture" className="icon-overlay">
        <MdInsertPhoto size={28} />
      </label>
    </div>
  );
};

export default Poster;
