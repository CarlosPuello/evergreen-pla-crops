import ParamsForm from "../paramsForm/paramsForm";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import Seeds from "./seeds.svg";
import "./cropList.css";

function CropList() {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const cropList = list.map((crop, index) => (
    <div className="crop-card" key={index}>
      <div className="card-left">
        <div className="card-image">
          <img src={Seeds}></img>
        </div>
      </div>
      <div className="card-right">
        <div className="card-item">
          <strong>Id:</strong> {crop.cropId}
        </div>
        <div className="card-item">
          <strong>Type:</strong> {crop.type}
        </div>
        <div className="card-item">
          <strong>Name:</strong> {crop.name}
        </div>
        <div className="card-item">
          <strong>Plot:</strong> {crop.plotId}
        </div>
        <div className="card-item">
          <strong>Status:</strong> {crop.status}
        </div>
      </div>
    </div>
  ));
  const loadingSpinner = <div>Loading...</div>;
  const errorIcon = <div>ERROR!</div>;

  useEffect(() => {
    document.title = "PLA Plots";
    axios
      .get("https://back-pla.herokuapp.com/api/v1/Crop", {
        params: {
          page: "1",
          size: "100",
        },
      })
      .then((res) => res.data)
      .then(
        (result) => {
          setList(result);
          setIsLoaded(true);
          setError(null);
        },
        (error) => {
          setList([]);
          setError(error);
        }
      );
  }, []);

  return (
    <div className="crops-list">
      <div className="card-container">
        {isLoaded ? cropList : loadingSpinner}
        {error && errorIcon}
      </div>
      <ParamsForm list={list} setList={setList} />
    </div>
  );
}

export default CropList;
