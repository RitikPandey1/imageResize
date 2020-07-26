import React, { useState, useEffect } from "react";

import Options from "./Options";

export default function Main() {

  const [display, setDisplay] = useState(true);
  const [option, setOption] = useState(false);
  const [file, setFile] = useState({});

  useEffect(() => {
    if (display) document.querySelector(".next").disabled = true;
    if (file.name && display) document.querySelector(".next").disabled = false;
  });

  const fileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleClick = () => {
    setOption(true);
    setDisplay(false);
  };

  return (
    <div className="container-fluid main mt-5">
      <input
        type="file"
        name="photo"
        id="upload-pic"
        accept="image/*"
        onChange={(e) => fileInput(e)}
      />
      <label for="upload-pic" class="btn my-4 upload">
        <span className="material-icons ico">publish</span> Upload Image
      </label>
      <div className="container mb-2">
        <span>{file.name}</span>
      </div>

      {display ? (
        <div className="container">
          <button
            className="btn btn-primary next"
            onClick={() => handleClick()}
          >
            Next
          </button>
        </div>
      ) : null}

      <div className="container options">
        {option ? <Options file={file} /> : null}
      </div>
    </div>
  );
}
