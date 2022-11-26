import React, { useState } from "react";

import axios from "axios";
import FileDownload from "js-file-download";

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    // if (selectedFile['.type'] === ".json") {
    //   window.alert("Please Select JSON/js file");

    // } else {
    //   setSelectedFile(event.target.files[0]);
    //   setIsFilePicked(true); 
    //   return
    // }
  };

  const handleSubmission = async () => {
    const formData = new FormData();
    formData.append("File", selectedFile);

  var test = new RegExp('\\.(json|js)$');
    if (selectedFile && selectedFile.name.match(test) ) {
      axios.post("http://localhost:8000", formData, {
        responseType: "blob"
      }).then(res => {
        return res.data;
      }).then((result) => {
        FileDownload(result, 'Hemali_Json');
      })
      window.alert("about to downloaded");
    } else {
      window.alert("Please Select JSON/js file");
      return
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-secondary">
      <div className="card p-4 justify-content-center align-items-center">
        <img src="/assets/image/json-file.png" className="card-img-top w-25" alt="img" />
        <div className="card-body">
          <h4 className="card-title">Upload FIle</h4>
          <p className="card-text">Json File</p>
          <input onChange={changeHandler} className="form-control " type="file" id="formFile" />

          {isFilePicked ? (
            <div className="m-4">
              <p><b>Filename:</b> {selectedFile.name}</p>
              <p><b>Filetype:</b> {selectedFile.type}</p>
              <p><b>Size in bytes:</b> {selectedFile.size}</p>
              <p><b>lastModifiedDate:</b>{" "}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p className="text-white">Select a file to show details</p>
          )}
          <div className="d-grid gap-2 pt-3">
            <button className="btn btn-primary" onClick={handleSubmission} type="button">Submit</button>
          </div>
        </div>
      </div>


    </div>
  );
}

export default FileUploadPage;
