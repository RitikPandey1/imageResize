import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default function Options(props) {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [quality, setQuality] = useState(50);
  const [format, setFormat] = useState("jpeg");
  const [loader, setLoader] = useState(false);

  const inputChng = (e) => {
    const { value, name } = e.target;
    if (name === "quality") setQuality(parseInt(value));
    if (name === "select") setFormat(value);
    if (name === "width") setWidth(parseFloat(value));
    if (name === "height") setHeight(parseFloat(value));
  };

  const resize = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("photo", props.file);
    setLoader(true);
    const response = await axios({
      method: "POST",
      url: `https://image-api11.herokuapp.com/imageResize/${width}/${height}/${format}/${quality}`,
      data: form,
      responseType: "blob",
    });
    setLoader(false);
    const blob = new Blob([response.data], { type: `image/${format}` });
    const url = window.URL.createObjectURL(blob);
    ReactDOM.render(
      <a href={`${url}`} download="download image" class="btn btn-primary my-4">
        {" "}
        Download Image
      </a>,
      document.querySelector(".download")
    );
  };

  return (
    <React.Fragment>
      <form className="form mx-auto" onSubmit={(e) => resize(e)}>
        <div className="form-group">
          <label for="width" class="label"></label>
          <input
            placeholder="Width"
            type="number"
            className="form-control"
            id="width"
            name="width"
            onChange={(e) => inputChng(e)}
            required
          />
        </div>
        <div className="form-group">
          <label for="height" class="label"></label>
          <input
            placeholder="Height"
            className="form-control"
            type="number"
            id="height"
            name="height"
            onChange={(e) => inputChng(e)}
            required
          />
        </div>
        <div className="form-group my-4">
          <label for="range" class="label">
            Image quality : {`${quality}%`}
          </label>
          <input
            type="range"
            class="form-control-range"
            name="quality"
            onChange={(e) => inputChng(e)}
          ></input>
        </div>
        <div className="form-group">
          <select
            class="form-control"
            name="select"
            onChange={(e) => inputChng(e)}
          >
            <option value="jpeg">jpeg</option>
            <option value="png">png</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-4 ">
          {loader ? "Processing..." : "Resize"}
        </button>
        <div className="form-group download"></div>
      </form>
    </React.Fragment>
  );
}
